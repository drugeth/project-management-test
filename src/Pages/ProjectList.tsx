import { useEffect } from "react";
import { Link } from "wouter";
import { useRecoilState, useRecoilValue } from "recoil";
import { Grid, Typography } from "@mui/material";

import { filteredProjectListSelector } from "../selectors/selectors";
import { langDataState, projectListState } from "@/atoms/atoms";
import Layout from "@/components/Layout/Layout";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import ProjectSearch from "@/components/ProjectSearch/ProjectSearch";
import AddIcon from "@/components/SVG/AddIcon";
import { getLanguageData, getProjectData } from "@/services/dataSourcesService";

const ProjectList = () => {
  const [projectData, setProjectData] = useRecoilState(projectListState);
  const [langData, setLangData] = useRecoilState(langDataState);
  const filteredProjects = useRecoilValue(filteredProjectListSelector);

  useEffect(() => {
    if (!projectData.length) {
      getProjectData()
        .then((response) => {
          setProjectData(response);
          getLanguageData()
            .then((response) => setLangData(response))
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
  }, [projectData]);

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} className="d--f jc--sb p--b1 ai--c">
          <Typography variant="h1">{langData?.listProjects}</Typography>
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
        <Link className="add-project-link d--f ai--c" href="/new-project">
          <AddIcon /> {langData?.addButtonText}
        </Link>
      </Grid>
    </Layout>
  );
};

export default ProjectList;
