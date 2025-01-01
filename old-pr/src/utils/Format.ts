function formatBytes(bytes = 0, decimals = 2) {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}
export function secToMinutesAndSeconds(secs:number) {
  const hours:number = Math.floor(secs / 3600);
  const minutes:number = Math.floor(secs / 60) % 60;
  const seconds:number = secs % 60;

  return [hours, minutes, seconds]
    .map((v) => (v < 10 ? `0${v}` : v))
    .filter((v, i) => v !== '00' || i > 0)
    .join(':');
}
export default formatBytes;
