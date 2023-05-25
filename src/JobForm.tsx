import { useState } from "preact/hooks";
import { LargeInput } from "./LargeInput";
import { SmallInput } from "./SmallInput";
import { TargetedEvent } from "preact/compat";
import { generateCoverLetter } from "./utilities/api";
import "./JobForm.css";
import { JobFormErrors, validateJobForm } from "./utilities/validateJobForm";

interface Props {
  loading?: boolean;
  setResults: (results: string) => void;
  setLoading: (loading: boolean) => void;
}

export const JobForm = ({ loading, setResults, setLoading }: Props) => {
  const [jobDescription, setJobDescription] = useState(
    "Creating toys out of tires"
  );
  const [qualifications, setQualifications] = useState(
    "10 years building toys at SpinMaster out of recycled goods"
  );
  const [companyName, setCompanyName] = useState("TestCo");
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
    <div className="job-form">
      <form className="job-form--form" onSubmit={handleSubmit}>
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
        <button type="submit" className="job-form--submit" disabled={loading}>
          Generate cover letter
        </button>
      </form>
    </div>
  );
};
