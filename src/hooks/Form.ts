import { ValidatorInterface } from "@/interfaces/ValidatorInterface";
import { ChangeEvent, FormEvent, useState } from "react";

interface FormProps {
  values: { [key: string]: string };
  errors: { [key: string]: string };
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  removeLastField: () => void;
}

const useForm = (
  initialValues: { [key: string]: string },
  validator: ValidatorInterface,
  onSubmit: (values: { [key: string]: string }) => void
): FormProps => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: validator[name]?.(value) || "" }));
  };

  const removeLastField = () => {
    setValues((prevValues) => {
      const keys = Object.keys(prevValues);
      const lastTwoKeys = keys.slice(-1);
      const { [lastTwoKeys[0]]: _, [lastTwoKeys[1]]: __, ...remainingValues } = prevValues;
      return remainingValues;
    });

    setErrors((prevErrors) => {
      const keys = Object.keys(prevErrors);
      const lastTwoKeys = keys.slice(-1);
      const result = { ...prevErrors };
      lastTwoKeys.forEach((key) => delete result[key]);
      return result;
    });
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

  return { values, errors, handleChange, handleSubmit, removeLastField };
};

export default useForm;
