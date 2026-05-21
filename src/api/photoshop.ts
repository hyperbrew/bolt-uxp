import { photoshop } from "../globals";
import { bpModal, asModal } from "bolt-uxp-utils/ps";

export const notify = async (message: string) => {
  await photoshop.app.showAlert(message);
};

export const getProjectInfo = async () => {
  const doc = photoshop.app.activeDocument;
  const info = {
    name: doc.name,
    path: doc.path,
    id: doc.id,
  };
  return info;
};
