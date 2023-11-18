import { currentWizardStepState } from "@/atoms/atoms";
import { Button } from "@mui/material";
import { FC, MouseEvent } from "react";
import { useRecoilState } from "recoil";

interface ChildProps {
  callback: (e: MouseEvent<HTMLButtonElement>) => void;
}

const ActionButtons: FC<ChildProps> = ({ callback }) => {
  const [activeStep] = useRecoilState(currentWizardStepState);

  const handleSubmitClick = (e: MouseEvent<HTMLButtonElement>) => {
    callback(e);
  };

  return (
    <>
      {activeStep > 0 && <Button variant="outlined">Vissza</Button>}
      <Button variant="contained" disableElevation onClick={handleSubmitClick} type="submit">
        Tovább
      </Button>
    </>
  );
};

export default ActionButtons;
