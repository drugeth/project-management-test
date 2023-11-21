import { Link } from "wouter";
import { useRecoilValue } from "recoil";
import { Grid, Typography } from "@mui/material";

import { filteredProjectListSelector } from "@/selectors/selectors";
import { langDataState } from "@/atoms/atoms";
import Layout from "@/components/Layout/Layout";
import ProjectCard from "@/components/ui/ProjectCard/ProjectCard";
import ProjectSearch from "@/components/ui/ProjectSearch/ProjectSearch";
import AddIcon from "@/components/ui/SVG/AddIcon";

const ProjectList = () => {
  const langData = useRecoilValue(langDataState);
  const filteredProjects = useRecoilValue(filteredProjectListSelector);

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
