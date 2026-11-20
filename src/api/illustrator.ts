import { illustrator } from "../globals";

export const notify = async (message: string) => {
  alert(message);
};

export const getProjectInfo = async () => {
  const doc = illustrator.app.activeDocument;
  const info = {
    name: doc.name,
    path: doc.path,
    id: doc.id,
  };
  return info;
};
