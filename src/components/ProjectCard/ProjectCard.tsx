import { Avatar, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Link } from "wouter";

type ProjectCard = {
  id: number;
  name: string;
  description: string;
};

const ProjectCard = ({ id, name, description }: ProjectCard) => {
  const getInitials = (): string => {
    return name
      .split(" ")
      .splice(0, 2)
      .map((el) => el.charAt(0))
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="project-card">
      <CardContent>
        <div className="title d--f ai--c">
          <Avatar
            alt={name}
            src={`${
              import.meta.env.VITE_APP_PLACEHOLDER_IMAGE_URL
            }/?width=100&height=100&text=${getInitials()}&bgColor=%2300acda&textColor=%23ffffff&fontSize=36`}
            sx={{ width: 56, height: 56 }}
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
