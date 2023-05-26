import { useState } from "preact/hooks";
import "./App.css";
import { Header } from "../Header";
import { JobForm } from "../JobForm";
import { ResultsPanel } from "../ResultsPanel";
import { Footer } from "../Footer";
import { generateCoverLetter } from "../../utilities/api";
import { JobFormData } from "../../types";

let cancel: () => Promise<void> | null;

export function App() {
  const [results, setResults] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [resultsOpen, setResultsOpen] = useState(false);

  const handleSubmit = ({
    companyName,
    jobDescription,
    qualifications,
  }: JobFormData) => {
    setLoading(true);
    setResultsOpen(true);
    setResults("");
    cancel = generateCoverLetter({
      companyName,
      jobDescription,
      qualifications,
      onUpdate: (result: string) => {
        setResults(result);
        setLoading(false);
      },
      onDone: () => setLoading(false),
    });
  };

  return (
    <>
      <Header />
      <main className="main-panel">
        <JobForm onSubmit={handleSubmit} loading={loading} />
        <ResultsPanel
          results={results}
          loading={loading}
          open={resultsOpen}
          closePanel={() => {
            cancel && cancel();
            setResultsOpen(false);
          }}
        />
      </main>
      <Footer />
    </>
  );
}
