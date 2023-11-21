import { langDataState } from "@/atoms/atoms";
import { Container, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { Link } from "wouter";

const Page404 = () => {
  const langData = useRecoilValue(langDataState);

  return (
    <Container>
      <Typography variant="h1">404 - {langData?.pageNotFound}</Typography>
      <Link href="/">{langData?.backToMain}</Link>
    </Container>
  );
};

export default Page404;
