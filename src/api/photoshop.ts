import { photoshop } from "../globals";

export const notify = async (message: string) => {
  await photoshop.app.showAlert(message);
};
export const getNumber = async () => {
  console.log("getNumber called");
  return 42;
};
