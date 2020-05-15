require('dotenv').config();

export default function getEnv(name: string, dflt: any) {
  const { env } = process;
  return env[name] || dflt;
}
