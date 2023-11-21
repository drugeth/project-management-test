import { useParams } from "wouter";
import { Grid, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";

import Layout from "@/components/Layout/Layout";
import { dyanimcProjectSelector } from "@/selectors/selectors";
import { langDataState } from "@/atoms/atoms";
import ProjectDetailsHeader from "@/components/ui/ProjectDetails/ProjectDetailsHeader";
import ProjectDetailsMembers from "@/components/ui/ProjectDetails/ProjectDetailsMembers";
import ProjectDetailsExternals from "@/components/ui/ProjectDetails/ProjectDetailsExternals";

const ProjectDetails = () => {
  const params = useParams();
  const dynamicSelector = dyanimcProjectSelector(params.id);
  const selectedProjectData = useRecoilValue(dynamicSelector);
  const langData = useRecoilValue(langDataState);

  if (!selectedProjectData) {
    return (
      <Layout>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1">{langData?.projectDetails}</Typography>
          </Grid>
        </Grid>
      </Layout>
    );
  }

  return (
    <Layout>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h1" sx={{ marginBottom: "16px" }}>
            {langData?.projectDetails}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ProjectDetailsHeader
            name={selectedProjectData.baseData.name}
            description={selectedProjectData.baseData.description}
          />
          <hr />
        </Grid>
        <Grid item xs={12}>
          <ProjectDetailsMembers members={selectedProjectData.members} languageData={langData!} />
        </Grid>
        <Grid item xs={12}>
          <ProjectDetailsExternals
            externals={selectedProjectData.externals}
            languageData={langData!}
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ProjectDetails;
