import { FC } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

import { ProjectMemberInterface } from "@/interfaces/ProjectInterface";
import { GenericObjectInterface } from "@/interfaces/GenericObjectInterface";

interface ProjectDetailsMembersInterface {
  members: ProjectMemberInterface[];
  languageData: GenericObjectInterface;
}

const ProjectDetailsMembers: FC<ProjectDetailsMembersInterface> = ({
  members,
  languageData,
}: ProjectDetailsMembersInterface) => {
  return (
    <>
      <Typography variant="h3">{languageData?.members}:</Typography>
      <Table sx={{ marginTop: "16px", marginBottom: "16px" }}>
        <TableHead>
          <TableRow>
            <TableCell>{languageData?.memberName}</TableCell>
            <TableCell>{languageData?.memberRole}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ProjectDetailsMembers;
