import { selector, selectorFamily } from "recoil";
import { projectListState, searchKeywordState } from "@/atoms/atoms";

export const dyanimcProjectSelector = selectorFamily({
  key: "projectSelector",
  get:
    (id: string | undefined) =>
    ({ get }) => {
      const projects = get(projectListState);
      return projects.find((project) => project.baseData.id === Number(id)) || null;
    },
});

export const filteredProjectListSelector = selector({
  key: "filteredProjectListState",
  get: ({ get }) => {
    const projects = get(projectListState);
    const searchKeyword = get(searchKeywordState).toLowerCase();

    return projects.filter(
      (project) =>
        project.baseData.name.toLowerCase().includes(searchKeyword) ||
        project.baseData.description.toLowerCase().includes(searchKeyword)
    );
  },
});
