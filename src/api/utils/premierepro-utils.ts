import { premierepro } from "../../globals";
import { Action, Project } from "../../types/ppro";

export const asTransaction = async (
  proj: Project,
  actions: Action[],
  description: string,
) => {
  proj.executeTransaction(async (compAction) => {
    for (const action of actions) {
      compAction.addAction(action);
    }
  }, description);
};

export const lockedTransaction = async (
  proj: Project,
  actions: Action[],
  description: string,
) => {
  proj.lockedAccess(() =>
    proj.executeTransaction(async (compAction) => {
      for (const action of actions) {
        compAction.addAction(action);
      }
    }, description),
  );
};
