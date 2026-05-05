import type {
  ActionDescriptor,
  BatchPlayCommandOptions,
} from "photoshop/dom/CoreModules";
import { photoshop, uxp } from "../../globals";

const { executeAsModal } = photoshop.core;
const { batchPlay } = photoshop.action;

/** Run function in a Modal scope */
export const asModal = async (commandName: string, callback: Function) => {
  return await executeAsModal(async () => await callback(), { commandName });
};

/** Run a BatchPlay action in a Modal scope */
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

/** Deselect All Layers */
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
