/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FC, Fragment, MouseEvent, useEffect, useRef } from "react";
import useForm from "@/hooks/Form";
import { useLocation } from "wouter";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button, Grid, TextField, Typography } from "@mui/material";

import ActionButtons from "./ActionButtons";
import { langDataState, newProjectState, projectListState } from "@/atoms/atoms";
import { ValidatorInterface } from "@/interfaces/ValidatorInterface";
import { ExternalInterface, ProjectInterface } from "@/interfaces/ProjectInterface";

interface FormValues {
  [key: string]: string;
}

const ProjectExternals: FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [newProjectData, setNewProjectData] = useRecoilState(newProjectState);
  const [, setProjectList] = useRecoilState(projectListState);
  const langData = useRecoilValue(langDataState);
  const [, setLocation] = useLocation();
  const initialValues: FormValues = {
    "member[0].name": "",
    "member[0].url": "",
  };
  const validator: ValidatorInterface = {
    "member[0].name": (value) => (!value ? langData?.validatorRequired : undefined),
    "member[0].url": (value) => (!value ? langData?.validatorRequired : undefined),
  };

  useEffect(() => {
    if (newProjectData && "externals" in newProjectData!) {
      setProjectList((prev) => [...prev, newProjectData as ProjectInterface]);
      setNewProjectData(null);
      setLocation("/");
    }
  }, [newProjectData]);

  const onSubmit = (values: { [key: string]: string }) => {
    setNewProjectData((prev) => {
      const newProjectData = Object.assign({}, prev);
      const formData: ExternalInterface[] = [];

      Object.keys(values).forEach((key) => {
        const matches = key.match(/\[(\d+)\]/);
        const idx = Number(matches![1]);
        const keyName = key.substring(key.indexOf(".") + 1);

        if (!formData[idx]) {
          formData[idx] = { name: "", url: "" };
        }

        formData[idx][keyName] = values[key];
      });

      newProjectData.externals = formData;

      return newProjectData;
    });
  };

  const { values, errors, handleChange, handleSubmit, removeLastField } = useForm(
    initialValues,
    validator,
    onSubmit
  );

  const addField = () => {
    const index = Object.keys(values).length / 2;
    const newNameField = `document[${index}].name`;
    const newUrlField = `document[${index}].url`;

    initialValues[newNameField] = "";
    initialValues[newUrlField] = "";

    validator[newNameField] = (value: string) =>
      value.trim() === "" ? langData?.validatorRequired : undefined;

    validator[newUrlField] = (value: string) =>
      value.trim() === "" ? langData?.validatorRequired : undefined;

    handleChange({
      target: {
        name: newNameField,
        value: initialValues[newNameField],
      },
    } as ChangeEvent<HTMLInputElement>);

    handleChange({
      target: {
        name: newUrlField,
        value: initialValues[newUrlField],
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
            <Typography variant="h2">Kapcsolódó anyag hozzáadása</Typography>
          </Grid>
          {Object.keys(values).map((fieldName, index) => (
            <Fragment key={fieldName}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  name={fieldName}
                  label={
                    fieldName.indexOf("name") !== -1
                      ? langData?.externalName
                      : langData?.externalLink
                  }
                  value={values[`values[${index}].name`]}
                  onChange={(e) =>
                    handleChange({
                      target: { name: fieldName, value: e.target.value },
                    } as ChangeEvent<HTMLInputElement>)
                  }
                />
                {errors[fieldName] && <div className="error-text">{errors[fieldName]}</div>}
              </Grid>
            </Fragment>
          ))}
          <Grid item xs={12}>
            <Button variant="outlined" onClick={addField} sx={{ marginRight: "16px" }}>
              Új link hozzáadása
            </Button>
            <Button variant="outlined" onClick={removeField} color="error">
              Utolsó link törlése
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

export default ProjectExternals;
