import { useEffect } from "react";
import { Link, useParams } from "wouter";
import {
  Avatar,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";

import Layout from "@/components/Layout/Layout";
import { dyanimcProjectSelector } from "../selectors/selectors";
import { getPlaceholderImage } from "@/services/PlaceholderImageService";
import { getInitials } from "@/services/inititalsService";
import { getProjectData } from "@/services/dataSourcesService";
import { langDataState, projectListState } from "@/atoms/atoms";

const ProjectDetails = () => {
  const params = useParams();
  const [projectData, setProjectData] = useRecoilState(projectListState);
  const dynamicSelector = dyanimcProjectSelector(params.id);
  const selectedProjectData = useRecoilValue(dynamicSelector);
  const langData = useRecoilValue(langDataState);

  useEffect(() => {
    if (!projectData.length) {
      getProjectData()
        .then((response) => setProjectData(response))
        .catch((error) => console.log(error));
    }
  }, [projectData]);

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
          <div className="title d--f ai--c">
            <Avatar
              alt={selectedProjectData?.baseData.name}
              src={getPlaceholderImage(
                import.meta.env.VITE_APP_PLACEHOLDER_IMAGE_URL,
                80,
                80,
                getInitials(selectedProjectData?.baseData.name),
                "00acda",
                "ffffff",
                32
              )}
              sx={{ width: 80, height: 80, marginRight: "16px" }}
            />
            <div className="d--f fd--c">
              <Typography variant="h2" sx={{ marginBottom: "6px" }}>
                {selectedProjectData!.baseData.name}
              </Typography>
              <Typography variant="body1">{selectedProjectData!.baseData.description}</Typography>
            </div>
          </div>
          <hr />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">{langData?.members}:</Typography>
          <Table sx={{ marginTop: "16px", marginBottom: "16px" }}>
            <TableHead>
              <TableRow>
                <TableCell>{langData?.memberName}</TableCell>
                <TableCell>{langData?.memberRole}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedProjectData.members.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">{langData?.externals}:</Typography>
          <Table sx={{ marginTop: "16px", marginBottom: "16px" }}>
            <TableHead>
              <TableRow>
                <TableCell>{langData?.externalsName}</TableCell>
                <TableCell>{langData?.externalsLink}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedProjectData.externals.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <Link href={item.url}>{item.url}</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ProjectDetails;
