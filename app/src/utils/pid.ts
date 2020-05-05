export default function getPid(): number {
  const { pid } = process;
  return pid;
}
