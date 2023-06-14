import { JobFormData } from "../types";

const KEY = "clm-form-data";

export const saveFormState = (data: JobFormData) => {
  const stringified = JSON.stringify(data);
  localStorage.setItem(KEY, stringified);
};

export const loadFormState = () => {
  const data = localStorage.getItem(KEY);

  if (data !== null) {
    return JSON.parse(data) as JobFormData;
  }
  return null;
};
