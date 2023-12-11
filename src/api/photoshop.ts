import { photoshop } from "../globals";

export const notify = async (message: string) => {
  await photoshop.app.showAlert(message);
};
