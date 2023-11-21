import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { projectListState } from "@/atoms/atoms";
import { ProjectInterface } from "@/interfaces/ProjectInterface";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import { Grid, Typography } from "@mui/material";
import Layout from "@/components/Layout/Layout";
import ApiService from "@/services/ApiService";
import { Link } from "wouter";
import ProjectSearch from "@/components/ProjectSearch/ProjectSearch";
import { filteredProjectListSelector } from "../selectors/selectors";

const ProjectList = () => {
  const [projectData, setProjectData] = useRecoilState(projectListState);
  const filteredProjects = useRecoilValue(filteredProjectListSelector);

  const getProjectData = async () => {
    const apiService = ApiService.getInstance();
    try {
      const resp: ProjectInterface[] = await apiService.get(
        import.meta.env.VITE_APP_DATASOURCE_PROJECTS
      );
      setProjectData(resp);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!projectData.length) getProjectData();
  }, []);

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h1">Projektek listázása</Typography>
        </Grid>
        <Grid item xs={12}>
          <ProjectSearch />
        </Grid>
        {filteredProjects.map((item) => {
          return (
            <Grid item xs={12} md={4} key={item.baseData.id}>
              <ProjectCard
                key={item.baseData.id}
                id={item.baseData.id}
                name={item.baseData.name}
                description={item.baseData.description}
              />
            </Grid>
          );
        })}
      </Grid>
      <Grid item xs={12}>
        <Link href="/new-project">Hozzáad</Link>
      </Grid>
    </Layout>
  );
};

export default ProjectList;
