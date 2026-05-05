import { premierepro } from "../globals";

export const notify = async (message: string) => {
  alert(message);
};

export const getProjectInfo = async () => {
  const project = await premierepro.Project.getActiveProject();
  const info = {
    name: project.name,
    path: project.path,
    id: project.guid.toString(),
  };
  return info;
};
