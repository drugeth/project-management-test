export interface ProjectBaseDataInterface {
  id: number;
  name: string;
  description: string;
}

export interface ProjectMemberInterface {
  name: string;
  role: string;
}

export interface ExternalInterface {
  name: string;
  url: string;
}

export interface ProjectInterface {
  baseData: ProjectBaseDataInterface;
  members: ProjectMemberInterface[];
  externals: ExternalInterface[];
}
