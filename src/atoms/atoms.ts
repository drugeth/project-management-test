import { GenericObjectInterface } from "@/interfaces/GenericObjectInterface";
import { ProjectInterface } from "../interfaces/ProjectInterface";
import { atom } from "recoil";

export const projectListState = atom<ProjectInterface[]>({
  key: "projectListState",
  default: [],
});

export const langDataState = atom<GenericObjectInterface<string> | null>({
  key: "langDataState",
  default: null,
});

export const newProjectState = atom<ProjectInterface | null>({
  key: "newProjectState",
  default: null,
});

export const currentWizardStepState = atom({
  key: "currentWizardStepState",
  default: 0,
});

export const searchKeywordState = atom({
  key: "searchKeywordState",
  default: "",
});
