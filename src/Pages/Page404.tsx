import { Container, Typography } from "@mui/material";
import { Link } from "wouter";

const Page404 = () => {
  return (
    <Container>
      <Typography variant="h1">404 - Az oldal nem található</Typography>
      <Link href="/">Vissza a főoldalra</Link>
    </Container>
  );
};

export default Page404;
