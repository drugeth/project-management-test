import { langDataState } from "@/atoms/atoms";
import { Container, Grid, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { Link } from "wouter";

const Footer = () => {
  const langData = useRecoilValue(langDataState);

  return (
    <footer>
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <p className="text-center">
              <Link href="/">{langData?.listProjects}</Link>&nbsp;|&nbsp;
              <Link href="/new-project">{langData?.addNewProject}</Link>
            </p>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" className="text-center">
              &copy; 2023
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
