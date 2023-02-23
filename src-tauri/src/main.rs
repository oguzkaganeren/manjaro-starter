#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]
use log::LevelFilter;
use serde_json::json;
use std::fs;
use std::path::Path;
use std::process::Command;
use sysinfo::{CpuExt, CpuRefreshKind, RefreshKind, System, SystemExt};
use tauri::Manager;
use tauri::SystemTray;
use tauri::{CustomMenuItem, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem};
use tauri_plugin_log::{LogTarget, LoggerBuilder, RotationStrategy};

#[tauri::command]
fn run_shell_command(command: String) -> String {
  let output = Command::new("sh").arg("-c").arg(command).output().unwrap();
  return format!("{:?}", output.status.success());
}
#[tauri::command]
fn run_shell_command_with_result(command: String) -> String {
  let output = Command::new("sh").arg("-c").arg(command).output().unwrap();
  return format!("{:?}", String::from_utf8_lossy(&output.stdout));
}
#[tauri::command]
fn get_svg_icon(svgpath: String) -> String {
  if Path::new(&svgpath).exists() {
    let svg_str = fs::read_to_string(svgpath).expect("Unable to read file");
    return svg_str;
  }
  return "Unable to read file".to_string();
}
#[tauri::command]
fn get_sys_info() -> String {
  let mut sys =
    System::new_with_specifics(RefreshKind::new().with_cpu(CpuRefreshKind::everything()));
  // First we update all information of our `System` struct.
  sys.refresh_all();
  let sys_info = json!( {
    "totalMemory": sys.total_memory().to_string(),
    "usedMemory": sys.used_memory().to_string(),
    "totalSwap": sys.total_swap().to_string(),
    "usedSwap": sys.used_swap().to_string(),
    "sysName":sys.name(),
    "sysKernelVersion":sys.kernel_version(),
    "sysOsVersion":sys.os_version(),
    "sysHostName":sys.host_name(),
    "numberOfCpu":sys.cpus().len().to_string(),
    "nameOfCpu":sys.global_cpu_info().brand(),
  });
  return sys_info.to_string();
}

#[tauri::command]
fn is_service_active(service: String) -> bool {
  if let Ok(true) = systemctl::exists(&service) {
    let is_active = systemctl::is_active(&service).unwrap();
    return is_active;
  }
  return false;
}

#[tauri::command]
fn hide_window(app_handle: tauri::AppHandle) {
  let window = app_handle.get_window("main").unwrap();
  let item_handle = app_handle.tray_handle().get_item("hide");
  window.hide().unwrap();
  item_handle.set_title("Show").unwrap();
}

fn main() {
  //init tray
  let quit = CustomMenuItem::new("quit".to_string(), "Quit Manjaro Starter");
  let hide = CustomMenuItem::new("hide".to_string(), "Hide");
  let tray_menu = SystemTrayMenu::new()
    .add_item(quit)
    .add_native_item(SystemTrayMenuItem::Separator)
    .add_item(hide);
  let tray = SystemTray::new().with_menu(tray_menu);

  tauri::Builder::default()
    .setup(|app| {
      let splashscreen_window = app.get_window("splashscreen").unwrap();
      let main_window = app.get_window("main").unwrap();
      // we perform the initialization code on a new task so the app doesn't freeze
      tauri::async_runtime::spawn(async move {
        std::thread::sleep(std::time::Duration::from_secs(1));
        // After it's done, close the splashscreen and display the main window
        splashscreen_window.close().unwrap();
        main_window.show().unwrap();
      });
      Ok(())
    })
    .plugin(
      LoggerBuilder::default()
        .rotation_strategy(RotationStrategy::KeepAll)
        .max_file_size(1000)
        .level(LevelFilter::Debug)
        .targets([LogTarget::LogDir, LogTarget::Stdout, LogTarget::Webview])
        .build(),
    )
    // This is where you pass in your commands
    .invoke_handler(tauri::generate_handler![
      run_shell_command,
      run_shell_command_with_result,
      get_sys_info,
      get_svg_icon,
      is_service_active,
      hide_window
    ])
    .system_tray(tray)
    .on_system_tray_event(|app, event| match event {
      SystemTrayEvent::MenuItemClick { id, .. } => {
        let item_handle = app.tray_handle().get_item(&id);
        match id.as_str() {
          "quit" => {
            std::process::exit(0);
          }
          "hide" => {
            let window = app.get_window("main").unwrap();
            let is_visible = window.is_visible().unwrap();
            if is_visible {
              window.hide().unwrap();
              item_handle.set_title("Show").unwrap();
            } else {
              window.show().unwrap();
              window.set_focus().unwrap();
              item_handle.set_title("Hide").unwrap();
            }
          }
          _ => {}
        }
      }
      _ => {}
    })
    .on_window_event(|event| match event.event() {
      tauri::WindowEvent::CloseRequested { api, .. } => {
        // do not close when click close button
        event.window().hide().unwrap();
        api.prevent_close();
      }
      _ => {}
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application")
}
