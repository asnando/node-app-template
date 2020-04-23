require('dotenv').config();

export default function getEnv(name: string, dflt: any) {
  const { env } = process;
  if (env[name]) {
    return env[name];
  }
  return dflt || null;
}
