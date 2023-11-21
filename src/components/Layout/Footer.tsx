import { Container, Grid, Typography } from "@mui/material";
import { Link } from "wouter";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <p className="text-center">
              <Link href="/">Projekt lista</Link>&nbsp;|&nbsp;
              <Link href="/new-project">Új projekt hozzáadása</Link>
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
