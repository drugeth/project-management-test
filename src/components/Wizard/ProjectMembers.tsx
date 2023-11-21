import { ChangeEvent, FC, Fragment, MouseEvent, useRef } from "react";
import useForm from "@/hooks/Form";
import { useSetRecoilState } from "recoil";
import { Button, Grid, TextField, Typography } from "@mui/material";

import ActionButtons from "./ActionButtons";
import { currentWizardStepState, newProjectState } from "@/atoms/atoms";
import { ValidatorInterface } from "@/interfaces/ValidatorInterface";
import { ProjectMemberInterface } from "@/interfaces/ProjectInterface";

interface FormValues {
  [key: string]: string;
}

const ProjectMembers: FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const setActiveStep = useSetRecoilState(currentWizardStepState);
  const setNewProjectData = useSetRecoilState(newProjectState);
  const initialValues: FormValues = {
    "member[0].name": "",
    "member[0].role": "",
  };
  const validator: ValidatorInterface = {};

  const onSubmit = (values: { [key: string]: string }) => {
    setNewProjectData((prev) => {
      const newProjectData = Object.assign({}, prev);
      const formData: ProjectMemberInterface[] = [];

      Object.keys(values).forEach((key) => {
        const matches = key.match(/\[(\d+)\]/);
        const idx = Number(matches![1]);
        const keyName = key.substring(key.indexOf(".") + 1);

        if (!formData[idx]) {
          formData[idx] = { name: "", role: "" };
        }

        formData[idx][keyName] = values[key];
      });

      newProjectData.members = formData;

      return newProjectData;
    });
    setActiveStep((prev) => prev + 1);
  };

  const { values, errors, handleChange, handleSubmit, resetFields, removeLastField } = useForm(
    initialValues,
    validator,
    onSubmit
  );

  const addField = () => {
    const memberIndex = Object.keys(values).length / 2;
    const newNameField = `member[${memberIndex}].name`;
    const newRoleField = `member[${memberIndex}].role`;

    initialValues[newNameField] = "";
    initialValues[newRoleField] = "";

    validator[newNameField] = (value: string) =>
      value.trim() === "" ? "A mező kitöltése kötelező" : undefined;

    validator[newRoleField] = (value: string) =>
      value.trim() === "" ? "A mező kitöltése kötelező" : undefined;

    handleChange({
      target: {
        name: newNameField,
        value: initialValues[newNameField],
      },
    } as ChangeEvent<HTMLInputElement>);

    handleChange({
      target: {
        name: newRoleField,
        value: initialValues[newRoleField],
      },
    } as ChangeEvent<HTMLInputElement>);
  };

  const removeField = () => {
    removeLastField();
  };

  const handleCallback = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    formRef.current?.dispatchEvent(new Event("submit", { bubbles: true }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} ref={formRef}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h2">Projekt tagok hozzáadása</Typography>
          </Grid>
          {Object.keys(values).map((fieldName, index) => (
            <Fragment key={fieldName}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  name={fieldName}
                  label={fieldName.indexOf("name") !== -1 ? "Név" : "Beosztás"}
                  value={values[`values[${index}].name`]}
                  onChange={(e) =>
                    handleChange({
                      target: { name: fieldName, value: e.target.value },
                    } as ChangeEvent<HTMLInputElement>)
                  }
                />
                {errors[fieldName] && <div style={{ color: "red" }}>{errors[fieldName]}</div>}
              </Grid>
            </Fragment>
          ))}
          <Grid item xs={12}>
            <Button
              type="button"
              variant="outlined"
              onClick={addField}
              sx={{ marginRight: "16px" }}
            >
              Új tag hozzáadása
            </Button>
            <Button type="button" variant="outlined" onClick={removeField} color="error">
              Utolsó tag törlése
            </Button>
            <hr />
          </Grid>
          <Grid item xs={12}>
            <ActionButtons callback={handleCallback} />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default ProjectMembers;
