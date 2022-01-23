#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]
use std::process::Command;
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
fn main() {
  tauri::Builder::default()
  // This is where you pass in your commands
  .invoke_handler(tauri::generate_handler![run_shell_command,run_shell_command_with_result])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
