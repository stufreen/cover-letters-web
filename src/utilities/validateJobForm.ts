import { JobFormData } from "../types";

interface ValidateJobFormSuccess {
  valid: true;
  errors: {};
}

export interface JobFormErrors {
  companyName?: string;
  jobDescription?: string;
  qualifications?: string;
  tone?: string;
  length?: string;
}

interface ValidateJobFormFailure {
  valid: false;
  errors: JobFormErrors;
}

type ValidateJobFormResult = ValidateJobFormSuccess | ValidateJobFormFailure;

export const validateJobForm = ({
  companyName,
  jobDescription,
  qualifications,
}: JobFormData): ValidateJobFormResult => {
  let result: any = { valid: true, errors: {} };

  if (companyName.length === 0) {
    result.valid = false;
    result.errors.companyName = "Required";
  }

  if (jobDescription.length === 0) {
    result.valid = false;
    result.errors.jobDescription = "Required";
  }

  if (qualifications.length === 0) {
    result.valid = false;
    result.errors.qualifications = "Required";
  }

  return result;
};
