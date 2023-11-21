import { ProjectInterface } from "@/interfaces/ProjectInterface";
import ApiService from "./ApiService";
import { GenericObjectInterface } from "@/interfaces/GenericObjectInterface";

export const getProjectData = async () => {
  const apiService = ApiService.getInstance();
  return apiService.get<ProjectInterface[]>(import.meta.env.VITE_APP_DATASOURCE_PROJECTS);
};

export const getLanguageData = async () => {
  const apiService = ApiService.getInstance();
  return apiService.get<GenericObjectInterface>(import.meta.env.VITE_APP_DATASOURCE_LANG);
};
