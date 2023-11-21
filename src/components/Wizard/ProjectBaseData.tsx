import { FC, MouseEvent, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import useForm from "@/hooks/Form";

import { Grid, TextField } from "@mui/material";
import ActionButtons from "./ActionButtons";
import {
  currentWizardStepState,
  langDataState,
  newProjectState,
  projectListState,
} from "@/atoms/atoms";
import { ValidatorInterface } from "@/interfaces/ValidatorInterface";

const ProjectBaseData: FC = () => {
  const projectData = useRecoilValue(projectListState);
  const setNewProjectData = useSetRecoilState(newProjectState);
  const setActiveStep = useSetRecoilState(currentWizardStepState);
  const langData = useRecoilValue(langDataState);

  const formRef = useRef<HTMLFormElement | null>(null);
  const validator: ValidatorInterface = {
    name: (value) =>
      !value
        ? "A név mező kitöltése kötelező"
        : value.length > 255
        ? "A név maximális hossza 255 karakter lehet"
        : undefined,
    description: (value) =>
      value && value.length < 50
        ? "Leírás minimális hossza 50 karakter"
        : value.length > 500
        ? "Leírás maximális hossza 500 karakter lehet."
        : undefined,
  };

  const onSubmit = (values: { [key: string]: string }) => {
    setNewProjectData((prev) => {
      const newProjectData = Object.assign({}, prev);
      newProjectData.baseData = {
        id: projectData.length + 1,
        name: values.name,
        description: values.description,
      };

      return newProjectData;
    });
    setActiveStep((prev) => prev + 1);
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    { name: "", description: "" },
    validator,
    onSubmit
  );

  const handleCallback = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    formRef.current?.dispatchEvent(new Event("submit", { bubbles: true }));
  };

  return (
    <form className="small" onSubmit={handleSubmit} ref={formRef}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            name="name"
            label={langData?.projectName}
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <div>{errors.name}</div>}
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            name="description"
            label={langData?.projectDescription}
            multiline
            rows={4}
            value={values.description}
            onChange={handleChange}
          />
          {errors.description && <div>{errors.description}</div>}
        </Grid>
        <Grid item xs={12}>
          <ActionButtons callback={handleCallback} />
        </Grid>
      </Grid>
    </form>
  );
};

export default ProjectBaseData;
