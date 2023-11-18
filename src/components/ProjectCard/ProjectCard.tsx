import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { Link } from "wouter";

type ProjectCard = {
  id: number;
  name: string;
  description: string;
};

const ProjectCard = ({ id, name, description }: ProjectCard) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h3">{name}</Typography>
        <Typography variant="body1">{description}</Typography>
      </CardContent>
      <CardActions>
        <Link href={`/project-details/${id}`}>Részletek</Link>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
