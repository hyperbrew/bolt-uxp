import { uxp } from "../globals";

export const openUXPPanel = async (id: string) => {
  const plugin = Array.from(uxp.pluginManager.plugins).pop();
  //@ts-ignore
  if (plugin) await plugin.showPanel(id);
};
