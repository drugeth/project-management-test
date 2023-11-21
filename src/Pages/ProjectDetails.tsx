import { useParams } from "wouter";
import { Grid, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";

import Layout from "@/components/Layout/Layout";
import { dyanimcProjectSelector } from "../selectors/selectors";

const ProjectDetails = () => {
  const params = useParams();
  const dynamicSelector = dyanimcProjectSelector(params.id);
  const selectedProjectData = useRecoilValue(dynamicSelector);

  if (!selectedProjectData) {
    return "A projekt nem létezik!";
  }

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h1">Projekt részletei</Typography>
          <Typography variant="h2">{selectedProjectData?.baseData.name}</Typography>
          <Typography variant="body1">{selectedProjectData?.baseData.description}</Typography>
          <hr />
          <Typography variant="h3">Résztvevők:</Typography>
          {selectedProjectData.members.map((item, index) => (
            <div key={index}>
              <p>
                Név: {item.name}; Feladatkör: {item.role}
              </p>
            </div>
          ))}
          <hr />
          <Typography variant="h3">Kapcsolódó anyagok:</Typography>
          {selectedProjectData.externals.map((item, index) => (
            <div key={index}>
              <p>
                Megnevezés: {item.name}; URL: {item.url}
              </p>
            </div>
          ))}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ProjectDetails;
