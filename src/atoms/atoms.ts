import { ProjectInterface } from "../interfaces/ProjectInterface";
import { atom } from "recoil";

export const projectListState = atom<ProjectInterface[]>({
  key: "projectListState",
  default: [],
});
