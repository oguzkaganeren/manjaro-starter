export default function isDev(): boolean {
  return process.env.NODE_ENV === 'development';
}
