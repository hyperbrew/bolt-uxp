import { premierepro } from "../globals";
import type { AudioTrack, Project, Sequence, VideoTrack } from "../types/ppro";
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

export const forEachAudioTrack = async (
  sequence: Sequence,
  callback: (track: AudioTrack, index: number) => Promise<void>,
  reverse?: boolean,
) => {
  const num = await sequence.getAudioTrackCount();
  if (reverse) {
    for (let i = num - 1; i > -1; i--) {
      const track = await sequence.getAudioTrack(i);
      await callback(track, i);
    }
  } else {
    for (let i = 0; i < num; i++) {
      const track = await sequence.getAudioTrack(i);
      await callback(track, i);
    }
  }
};

export const forEachVideoTrack = async (
  sequence: Sequence,
  callback: (track: VideoTrack, index: number) => Promise<void>,
  reverse?: boolean,
) => {
  const num = await sequence.getVideoTrackCount();
  if (reverse) {
    for (let i = num - 1; i > -1; i--) {
      const track = await sequence.getVideoTrack(i);
      await callback(track, i);
    }
  } else {
    for (let i = 0; i < num; i++) {
      const track = await sequence.getVideoTrack(i);
      await callback(track, i);
    }
  }
};

export const cloneSequence = async (
  project: Project,
  sequence: Sequence,
  name: string,
) => {
  const existingIds = (await project.getSequences()).map((s) => s.guid);
  await asTransaction(
    project,
    [sequence.createCloneAction()],
    "Clone Sequence",
  );
  const clonedSequence = (await project.getSequences()).find(
    (s) => !existingIds.includes(s.guid),
  );
  if (clonedSequence) {
    const clonedProjItem = await clonedSequence.getProjectItem();
    await asTransaction(
      project,
      [clonedProjItem.createSetNameAction(name)],
      "Rename Cloned Sequence",
    );
  } else {
    console.warn("cannot find new sequence");
  }
  return clonedSequence;
};
