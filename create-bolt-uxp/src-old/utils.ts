import { execSync, exec } from "child_process";

export const posix = (str: string) => str.replace(/\\/g, "/");

export const execAsync = (cmd: string) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      console.log(stdout);
      resolve(stdout);
    });
  });
};

/**
 * Supports npm, pnpm, Yarn, cnpm, bun and any other package manager that sets the npm_config_user_agent env variable.
 * Thanks to https://github.com/zkochan/packages/tree/main/which-pm-runs for this code!
 */
export function getPackageManager() {
  if (!process.env.npm_config_user_agent) {
    return undefined;
  }
  const userAgent = process.env.npm_config_user_agent;
  const pmSpec = userAgent.split(" ")[0];
  const separatorPos = pmSpec.lastIndexOf("/");
  const name = pmSpec.substring(0, separatorPos);
  return name === "npminstall" ? "cnpm" : name;
}
