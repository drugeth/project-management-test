import { Grid, Step, StepButton, Stepper, Typography } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";

import { currentWizardStepState, langDataState } from "@/atoms/atoms";
import Layout from "@/components/Layout/Layout";
import ProjectBaseData from "@/components/Feature/Wizard/ProjectBaseData";
import ProjectMembers from "@/components/Feature/Wizard/ProjectMembers";
import ProjectExternals from "@/components/Feature/Wizard/ProjectExternals";

const NewProject = () => {
  const [activeStep, setActiveStep] = useRecoilState(currentWizardStepState);
  const langData = useRecoilValue(langDataState);
  const steps = [
    langData?.addProjectBaseData,
    langData?.addProjectMembers,
    langData?.addProjectExternals,
  ];

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h1">{langData?.addNewProject}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};

              return (
                <Step key={index} {...stepProps}>
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
