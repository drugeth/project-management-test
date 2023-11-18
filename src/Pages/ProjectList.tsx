import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { projectListState } from "@/atoms/atoms";
import { ProjectInterface } from "@/interfaces/ProjectInterface";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import { Grid, Typography } from "@mui/material";
import Layout from "@/components/Layout/Layout";
import ApiService from "@/services/ApiService";

const ProjectList = () => {
  const [projectData, setProjectData] = useRecoilState(projectListState);

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
    getProjectData();
  }, []);

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2">Projektek listázása</Typography>
        </Grid>
        {projectData.map((item) => {
          return (
            <Grid item xs={12} md={4}>
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
    </Layout>
  );
};

export default ProjectList;
