import { premierepro } from "../../globals";
import { Action, Project } from "../../types/ppro";

export const asLocked = async (proj: Project, actions: Action[]) => {
  proj.lockedAccess(() =>
    proj.executeTransaction(async (compAction) => {
      for (const action of actions) {
        compAction.addAction(action);
      }
    }),
  );
};
