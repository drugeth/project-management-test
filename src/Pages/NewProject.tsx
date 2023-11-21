import { Grid, Step, StepButton, Stepper, Typography } from "@mui/material";
import Layout from "@/components/Layout/Layout";
import ProjectBaseData from "@/components/Wizard/ProjectBaseData";
import ProjectMembers from "@/components/Wizard/ProjectMembers";
import ProjectExternals from "@/components/Wizard/ProjectExternals";
import { useRecoilState } from "recoil";
import { currentWizardStepState } from "@/atoms/atoms";

const NewProject = () => {
  const [activeStep, setActiveStep] = useRecoilState(currentWizardStepState);
  const steps = ["Alapadatok", "Résztvevők", "Hivatkozások"];

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h1">Új projekt</Typography>
        </Grid>
        <Grid item xs={12}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};

              return (
                <Step key={label} {...stepProps}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>
              );
            })}
          </Stepper>
        </Grid>
        <Grid item xs={12}>
          <div className={activeStep !== 0 ? "hidden" : ""}>
            <ProjectBaseData />
          </div>
          <div className={activeStep !== 1 ? "hidden" : ""}>
            <ProjectMembers />
          </div>
          <div className={activeStep !== 2 ? "hidden" : ""}>
            <ProjectExternals />
          </div>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default NewProject;
