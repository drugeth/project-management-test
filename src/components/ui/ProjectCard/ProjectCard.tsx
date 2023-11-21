import { Link } from "wouter";
import { Avatar, Card, CardActions, CardContent, Typography } from "@mui/material";

import { getPlaceholderImage } from "@/services/PlaceholderImageService";
import { getInitials } from "@/services/inititalsService";

interface ProjectCardInterface {
  id: number;
  name: string;
  description: string;
}

const ProjectCard = ({ id, name, description }: ProjectCardInterface) => {
  return (
    <Card className="project-card">
      <CardContent>
        <div className="title d--f ai--c">
          <Avatar
            alt={name}
            src={getPlaceholderImage(
              import.meta.env.VITE_APP_PLACEHOLDER_IMAGE_URL,
              40,
              40,
              getInitials(name),
              "00acda",
              "ffffff",
              16
            )}
          />
          <Typography variant="h3">{name}</Typography>
        </div>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Link href={`/project-details/${id}`}>Részletek</Link>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
