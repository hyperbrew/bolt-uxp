import { premierepro } from "../../globals";
import {
  Action,
  AudioClipTrackItem,
  AudioTrack,
  Constants,
  FolderItem,
  Project,
  ProjectItem,
  Sequence,
  VideoClipTrackItem,
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

/**
 * Loop over each clip on a track.
 *
 * Optionally set `includeEmpty` to true to also visit empty clips
 * (the gaps in between and after clips). Empty clips are null
 *
 * Optionally set `reverse` to true to loop from the last clip
 */
export const forEachClip = async (
  track: VideoTrack | AudioTrack,
  callback: (
    clip: VideoClipTrackItem | AudioClipTrackItem | null,
    index: number,
  ) => void | Promise<void>,
  includeEmpty = false,
  reverse?: boolean,
) => {
  const clips = track.getTrackItems(1, includeEmpty); // 1 = CLIP
  if (reverse) {
    for (let i = clips.length - 1; i > -1; i--) {
      await callback(clips[i], i);
    }
  } else {
    for (let i = 0; i < clips.length; i++) {
      await callback(clips[i], i);
    }
  }
};

/** Clone sequence and returne the cloned instance */
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

//REMOVE OR FINISH
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

/** Resolve passed item as a searchable FolderItem. */
export const resolveToFolderItem = async (
  item?: ProjectItem | FolderItem | Project,
): Promise<FolderItem | undefined> => {
  if (!item) return;
  if ("getRootItem" in item) return item.getRootItem(); // only Project has "getRootItem"

  // cast returns null if ProjectItem is not a bin type
  return premierepro.FolderItem.cast(item as ProjectItem) ?? undefined;
};

/** Get the active project's rootItem. */
export const getActiveRoot = async (): Promise<FolderItem | undefined> => {
  const proj = await premierepro.Project.getActiveProject();
  return proj ? proj.getRootItem() : undefined;
};

/** Resolve to a FolderItem, falling back to the active project's rootItem. */
export const resolveOrActiveRoot = async (
  item?: ProjectItem | FolderItem | Project,
): Promise<FolderItem | undefined> =>
  (await resolveToFolderItem(item)) ?? (await getActiveRoot());

//TODO? extend or create separate function to abstract futher with friendlier types — e.g. SEQUENCE, MULTICAM_SOURCE, SUBCLIP, NEST, AUDIO, MEDIA, MOGRT
/** Find a direct child of a bin/root by name.
 *
 * Optionally filter by item type. Optionally compare case-insensitively and/or space-insensitively.
 *
 * **NOTE:** sequences, nests, subclips and multicam sources are all type of CLIP.
 * Type ROOT is excluded since it never appears as a child
 */
export const getChildByName = async (
  name: string,
  parent: ProjectItem | FolderItem | Project,
  caseInsensitive?: boolean,
  spaceInsensitive?: boolean,
  projectItemType?: "CLIP" | "BIN" | "COMPOUND" | "FILE" | "STYLE",
): Promise<ProjectItem | undefined> => {
  const folder = await resolveToFolderItem(parent);
  if (!folder) return;

  const type = projectItemType
    ? premierepro.ProjectItem[`TYPE_${projectItemType}`] //look up the numeric type
    : undefined;

  const needNormalize = caseInsensitive || spaceInsensitive;
  const norm = needNormalize
    ? (str: string) => {
        let out = str;
        if (caseInsensitive) out = out.toLowerCase();
        if (spaceInsensitive) out = out.replace(/\s+/g, "");
        return out;
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

/** Find a direct child of a bin/root by id.*/
export const getChildById = async (
  id: string,
  parent: ProjectItem | FolderItem | Project,
): Promise<ProjectItem | undefined> => {
  const folder = await resolveToFolderItem(parent);
  if (!folder) return;
  const items = await folder.getItems();
  return items.find((child) => child.getId() === id);
};

/** Recursively find a descendant of a bin/root by id. */
export const getDescendantById = async (
  id: string,
  parent: ProjectItem | FolderItem | Project,
): Promise<ProjectItem | undefined> => {
  const folder = await resolveToFolderItem(parent);
  if (!folder) return;

  const items = await folder.getItems();
  for (const child of items) {
    if (child.getId() === id) return child;
    const childFolder = premierepro.FolderItem.cast(child);
    if (childFolder) {
      const found = await getDescendantById(id, child);
      if (found) return found;
    }
  }
  return undefined;
};

/** Recursively find an item by id.
 *
 * Optionally set `parent` to a Project or bin to scope. Defaults to active project. */
export const getItemById = async (
  id: string,
  parent?: ProjectItem | FolderItem | Project,
): Promise<ProjectItem | undefined> => {
  const root = await resolveOrActiveRoot(parent);
  if (!root) return;

  const findIn = async (
    folder: FolderItem,
  ): Promise<ProjectItem | undefined> => {
    for (const child of await folder.getItems()) {
      if (child.getId() === id) return child;
      const childFolder = premierepro.FolderItem.cast(child);
      if (childFolder) {
        const found = await findIn(childFolder);
        if (found) return found;
      }
    }
  };

  return findIn(root);
};

/** Find an item by combining a chain of bin names down the project tree.
 *
 * @example getItemByNameChain(["Assets", "Graphics", "logo.png"]);
 *
 * Optionally pass parent item to scope. Defaults to active project. */
export const getItemByNameChain = async (
  names: string[],
  parent?: ProjectItem | FolderItem | Project,
): Promise<ProjectItem | undefined> => {
  let currentItem: ProjectItem | FolderItem | Project | undefined =
    parent ?? (await getActiveRoot());

  for (const name of names) {
    if (!currentItem) return;
    currentItem = await getChildByName(name, currentItem);
  }
  return currentItem as ProjectItem | undefined;
};

/** Get sequence from project item*/
export const itemToSequence = async (
  item: ProjectItem,
): Promise<Sequence | undefined> => {
  const clipItem = premierepro.ClipProjectItem.cast(item);
  if (!clipItem) return;
  if (!(await clipItem.isSequence())) return;
  return clipItem.getSequence();
};

/** Get a project item's duration.
 *
 * Synthetic items (adjustment layers, Color Matte, etc.) always return a
 * `TickTime` of 43200s
 */
export const getItemDuration = async (
  item: ProjectItem,
): Promise<TickTime | undefined> => {
  const clipItem = premierepro.ClipProjectItem.cast(item);
  if (!clipItem) return;

  if (await clipItem.isSequence()) {
    const seq = await clipItem.getSequence();
    return await seq.getEndTime();
  }

  const media = await clipItem.getMedia();
  if (!media) return;
  const dur = await media.duration;
  return dur;
};

/** Get an item's video frame rate.
 *
 * For synthetic items (adjustment layers, color matte, etc.) this exposes
 * the frame rate set at creation - the Metadata panel doesn't have this info
 *
 * Audio-only items return undefined
 */
export const getFrameRate = async (
  item: ProjectItem | ClipProjectItem | Sequence,
): Promise<FrameRate | undefined> => {
  //duck check if item is Sequence
  if ("getVideoTrack" in item) {
    return (await item.getSettings()).getVideoFrameRate();
  }

  //duck check if item is Clip, otherwise cast to it
  const clipItem =
    "getMedia" in item ? item : premierepro.ClipProjectItem.cast(item);
  if (!clipItem) return;

  //if sequence was passed as a project item, do recursive call
  if (await clipItem.isSequence()) {
    return getFrameRate(await clipItem.getSequence());
  }

  const fi = await clipItem.getFootageInterpretation();
  const fps = fi?.getFrameRate();
  return fps ? premierepro.FrameRate.createWithValue(fps) : undefined;
};

// Audio Conversions

/** Convert dB to a linear decimal gain value */
export const dbToDec = (x: number) => Math.pow(10, (x - 15) / 20);

/** Convert a linear decimal gain value to dB */
export const decToDb = (x: number) => 20 * Math.log(x) * Math.LOG10E + 15;
