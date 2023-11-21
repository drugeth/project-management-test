export interface ProjectBaseDataInterface {
  id: number;
  name: string;
  description: string;
}

export interface ProjectMemberInterface {
  name: string;
  role: string;
  [key: string]: string;
}

export interface ExternalInterface {
  name: string;
  url: string;
  [key: string]: string;
}

export interface ProjectInterface {
  baseData: ProjectBaseDataInterface;
  members: ProjectMemberInterface[];
  externals: ExternalInterface[];
}
