#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]
use sysinfo::{CpuRefreshKind, CpuExt, RefreshKind, System, SystemExt};
use std::process::Command;
use serde_json::json;
use tauri_plugin_log::{LogTarget, LoggerBuilder,RotationStrategy};
use log::LevelFilter;
use tauri::Manager;
use std::fs;

#[tauri::command]
fn run_shell_command(command: String) -> String {
  let output= Command::new("sh")
            .arg("-c")
            .arg(command)
            .output()
            .unwrap();
  return format!("{:?}",output.status.success());
}
#[tauri::command]
fn run_shell_command_with_result(command: String) -> String {
  let output= Command::new("sh")
            .arg("-c")
            .arg(command)
            .output()
            .unwrap();
  return format!("{:?}",String::from_utf8_lossy(&output.stdout));
}
#[tauri::command]
fn get_svg_icon(svgpath: String) -> String {
  let svg_str = fs::read_to_string(svgpath).expect("Unable to read file");
  return svg_str;
}
#[tauri::command]
fn get_sys_info() -> String {
  let mut sys = System::new_with_specifics(
    RefreshKind::new().with_cpu(CpuRefreshKind::everything()),
);

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
fn main() {
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
  .plugin(LoggerBuilder::default().rotation_strategy(RotationStrategy::KeepAll)
  .max_file_size(1000)
  .level(LevelFilter::Debug).targets([
    LogTarget::LogDir,
    LogTarget::Stdout,
    LogTarget::Webview,
  ]).build())
  // This is where you pass in your commands
  .invoke_handler(tauri::generate_handler![run_shell_command,run_shell_command_with_result,get_sys_info,get_svg_icon])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
