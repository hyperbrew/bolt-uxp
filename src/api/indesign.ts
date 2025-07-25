import { indesign } from "../globals";

export const notify = async (message: string) => {
  window.alert(message);
};

export const getProjectInfo = async () => {
  const doc = indesign.app.activeDocument;
  const info = {
    name: doc.name,
    path: (await doc.filePath).nativePath,
    id: doc.id,
  };
  return info;
};
