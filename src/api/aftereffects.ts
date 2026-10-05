import { aftereffects } from "../globals";
const { app } = aftereffects;

export const notify = async (message: string) => {
  alert(message);
};

export const getProjectInfo = async () => {
  const project = app.project;
  const info = {
    path: project.file,
  };
  return info;
};
