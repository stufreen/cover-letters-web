import { useState } from "preact/hooks";
import { LargeInput } from "./LargeInput";
import { SmallInput } from "./SmallInput";
import { TargetedEvent } from "preact/compat";
import { generateCoverLetter } from "./utilities/api";
import "./JobForm.css";
import { JobFormErrors, validateJobForm } from "./utilities/validateJobForm";
import * as exampleData from "./example-data.json";

interface Props {
  loading?: boolean;
  onSubmit?: () => void;
  setResults: (results: string) => void;
  setLoading: (loading: boolean) => void;
}

export const JobForm = ({
  loading,
  onSubmit,
  setResults,
  setLoading,
}: Props) => {
  const [companyName, setCompanyName] = useState(exampleData.companyName);
  const [jobDescription, setJobDescription] = useState(
    exampleData.jobDescription
  );
  const [qualifications, setQualifications] = useState(
    exampleData.qualifications
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
      setLoading(true);
      onSubmit?.();
      generateCoverLetter({
        companyName,
        jobDescription,
        qualifications,
        onUpdate: (result: string) => {
          setResults(result);
          setLoading(false);
        },
        onDone: () => setLoading(false),
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
