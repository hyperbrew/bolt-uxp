import { premierepro } from "../globals";
import { asTransaction, lockedTransaction } from "./utils/premierepro-utils";

export const notify = async (message: string) => {
  alert(message);
};

export const createBin = async (name: string) => {
  const project = await premierepro.Project.getActiveProject();
  const root = await project.getRootItem();
  asTransaction(project, [root.createBinAction("Bin1", true)], "Create Bin");
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

export const renameItem = async () => {
  const proj = await premierepro.Project.getActiveProject();
  const root = await proj.getRootItem();
  const items = await root.getItems();
  await lockedTransaction(
    proj,
    [items[0].createSetNameAction("TEST")],
    "Rename Item",
  );
};
