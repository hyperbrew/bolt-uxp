import type {
  ActionDescriptor,
  BatchPlayCommandOptions,
} from "photoshop/dom/CoreModules";

export const uxp = require("uxp") as typeof import("uxp");
const hostName = uxp && uxp?.host?.name?.toLowerCase();

const photoshop = (
  hostName === "photoshop" ? require("photoshop") : {}
) as typeof import("photoshop");

/** Run function in a Modal scope */
export const asModal = async (commandName: string, callback: Function) => {
  const { executeAsModal } = photoshop.core;
  return await executeAsModal(async () => await callback(), { commandName });
};

/** Run a BatchPlay action in a Modal scope */
export const bpModal = async (
  commandName: string,
  commands: ActionDescriptor[],
  options?: BatchPlayCommandOptions,
): Promise<Array<ActionDescriptor>> => {
  const { executeAsModal } = photoshop.core;
  const { batchPlay } = photoshop.action;
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

export default { asModal, bpModal, deselectAllLayers };
