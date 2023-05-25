interface ValidateJobForm {
  companyName: string;
  jobDescription: string;
  qualifications: string;
}

interface ValidateJobFormSuccess {
  valid: true;
  errors: {};
}

export interface JobFormErrors {
  companyName?: string;
  jobDescription?: string;
  qualifications?: string;
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
}: ValidateJobForm): ValidateJobFormResult => {
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
