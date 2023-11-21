import { FC } from "react";
import { Avatar, Typography } from "@mui/material";

import { getInitials } from "@/services/inititalsService";
import { getPlaceholderImage } from "@/services/PlaceholderImageService";

interface ProjectDetailsHeaderInterface {
  name: string;
  description: string;
}

const ProjectDetailsHeader = ({ name, description }: ProjectDetailsHeaderInterface) => {
  return (
    <>
      <div className="title d--f ai--c">
        <Avatar
          alt={name}
          src={getPlaceholderImage(
            import.meta.env.VITE_APP_PLACEHOLDER_IMAGE_URL,
            80,
            80,
            getInitials(name),
            "00acda",
            "ffffff",
            32
          )}
          sx={{ width: 80, height: 80, marginRight: "16px" }}
        />
        <div className="d--f fd--c">
          <Typography variant="h2" sx={{ marginBottom: "6px" }}>
            {name}
          </Typography>
          <Typography variant="body1">{description}</Typography>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailsHeader;
