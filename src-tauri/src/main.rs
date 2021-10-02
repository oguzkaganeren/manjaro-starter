#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]
use std::process::Command;
#[tauri::command]
fn my_custom_command() {
  Command::new("sh")
            .arg("-c")
            .arg("manjaro-application-utility")
            .output()
            .expect("failed to execute process");
}
fn main() {
  tauri::Builder::default()
  // This is where you pass in your commands
  .invoke_handler(tauri::generate_handler![my_custom_command])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
