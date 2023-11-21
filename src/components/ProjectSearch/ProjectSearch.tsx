import { searchKeywordState } from "@/atoms/atoms";
import { TextField } from "@mui/material";
import { ChangeEvent, FC } from "react";
import { useSetRecoilState } from "recoil";

const ProjectSearch: FC = () => {
  const setSearchKeyword = useSetRecoilState(searchKeywordState);

  return (
    <>
      <TextField
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchKeyword(e.target.value)}
        variant="outlined"
        label="Keresés"
        size="small"
        sx={{ backgroundColor: "var(--white-bg-color)" }}
      />
    </>
  );
};

export default ProjectSearch;
