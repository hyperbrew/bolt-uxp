import { config } from "../../uxp.config";
import { os, photoshop, uxp } from "../globals";
import { polyFillGlobalErrorHandler } from "./errors";
import { getColorScheme, polyfillUXPVars } from "./themes";

export { getColorScheme };

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

export const openUXPPanel = async (id: string) => {
  const plugins = Array.from(uxp.pluginManager.plugins);
  const plugin = plugins.find(
    (plugin) => plugin.id === uxp.entrypoints._pluginInfo.id,
  );
  if (plugin) {
    await plugin.showPanel(id);
    return true;
  } else {
    console.error("No plugin found");
    return false;
  }
};

export const initUXP = () => {
  psHideResizeHandle();
  polyFillGlobalErrorHandler();
  polyfillUXPVars();
};
