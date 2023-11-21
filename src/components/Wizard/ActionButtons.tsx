import { currentWizardStepState } from "@/atoms/atoms";
import { Button } from "@mui/material";
import { FC, MouseEvent } from "react";
import { useRecoilState } from "recoil";

interface ChildProps {
  callback: (e: MouseEvent<HTMLButtonElement>) => void;
}

const ActionButtons: FC<ChildProps> = ({ callback }) => {
  const [activeStep, setActiveStep] = useRecoilState(currentWizardStepState);

  const handleSubmitClick = (e: MouseEvent<HTMLButtonElement>) => {
    callback(e);
  };

  return (
    <div className="action-buttons-container">
      {activeStep > 0 && (
        <Button variant="outlined" onClick={() => setActiveStep((prev) => prev - 1)}>
          Vissza
        </Button>
      )}
      <Button variant="contained" disableElevation onClick={handleSubmitClick} type="submit">
        Tovább
      </Button>
    </div>
  );
};

export default ActionButtons;
