import { searchKeywordState } from "@/atoms/atoms";
import { TextField } from "@mui/material";
import { ChangeEvent, FC } from "react";
import { useRecoilState } from "recoil";

const ProjectSearch: FC = () => {
  const [searchKeyword, setSearchKeyword] = useRecoilState(searchKeywordState);

  return (
    <>
      <TextField
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchKeyword(e.target.value)}
        variant="outlined"
        label="Keresés"
        size="small"
        value={searchKeyword}
        sx={{ backgroundColor: "var(--white-bg-color)" }}
      />
    </>
  );
};

export default ProjectSearch;
