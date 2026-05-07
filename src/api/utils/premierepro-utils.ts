import { premierepro } from "../../globals";
import {
  Action,
  AudioTrack,
  FolderItem,
  Project,
  ProjectItem,
  Sequence,
  VideoTrack,
} from "../../types/ppro";

/** Easily run a transaction */
export const asTransaction = async (
  proj: Project,
  actions: Action[],
  description: string,
) => {
  proj.executeTransaction(async (compAction) => {
    for (const action of actions) {
      compAction.addAction(action);
    }
  }, description);
};

/** Safely run a transaction by creating actions in-scope  */
export const asTransactionSafe = async (
  proj: Project,
  actions: Array<() => Action>,
  description: string,
) => {
  return proj.executeTransaction(async (compAction) => {
    for (const action of actions) {
      compAction.addAction(action());
    }
  }, description);
};

/** Easily a transaction in a Locked Access */
export const lockedTransaction = async (
  proj: Project,
  actions: Action[],
  description: string,
) => {
  proj.lockedAccess(() =>
    proj.executeTransaction(async (compAction) => {
      for (const action of actions) {
        compAction.addAction(action);
      }
    }, description),
  );
};

//TODO: check for potential bugs - in extendscript were cases tracks indices don't match UI order
/** Loop over each audio track */
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

//TODO: check for potential bugs - in extendscript were cases tracks indices don't match UI order
/** Loop over each video track */
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

/** Clone sequence and returned the cloned instance */
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

/** Loop over each direct child of a bin */
export const forEachChild = async (
  item: ProjectItem | FolderItem,
  callback: (child: ProjectItem, index: number) => void | Promise<void>,
) => {
  const folder = premierepro.FolderItem.cast(item as ProjectItem);

  if (!folder) return; // not a bin, nothing to iterate
  const items = await folder.getItems();
  for (let i = 0; i < items.length; i++) {
    await callback(items[i], i);
  }
};

//TODO: add throw guards

//TODO: edge tests. Test cases where callback modifies some descendants
/** Loop over each item inside a bin and all its sub-bins.  */
export const forEachDescendant = async (
  item: ProjectItem | FolderItem,
  callback: (child: ProjectItem, depth: number) => void | Promise<void>,
  depth = 0,
) => {
  const folder = premierepro.FolderItem.cast(item as ProjectItem);
  if (!folder) return;
  const items = await folder.getItems();
  for (const child of items) {
    const childFolder = premierepro.FolderItem.cast(child);
    if (childFolder) {
      await forEachDescendant(child, callback, depth + 1);
    } else {
      await callback(child, depth);
    }
  }
};

//TODO: test with edge cases and different item types
/** Delete a project item (bin, sequence, clip) */
export const deleteItem = async (item: ProjectItem) => {
  const parent = item.getParentBin();
  if (!parent) return; // rootItem or detached - nothing valid to delete
  const proj = await item.getProject();
  await asTransaction(
    proj,
    [parent.createRemoveItemAction(item)],
    "Delete Item",
  );
};

//TODO: REVISIT. Implement more optimised approach. Test edge cases - stale items, parents removals, offline files, different projects, different types
/** Safely delete several project items in a single undo step.
 * Multi-project aware: groups by owning project, one transaction per project.
 * Parent/child optimization: if an ancestor is also being deleted, the descendant
 * is skipped - removing the ancestor takes its contents with it*/
export const deleteItems = async (items: ProjectItem[]) => {
  const ids = new Set(items.map((i) => i.getId()));
  const byProject = new Map<string, { proj: Project; actions: Action[] }>();

  for (const item of items) {
    const parent = item.getParentBin();
    if (!parent) continue;

    // skip if any ancestor is also in the set
    let p: FolderItem | null = parent;
    let coveredByAncestor = false;
    while (p) {
      //TODO: remake or add inf loop stopped to avoid freezing for unexpcted 'while' cases
      const asItem = premierepro.ProjectItem.cast(p);
      if (!asItem) break;
      if (ids.has(asItem.getId())) {
        coveredByAncestor = true;
        break;
      }
      p = asItem.getParentBin();
    }
    if (coveredByAncestor) continue;

    const proj = await item.getProject();
    const key = proj.guid?.toString?.() ?? String(proj);
    let bucket = byProject.get(key);
    if (!bucket) byProject.set(key, (bucket = { proj, actions: [] }));
    bucket.actions.push(parent.createRemoveItemAction(item));
  }

  for (const { proj, actions } of byProject.values()) {
    if (actions.length) await asTransaction(proj, actions, "Delete Items");
  }
};

//TODO? extend or create separate function to abstract futher with friendlier types — e.g. SEQUENCE, MULTICAM_SOURCE, SUBCLIP, NEST, AUDIO, MEDIA, MOGRT
/** Find a direct child of a bin or rootItem by name.
 * Optionally filter by item type. Optionally compare case-insensitively and/or space-insensitively.
 * **NOTE:** sequences, nests, subclips and multicam sources are all type of CLIP. Type ROOT is excluded since it never appears as a child.
 */
export const getChildByName = async (
  item: ProjectItem | FolderItem,
  name: string,
  caseInsensitive?: boolean,
  spaceInsensitive?: boolean,
  projectItemType?: "CLIP" | "BIN" | "COMPOUND" | "FILE" | "STYLE",
): Promise<ProjectItem | undefined> => {
  const folder = premierepro.FolderItem.cast(item as ProjectItem);
  if (!folder) return;

  const type = projectItemType
    ? premierepro.ProjectItem[`TYPE_${projectItemType}`]
    : undefined;

  const needNormalize = caseInsensitive || spaceInsensitive;
  const norm = needNormalize
    ? (name: string) => {
        let outName = name;
        if (caseInsensitive) outName = outName.toLowerCase();
        if (spaceInsensitive) outName = outName.replace(/\s+/g, "");
        return outName;
      }
    : null;
  const target = norm ? norm(name) : name;

  const items = await folder.getItems();
  return items.find(
    (child) =>
      (norm ? norm(child.name) : child.name) === target &&
      (type === undefined || child.type === type),
  );
};

// Audio Conversions

/** Convert dB to a linear decimal gain value */
export const dbToDec = (x: number) => Math.pow(10, (x - 15) / 20);

/** Convert a linear decimal gain value to dB */
export const decToDb = (x: number) => 20 * Math.log(x) * Math.LOG10E + 15;
