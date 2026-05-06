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

/** Loop over each item inside a bin and all its sub-bins */
export const forEachDescendant = async (
  item: ProjectItem | FolderItem,
  callback: (child: ProjectItem, depth: number) => void | Promise<void>,
  depth = 0,
) => {
  const folder = premierepro.FolderItem.cast(item as ProjectItem);
  if (!folder) return;
  const items = await folder.getItems();
  for (const child of items) {
    await callback(child, depth);
    await forEachDescendant(child, callback, depth + 1);
  }
};

//TODO: TEST EDGE CASES AND PROJECT ITEM TYPES
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

//TODO: TEST EDGE CASES + PROJECT SWITCHES
/** Delete many project items in a single undo step (per project) */
export const deleteItems = async (items: ProjectItem[]) => {
  // Group items by their owning project so cross-project arrays still work
  const byProject = new Map<string, { proj: Project; actions: Action[] }>();

  for (const item of items) {
    const parent = item.getParentBin();
    if (!parent) continue; // rootItem or detached - skip
    const proj = await item.getProject();
    const key = proj.guid?.toString?.() ?? String(proj);
    let bucket = byProject.get(key);
    if (!bucket) {
      bucket = { proj, actions: [] };
      byProject.set(key, bucket);
    }
    bucket.actions.push(parent.createRemoveItemAction(item));
  }

  for (const { proj, actions } of byProject.values()) {
    if (actions.length === 0) continue;
    await asTransaction(proj, actions, "Delete Items");
  }
};

// /**
// ![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc3OTYnIGhlaWdodD0nMjAnPjx0ZXh0IHg9JzYnIHk9JzE0JyBmb250LWZhbWlseT0nbW9ub3NwYWNlJyBmb250LXNpemU9JzEyJyBmb250LXdlaWdodD0nYm9sZCcgZmlsbD0nIzdBNUZGRic+VmlvbGV0PC90ZXh0Pjx0ZXh0IHg9JzU4JyB5PScxNCcgZm9udC1mYW1pbHk9J21vbm9zcGFjZScgZm9udC1zaXplPScxMicgZm9udC13ZWlnaHQ9J2JvbGQnIGZpbGw9JyMzRjdFOEUnPklyaXM8L3RleHQ+PHRleHQgeD0nOTYnIHk9JzE0JyBmb250LWZhbWlseT0nbW9ub3NwYWNlJyBmb250LXNpemU9JzEyJyBmb250LXdlaWdodD0nYm9sZCcgZmlsbD0nIzREOEEzRSc+Q2FyaWJiZWFuPC90ZXh0Pjx0ZXh0IHg9JzE2OScgeT0nMTQnIGZvbnQtZmFtaWx5PSdtb25vc3BhY2UnIGZvbnQtc2l6ZT0nMTInIGZvbnQtd2VpZ2h0PSdib2xkJyBmaWxsPScjQTg2NEE4Jz5MYXZlbmRlcjwvdGV4dD48dGV4dCB4PScyMzUnIHk9JzE0JyBmb250LWZhbWlseT0nbW9ub3NwYWNlJyBmb250LXNpemU9JzEyJyBmb250LXdlaWdodD0nYm9sZCcgZmlsbD0nIzNFN0U5Nyc+Q2VydWxlYW48L3RleHQ+PHRleHQgeD0nMzAxJyB5PScxNCcgZm9udC1mYW1pbHk9J21vbm9zcGFjZScgZm9udC1zaXplPScxMicgZm9udC13ZWlnaHQ9J2JvbGQnIGZpbGw9JyM1QzZFMkUnPkZvcmVzdDwvdGV4dD48dGV4dCB4PSczNTMnIHk9JzE0JyBmb250LWZhbWlseT0nbW9ub3NwYWNlJyBmb250LXNpemU9JzEyJyBmb250LXdlaWdodD0nYm9sZCcgZmlsbD0nI0IzM0E0Ric+Um9zZTwvdGV4dD48dGV4dCB4PSczOTEnIHk9JzE0JyBmb250LWZhbWlseT0nbW9ub3NwYWNlJyBmb250LXNpemU9JzEyJyBmb250LXdlaWdodD0nYm9sZCcgZmlsbD0nI0MzNkIyQSc+TWFuZ288L3RleHQ+PHRleHQgeD0nNDM2JyB5PScxNCcgZm9udC1mYW1pbHk9J21vbm9zcGFjZScgZm9udC1zaXplPScxMicgZm9udC13ZWlnaHQ9J2JvbGQnIGZpbGw9JyM1QzJFQUEnPlB1cnBsZTwvdGV4dD48dGV4dCB4PSc0ODgnIHk9JzE0JyBmb250LWZhbWlseT0nbW9ub3NwYWNlJyBmb250LXNpemU9JzEyJyBmb250LXdlaWdodD0nYm9sZCcgZmlsbD0nIzJFNEZBQSc+Qmx1ZTwvdGV4dD48dGV4dCB4PSc1MjYnIHk9JzE0JyBmb250LWZhbWlseT0nbW9ub3NwYWNlJyBmb250LXNpemU9JzEyJyBmb250LXdlaWdodD0nYm9sZCcgZmlsbD0nIzNFOEE4QSc+VGVhbDwvdGV4dD48dGV4dCB4PSc1NjQnIHk9JzE0JyBmb250LWZhbWlseT0nbW9ub3NwYWNlJyBmb250LXNpemU9JzEyJyBmb250LXdlaWdodD0nYm9sZCcgZmlsbD0nI0EwMzU2QSc+TWFnZW50YTwvdGV4dD48dGV4dCB4PSc2MjMnIHk9JzE0JyBmb250LWZhbWlseT0nbW9ub3NwYWNlJyBmb250LXNpemU9JzEyJyBmb250LXdlaWdodD0nYm9sZCcgZmlsbD0nI0E4OTY3OCc+VGFuPC90ZXh0Pjx0ZXh0IHg9JzY1NCcgeT0nMTQnIGZvbnQtZmFtaWx5PSdtb25vc3BhY2UnIGZvbnQtc2l6ZT0nMTInIGZvbnQtd2VpZ2h0PSdib2xkJyBmaWxsPScjM0U4QTRGJz5HcmVlbjwvdGV4dD48dGV4dCB4PSc2OTknIHk9JzE0JyBmb250LWZhbWlseT0nbW9ub3NwYWNlJyBmb250LXNpemU9JzEyJyBmb250LXdlaWdodD0nYm9sZCcgZmlsbD0nIzdBNEYyRSc+QnJvd248L3RleHQ+PHRleHQgeD0nNzQ0JyB5PScxNCcgZm9udC1mYW1pbHk9J21vbm9zcGFjZScgZm9udC1zaXplPScxMicgZm9udC13ZWlnaHQ9J2JvbGQnIGZpbGw9JyNCM0EwM0UnPlllbGxvdzwvdGV4dD48L3N2Zz4=)*/

// Audio Conversions

/** Convert dB to a linear decimal gain value */
export const dbToDec = (x: number) => Math.pow(10, (x - 15) / 20);

/** Convert a linear decimal gain value to dB */
export const decToDb = (x: number) => 20 * Math.log(x) * Math.LOG10E + 15;
