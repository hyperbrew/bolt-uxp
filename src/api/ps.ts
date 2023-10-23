import { photoshop } from "../globals";

export const notify = (message: string) => {
  photoshop.app.showAlert(message);
};
