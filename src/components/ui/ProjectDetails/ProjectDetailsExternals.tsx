import { FC } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

import { GenericObjectInterface } from "@/interfaces/GenericObjectInterface";
import { ExternalInterface } from "@/interfaces/ProjectInterface";

interface ProjectDetailsExternalsInterface {
  externals: ExternalInterface[];
  languageData: GenericObjectInterface;
}

const ProjectDetailsExternals: FC<ProjectDetailsExternalsInterface> = ({
  externals,
  languageData,
}: ProjectDetailsExternalsInterface) => {
  return (
    <>
      <Typography variant="h3">{languageData?.externals}:</Typography>
      <Table sx={{ marginTop: "16px", marginBottom: "16px" }}>
        <TableHead>
          <TableRow>
            <TableCell>{languageData?.externalName}</TableCell>
            <TableCell>{languageData?.externalsLink}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {externals.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <a href={item.url} target="_blank">
                  {item.url}
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ProjectDetailsExternals;
