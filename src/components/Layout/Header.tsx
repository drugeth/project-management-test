import { langDataState } from "@/atoms/atoms";
import { getPlaceholderImage } from "@/services/PlaceholderImageService";
import { Avatar, Container, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { Link } from "wouter";

const Header = () => {
  const langData = useRecoilValue(langDataState);

  return (
    <header>
      <Container>
        <div className="title d--f ai--c">
          <Link href="/">
            <Avatar
              alt={langData?.headerTitle}
              src={getPlaceholderImage(
                import.meta.env.VITE_APP_PLACEHOLDER_IMAGE_URL,
                36,
                36,
                "PM",
                "00acda",
                "ffffff",
                13
              )}
              sx={{ marginRight: "12px" }}
            />
          </Link>
          <Typography variant="body1">{langData?.headerTitle}</Typography>
        </div>
      </Container>
    </header>
  );
};

export default Header;
