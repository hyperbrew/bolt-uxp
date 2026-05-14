import { premierepro, uxp } from "../../globals";
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
  ClipProjectItem,
  FrameRate,
  Metadata,
  TickTime,
} from "../../types/ppro";

/**
 * premierepro-utils
 *
 * NOTE: Requires Adobe Premiere Pro 26.3.0+ (Build 68 or newer).
 * Earlier versions use a different transaction API, so utils that rely on
 * transactions (cloneSequence, deleteItem, setPrMetadata, etc.) may not work in erlier versions
 */

/**
 * Run a transaction inside a locked project access, creating actions in-scope.
 *
 * Since Premiere 26.3.0+ actions must be created inside the locked +
 * transaction scope, not before. Pass action factories (`() => Action`)
 * rather than pre-built actions
 */
export const lockedTransactionSafe = async (
  proj: Project,
  actions: Array<() => Action>,
  description: string,
) => {
  proj.lockedAccess(() =>
    proj.executeTransaction(async (compAction) => {
      for (const action of actions) {
        compAction.addAction(action());
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

/** Clone sequence and return the cloned instance */
export const cloneSequence = async (
  project: Project,
  sequence: Sequence,
  name: string,
) => {
  const existingIds = (await project.getSequences()).map((s) => s.guid);
  await lockedTransactionSafe(
    project,
    [() => sequence.createCloneAction()],
    "Clone Sequence",
  );
  const clonedSequence = (await project.getSequences()).find(
    (s) => !existingIds.includes(s.guid),
  );
  if (clonedSequence) {
    const clonedProjItem = await clonedSequence.getProjectItem();
    await lockedTransactionSafe(
      project,
      [() => clonedProjItem.createSetNameAction(name)],
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

/**
 * Find the first ClipProjectItem under `parent` whose media file path
 * equals `path`. Recurses into sub-bins
 */
export const findItemByPath = async (
  parent: ProjectItem | FolderItem,
  path: string,
): Promise<ClipProjectItem | undefined> => {
  const folder = premierepro.FolderItem.cast(parent as ProjectItem);
  if (!folder) return;
  for (const child of await folder.getItems()) {
    const clip = premierepro.ClipProjectItem.cast(child);
    if (clip && (await clip.getMediaFilePath()) === path) return clip;
    const found = await findItemByPath(child, path);
    if (found) return found;
  }
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

/** Delete a project item (bin, sequence, clip) */
export const deleteItem = async (item: ProjectItem) => {
  const parent = item.getParentBin();
  if (!parent) return; // rootItem or detached - nothing valid to delete
  const proj = await item.getProject();
  await lockedTransactionSafe(
    proj,
    [() => parent.createRemoveItemAction(item)],
    "Delete Item",
  );
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
 * `TickTime` of 43200s.
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
  const dur = media.duration;
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

/** Get the duration of a single frame as a TickTime at the given frame rate. */
export const getFrameDuration = (frameRate: FrameRate): TickTime =>
  premierepro.TickTime.createWithFrameAndFrameRate(1, frameRate);

/** Convert a TickTime to a frame count at the given frame rate */
export const timeToFrames = (time: TickTime, frameRate: FrameRate): number =>
  time.ticksNumber / frameRate.ticksPerFrame;

/**
 * Parse a timecode string ("HH:MM:SS:FF" or "HH;MM;SS;FF") into a TickTime.
 */
export const timecodeToTime = (
  timecode: string,
  frameRate: FrameRate,
): TickTime => {
  const dropFrame = timecode.indexOf(";") > -1;
  const [h, m, s, f] = timecode.split(/[:;]/).map((p) => parseInt(p, 10));
  const fpsRound = Math.round(frameRate.value);

  let totalFrames = h * 3600 * fpsRound + m * 60 * fpsRound + s * fpsRound + f;

  if (dropFrame) {
    const dropPerMin = Math.round(frameRate.value * 0.066666); // skip 2 frames per minute at 29.97, 4 at 59.94
    const totalMinutes = h * 60 + m;
    totalFrames -= dropPerMin * (totalMinutes - Math.floor(totalMinutes / 10));
  }

  return premierepro.TickTime.createWithFrameAndFrameRate(
    totalFrames,
    frameRate,
  );
};

/**
 * Format a TickTime as a Premiere timecode string.
 *
 * Pass `dropFrame: true` to produce SMPTE drop-frame ("HH;MM;SS;FF"),
 * which is what Premiere shows on 29.97 / 59.94 timelines so displayed
 * timecode tracks wall-clock time. Default is non-drop ("HH:MM:SS:FF").
 */
export const timeToTimecode = (
  time: TickTime,
  frameRate: FrameRate,
  dropFrame = false,
): string => {
  const fpsRound = Math.round(frameRate.value);
  const realFrames = Math.round(time.ticksNumber / frameRate.ticksPerFrame);

  let labelFrames = realFrames;
  if (dropFrame) {
    const dropPerMin = Math.round(frameRate.value * 0.066666); // 2 @ 29.97, 4 @ 59.94
    const framesPer10Min = Math.round(frameRate.value * 60 * 10);
    const framesPerMin = fpsRound * 60 - dropPerMin;
    const tenMinBlocks = Math.floor(realFrames / framesPer10Min);
    const remainder = realFrames % framesPer10Min;
    const skippedInBlocks = dropPerMin * 9 * tenMinBlocks;
    const skippedInRemainder =
      remainder > dropPerMin
        ? dropPerMin * Math.floor((remainder - dropPerMin) / framesPerMin)
        : 0;
    labelFrames = realFrames + skippedInBlocks + skippedInRemainder;
  }

  const f = labelFrames % fpsRound;
  const totalSec = Math.floor(labelFrames / fpsRound);
  const s = totalSec % 60;
  const m = Math.floor(totalSec / 60) % 60;
  const h = Math.floor(totalSec / 3600);

  const pad = (x: number) => x.toString().padStart(2, "0");
  const sep = dropFrame ? ";" : ":";
  return `${pad(h)}${sep}${pad(m)}${sep}${pad(s)}${sep}${pad(f)}`;
};

/** Check is the sequence displays drop-frame timecode ("HH;MM;SS;FF") */
export const isSequenceDropFrame = async (
  sequence: Sequence,
): Promise<boolean> => {
  const display = await (await sequence.getSettings()).getVideoDisplayFormat();
  return display.type === 102 || display.type === 106; //102 = 29.97, 106 = 59.94 (both drop-frame)
};

/**Format a TickTime as the timecode that the given sequence would display*/
export const getTimecodeFromSequence = async (
  time: TickTime,
  sequence: Sequence,
): Promise<string> => {
  const settings = await sequence.getSettings();
  const frameRate = settings.getVideoFrameRate();
  const dropFrame = await isSequenceDropFrame(sequence);
  return timeToTimecode(time, frameRate, dropFrame);
};

/** Get the sequence length in frames. */
export const getSequenceLengthInFrames = async (
  sequence: Sequence,
): Promise<number> => {
  const end = await sequence.getEndTime();
  const fps = (await sequence.getSettings()).getVideoFrameRate();
  return timeToFrames(end, fps);
};

//Metadata helpers
const PPRO_META_URI = "http://ns.adobe.com/premierePrivateProjectMetaData/1.0/";

/**
 * Read metadata fields off a ProjectItem. Missing or empty fields are omitted
 *
 * To discover available fields on an item use `listPrMetadataIds` or `findColumnIdByName`
 *
 * @example await getPrMetadata(item, ["Column.Intrinsic.Name", "Column.Intrinsic.MediaType"])
 */
export const getPrMetadata = async (
  projectItem: ProjectItem,
  fields: string[],
): Promise<Record<string, string>> => {
  //@ts-ignore
  const { XMPMeta } = uxp.xmp;
  const xmpStr = await premierepro.Metadata.getProjectMetadata(projectItem);
  const xmp = new XMPMeta(xmpStr);
  const result: { [key: string]: string } = {};

  for (const field of fields) {
    if (xmp.doesPropertyExist(PPRO_META_URI, field)) {
      result[field] = xmp.getProperty(PPRO_META_URI, field).value;
    }
  }
  return result;
};

/**
 * Helpter function to discover field names on a ProjectItem's project metadata.
 * Returns the local field names that can be fed back into `getPrMetadata`.
 */
export const listPrMetadataIds = async (
  projectItem: ProjectItem,
): Promise<string[]> => {
  //@ts-ignore
  const { XMPMeta, XMPConst } = uxp.xmp;
  const xmp = new XMPMeta(
    await premierepro.Metadata.getProjectMetadata(projectItem),
  );
  const it = xmp.iterator(XMPConst.ITERATOR_JUST_CHILDREN, PPRO_META_URI, "");

  const keys: string[] = [];
  let n: any;
  while ((n = it.next())) {
    if (!n.path) continue;
    if (n.path.includes("/")) continue; // skip nested struct internals
    keys.push(n.path.replace(/^premierePrivateProjectMetaData:/, ""));
  }
  return keys;
};

type PrMetaField =
  | { name: string; id?: string; value: string; type?: "text" }
  | { name: string; id?: string; value: number; type: "integer" | "real" }
  | { name: string; id?: string; value: boolean; type: "boolean" };

/**
 * Set metadata fields on a ProjectItem. Update existing
 * columns (e.g. `Column.PropertyText.Name`) or add new (e.g. `HyperbrewPlugin.Notes`)
 *
 * For built-in fields you must pass the real internal ColumnID — use
 * `findColumnIdByName(item, "Description")` to look one up by display name
 */
export const setPrMetadata = async (
  projectItem: ProjectItem,
  fields: PrMetaField[],
): Promise<void> => {
  //@ts-ignore
  const { XMPMeta } = uxp.xmp;
  const project = await projectItem.getProject();

  const xmp = new XMPMeta(
    await premierepro.Metadata.getProjectMetadata(projectItem),
  );
  const updated: string[] = [];

  for (const field of fields) {
    const type = field.type ?? "text";

    const typeCode = (premierepro.Metadata as any)[
      `METADATA_TYPE_${type.toUpperCase()}` //get static numeric metadata type code
    ];

    //Ensure field is registered, returns false if already exists on schema
    await premierepro.Metadata.addPropertyToProjectMetadataSchema(
      field.name,
      field.id ?? field.name,
      typeCode,
    );

    // Booleans must be capitalized "True"/"False"; everything else stringifies fine
    const value =
      type === "boolean"
        ? field.value
          ? "True"
          : "False"
        : String(field.value);
    xmp.setProperty(PPRO_META_URI, field.name, value);
    updated.push(field.name);
  }

  await lockedTransactionSafe(
    project,
    [
      () =>
        premierepro.Metadata.createSetProjectMetadataAction(
          projectItem,
          xmp.serialize(),
          updated,
        ),
    ],
    "Set Project Metadata",
  );
};

/** Field reference for `removePrMetadata`.
 *
 * Pass a bare string for text fields (full delete), or `{ name, type }` for
 * typed fields so the function can reset them to a clean default
 */
type PrMetaRemoveField =
  | string
  | { name: string; type: "text" | "integer" | "real" | "boolean" };

/**
 * Remove or clear Premiere project metadata fields on a ProjectItem
 *
 * **Behavior depends on field type:**
 * - **Text** fields are deleted from the XMP
 * - **Bool/Int/Real** fields cannot be deleted - Premiere's schema layer
 *   re-inserts a value. To avoid that the function
 *   overwrite with a default (`False`/`0`/`0.000000`) so
 *   the panel shows a sane empty state
 *
 * Note: this doesn't unregister the field from the project schema -
 * the column will still appear in the Project panel's column
 *
 * @example
 * await removePrMetadata(item, [
 *   "Hyperbrew.SomeText",                           // string → text delete
 *   { name: "Hyperbrew.SomeBool", type: "boolean" } // → reset to "False"
 * ])
 */
export const removePrMetadata = async (
  projectItem: ProjectItem,
  fields: PrMetaRemoveField[],
): Promise<void> => {
  //@ts-ignore
  const { XMPMeta } = uxp.xmp;
  const project = await projectItem.getProject();
  const xmp = new XMPMeta(
    await premierepro.Metadata.getProjectMetadata(projectItem),
  );

  const touched: string[] = [];
  for (const field of fields) {
    const name = typeof field === "string" ? field : field.name;
    const type = typeof field === "string" ? "text" : field.type;

    if (!xmp.doesPropertyExist(PPRO_META_URI, name)) continue;

    if (type === "text") {
      // Text type field- fully delete from XMP
      xmp.deleteProperty(PPRO_META_URI, name);
    } else {
      // custom set typed field - reset to default, otherwise Premiere always re-inserts a magic number
      const defaultValue =
        type === "boolean" ? "False" : type === "integer" ? "0" : "0.000000";
      xmp.setProperty(PPRO_META_URI, name, defaultValue);
    }
    touched.push(name);
  }

  if (!touched.length) return;

  await lockedTransactionSafe(
    project,
    [
      () =>
        premierepro.Metadata.createSetProjectMetadataAction(
          projectItem,
          xmp.serialize(),
          touched,
        ),
    ],
    "Remove Project Metadata",
  );
};

/** Find a registered column's internal ID by its display name (e.g. "Description"). */
export const findColumnIdByName = async (
  item: ProjectItem,
  displayName: string,
): Promise<string | undefined> => {
  const cols: { ColumnID: string; ColumnName: string }[] = JSON.parse(
    await premierepro.Metadata.getProjectColumnsMetadata(item),
  );
  return cols.find((c) => c.ColumnName === displayName)?.ColumnID;
};

// Audio Conversions

/** Convert dB to a linear decimal gain value */
export const dbToDec = (x: number) => Math.pow(10, (x - 15) / 20);

/** Convert a linear decimal gain value to dB */
export const decToDb = (x: number) => 20 * Math.log(x) * Math.LOG10E + 15;
