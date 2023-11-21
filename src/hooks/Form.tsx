import { ValidatorInterface } from "@/interfaces/ValidatorInterface";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface FormProps {
  values: { [key: string]: string };
  errors: { [key: string]: string };
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  resetFields: () => void;
  removeLastField: () => void;
}

const useForm = (
  initialValues: { [key: string]: string },
  validator: ValidatorInterface,
  onSubmit: (values: { [key: string]: string }) => void
): FormProps => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  /*useEffect(() => {
    console.log(values);
  }, [values]);*/

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: validator[name]?.(value) || "" }));
    /*setErrors((prevErrors) => {
      if (prevErrors[name]) {
        const { [name]: _, ...rest } = prevErrors;
        return rest;
      }
      return prevErrors;
    });*/
  };

  const resetFields = () => {
    setValues(initialValues);
    setErrors({});
  };

  const removeLastField = () => {
    const keys = Object.keys(values);
    if (keys.length > 0) {
      const lastKey = keys[keys.length - 1];
      const { [lastKey]: _removedValue, ...remainingValues } = values;

      setValues(remainingValues);
      setErrors((prevErrors) => {
        if (prevErrors[lastKey]) {
          const { [lastKey]: _, ...rest } = prevErrors;
          return rest;
        }
        return prevErrors;
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    Object.keys(validator).forEach((key) => {
      const error = validator[key](values[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(values);
    }
  };

  return { values, errors, handleChange, handleSubmit, resetFields, removeLastField };
};

export default useForm;
