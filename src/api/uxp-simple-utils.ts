const uxp = require("uxp");
export const getUXPHostName = () => {
  let hostName = "";
  try {
    hostName = uxp.host.name.toLowerCase();
  } catch (error) {
    // console.warn("error accessing host, test if Illustrator");
    try {
      require("illustrator");
      hostName = "illustrator";
    } catch (error) {
      console.error("Failed to find Host App Name");
    }
  }
  return hostName;
};
