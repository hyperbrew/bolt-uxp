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

// export const renameItemCurrent = async () => {
//   const proj = await premierepro.Project.getActiveProject();
//   const root = await proj.getRootItem();
//   // Undo Group #1
//   proj.lockedAccess(() =>
//     proj.executeTransaction(async (compAction) => {
//       compAction.addAction(root.createBinAction("Bin1", true));
//     }, "Create Bin"),
//   );
//   // Have to find the new Bin
//   const itemsNew = await root.getItems();
//   const newBin = itemsNew.find((item) => item.name === "Bin1")!;
//   // Undo Group #2
//   proj.lockedAccess(() =>
//     proj.executeTransaction(async (compAction) => {
//       compAction.addAction(newBin.createSetNameAction("TEST"));
//     }, "Rename Bin"),
//   );
// };
export const renameItemCurrent = async () => {
  const proj = await premierepro.Project.getActiveProject();
  const root = await proj.getRootItem();
  // Undo Group #1
  proj.lockedAccess(() =>
    proj.executeTransaction(async (compAction) => {
      compAction.addAction(root.createBinAction("Bin1", true));
      const itemsNew = await root.getItems();
      const newBin = itemsNew.find((item) => item.name === "Bin1")!;
      compAction.addAction(newBin.createSetNameAction("TEST"));
    }, "Create + RenameBin"),
  );
};

// export const renameItemIdeal = async () => {
//   const proj = await premierepro.Project.getActiveProject();
//   const root = await proj.getRootItem();
//   const items = await root.getItems();
//   // Undo Group #1
//   proj.lockedAccess(() =>
//     proj.executeTransaction(async (compAction) => {
//       compAction.addAction(root.createBinAction("Bin1", true)).then(newBin => {
//         // Manipulate result immediately
//         compAction.addAction(newBin.createSetNameAction("TEST"));
//       })
//     }, 'Create + Rename Bin'),
//   );
// };

// export const renameItemDREAMING = async () => {
//   const proj = await premierepro.Project.getActiveProject();
//   const root = await proj.getRootItem();
//   const items = await root.getItems();
//   proj.beginUndoGroup('Create + Rename Bin');
//   const newItem = root.createBin("Bin1", true);
//   const newItem = newItem.setName("TEST");
//   proj.endUndoGroup('Create + Rename Bin');
// };
