import type {
  ActionDescriptor,
  BatchPlayCommandOptions,
} from "photoshop/dom/CoreModules";
import { photoshop, uxp } from "../../globals";

const { executeAsModal } = photoshop.core;
const { batchPlay } = photoshop.action;

export const asModal = async (commandName: string, callback: Function) => {
  return await executeAsModal(async () => await callback(), { commandName });
};

export const bpModal = async (
  commandName: string,
  commands: ActionDescriptor[],
  options?: BatchPlayCommandOptions,
): Promise<Array<ActionDescriptor>> => {
  return await executeAsModal(
    async () => await batchPlay(commands, options || {}),
    { commandName },
  );
};

export const bp = batchPlay;

export const deselectAllLayers = async () => {
  return await bpModal("Deselect All Layers", [
    {
      _obj: "selectNoLayers",
      _target: [
        {
          _ref: "layer",
          _enum: "ordinal",
          _value: "targetEnum",
        },
      ],
      _options: { dialogOptions: "dontDisplay" },
    },
  ]);
};
