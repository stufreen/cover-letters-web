import { useState } from "preact/hooks";
import { LargeInput } from "../LargeInput";
import { SmallInput } from "../SmallInput";
import { TargetedEvent } from "preact/compat";
import "./JobForm.css";
import {
  JobFormErrors,
  validateJobForm,
} from "../../utilities/validateJobForm";
import * as exampleData from "../../example-data.json";
import { JobFormData } from "../../types";
import { loadFormState, saveFormState } from "../../utilities/persist";

interface Props {
  loading?: boolean;
  onSubmit?: (data: JobFormData) => void;
}

const savedData = loadFormState() ?? exampleData;

export const JobForm = ({ loading, onSubmit }: Props) => {
  const [companyName, setCompanyName] = useState(savedData.companyName);
  const [jobDescription, setJobDescription] = useState(
    savedData.jobDescription
  );
  const [qualifications, setQualifications] = useState(
    savedData.qualifications
  );
  const [formErrors, setFormErrors] = useState<JobFormErrors>({});

  const handleSubmit = async (e: TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();

    const validationResult = validateJobForm({
      companyName,
      jobDescription,
      qualifications,
    });

    setFormErrors(validationResult.errors);

    if (validationResult.valid) {
      onSubmit?.({
        companyName,
        jobDescription,
        qualifications,
      });
      saveFormState({
        companyName,
        jobDescription,
        qualifications,
      });
    }
  };

  return (
    <form className="job-form--form" onSubmit={handleSubmit}>
      <div className="job-form">
        <SmallInput
          label="Company name"
          value={companyName}
          handleChange={setCompanyName}
          error={formErrors.companyName}
        />
        <LargeInput
          label="Job description"
          value={jobDescription}
          handleChange={setJobDescription}
          error={formErrors.jobDescription}
        />
        <LargeInput
          label="Your qualifications"
          value={qualifications}
          handleChange={setQualifications}
          error={formErrors.qualifications}
        />
      </div>
      <div className="job-form--submit-area">
        <button type="submit" className="job-form--submit" disabled={loading}>
          Generate cover letter
        </button>
      </div>
    </form>
  );
};
