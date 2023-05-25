import { useState } from "preact/hooks";
import { LargeInput } from "./LargeInput";
import { SmallInput } from "./SmallInput";
import { TargetedEvent } from "preact/compat";

interface Props {
  setResults: (val: string) => void;
}

export const JobForm = ({ setResults }: Props) => {
  const [jobDescription, setJobDescription] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [companyName, setCompanyName] = useState("");

  const handleSubmit = (e: TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    setResults(JSON.stringify({ companyName, jobDescription, qualifications }));
  };

  return (
    <div className="job-form">
      <h2>Job form</h2>
      <form onSubmit={handleSubmit}>
        <SmallInput
          label="Company name"
          value={companyName}
          handleChange={setCompanyName}
        />
        <LargeInput
          label="Job description"
          value={jobDescription}
          handleChange={setJobDescription}
        />
        <LargeInput
          label="Your qualifications"
          value={qualifications}
          handleChange={setQualifications}
        />
        <button type="submit">Go</button>
      </form>
    </div>
  );
};
