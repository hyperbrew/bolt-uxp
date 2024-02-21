export const openUXPPanel = async (id: string) => {
  const uxp = require("uxp") as typeof import("uxp");
  const plugins = Array.from(uxp.pluginManager.plugins);

  const plugin = plugins.find(
    (plugin) => plugin.id === uxp.entrypoints._pluginInfo.id
  );
  console.log("plugin", plugin, "opening panel: ", id);
  if (plugin) await plugin.showPanel(id);
  else console.error("No plugin found");
};
