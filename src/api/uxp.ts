import { config } from "../../uxp.config";
import { photoshop, uxp } from "../globals";

export { getColorScheme } from "./theme";

export const getUXPInfo = async () => {
  const info = {
    version: uxp.versions.uxp as string,
    hostName: uxp.host.name.toLowerCase() as string,
    hostVersion: uxp.host.version as string,
    pluginId: uxp.entrypoints._pluginInfo.id as string,
    pluginVersion: uxp.entrypoints._pluginInfo.version as string,
  };
  return info;
};
export const openURL = async (url: string) => {
  uxp.shell.openExternal(url, "");
};

export const psHideResizeHandle = async () => {
  const info = await getUXPInfo();
  if (info.hostName === "photoshop") {
    try {
      config.manifest.entrypoints.map((entry) => {
        photoshop.core.suppressResizeGripper({
          type: "panel",
          target: entry.id,
          value: true,
        });
      });
    } catch (e) {
      console.warn("Error hidiing resize handle", e);
    }
  }
};

export const initUXP = () => {
  psHideResizeHandle();
};
