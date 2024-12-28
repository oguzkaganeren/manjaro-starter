#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]
use std::fs;
use std::path::Path;
use std::process::Command;
use sysinfo::{Components, Disks, System};
use tauri::{
  menu::{Menu, MenuItem},
  tray::TrayIconBuilder,
  Manager,
};
use tauri_plugin_log::{Target, TargetKind};

#[derive(Clone, serde::Serialize)]
struct Payload {
  args: Vec<String>,
  cwd: String,
}

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
  let mut sys = System::new_all();
  // First we update all information of our `System` struct.
  sys.refresh_all();

  return serde_json::to_string(&sys).unwrap().to_string();
}

#[tauri::command]
fn get_disk_info() -> String {
  let disks = Disks::new_with_refreshed_list();

  return serde_json::to_string(&disks).unwrap().to_string();
}

#[tauri::command]
fn get_component_info() -> String {
  let components = Components::new_with_refreshed_list();

  return serde_json::to_string(&components).unwrap().to_string();
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
  let window = app_handle.get_webview_window("main").unwrap();
  //let item_handle = app_handle.tray_handle().get_item("hide");
  window.hide().unwrap();
  //item_handle.set_title("Show").unwrap();
}

fn main() {
  tauri::Builder::default()
    .plugin(
      tauri_plugin_log::Builder::new()
        .targets([
          tauri_plugin_log::Target::new(tauri_plugin_log::TargetKind::Stdout),
          Target::new(TargetKind::Webview),
        ])
        .level(log::LevelFilter::Debug)
        .rotation_strategy(tauri_plugin_log::RotationStrategy::KeepAll)
        .build(),
    )
    .plugin(tauri_plugin_os::init())
    .plugin(tauri_plugin_shell::init())
    .plugin(tauri_plugin_dialog::init())
    .plugin(tauri_plugin_global_shortcut::Builder::new().build())
    .plugin(tauri_plugin_clipboard_manager::init())
    .plugin(tauri_plugin_fs::init())
    .plugin(tauri_plugin_process::init())
    .plugin(tauri_plugin_notification::init())
    .plugin(tauri_plugin_http::init())
    .setup(|app| {
      let splashscreen_window = app.get_webview_window("splashscreen").unwrap();
      let main_window = app.get_webview_window("main").unwrap();
      // we perform the initialization code on a new task so the app doesn't freeze
      tauri::async_runtime::spawn(async move {
        std::thread::sleep(std::time::Duration::from_secs(1));
        // After it's done, close the splashscreen and display the main window
        splashscreen_window.close().unwrap();
        main_window.show().unwrap();
        main_window.open_devtools();
      });
      let quit_i = MenuItem::with_id(app, "quit", "Quit Manjaro Starter", true, None::<&str>)?;
      let hide_i = MenuItem::with_id(app, "hide", "Hide", true, None::<&str>)?;
      let tray_menu = Menu::with_items(app, &[&quit_i, &hide_i])?;
      let tray = TrayIconBuilder::new()
        .menu(&tray_menu)
        .menu_on_left_click(true)
        .on_menu_event(|app, event| match event.id.as_ref() {
          "quit" => {
            std::process::exit(0);
          }
          "hide" => {
            let window = app.get_webview_window("main").unwrap();
            let is_visible = window.is_visible().unwrap();
            if is_visible {
              window.hide().unwrap();
              //item_handle.set_title("Show").unwrap();
            } else {
              window.show().unwrap();
              window.set_focus().unwrap();
              //item_handle.set_title("Hide").unwrap();
            }
          }
          _ => {
            println!("menu item {:?} not handled", event.id);
          }
        })
        .build(app)?;
      Ok(())
    })
    .plugin(tauri_plugin_single_instance::init(|app, argv, cwd| {
      println!("{}, {argv:?}, {cwd}", app.package_info().name);
      let window = app.get_webview_window("main").unwrap();
      //let item_handle = app.tray_handle().get_item("hide");
      window.show().unwrap();
      window.set_focus().unwrap();
      //item_handle.set_title("Hide").unwrap();
      /*app
      .emit_all("single-instance", Payload { args: argv, cwd })
      .unwrap();*/
    }))
    // This is where you pass in your commands
    .invoke_handler(tauri::generate_handler![
      run_shell_command,
      run_shell_command_with_result,
      get_sys_info,
      get_disk_info,
      get_svg_icon,
      get_component_info,
      is_service_active,
      hide_window
    ])
    .on_window_event(|window, event| match event {
      tauri::WindowEvent::CloseRequested { api, .. } => {
        // do not close when click close button
        window.hide().unwrap();
        api.prevent_close();
      }
      _ => {}
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application")
}
