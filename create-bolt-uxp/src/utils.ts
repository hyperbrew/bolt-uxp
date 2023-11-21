import { execSync, exec } from "child_process";

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
