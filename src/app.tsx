import { useState } from "preact/hooks";
import "./app.css";
import { Header } from "./Header";
import { JobForm } from "./JobForm";
import { ResultsPanel } from "./ResultsPanel";
import { Footer } from "./Footer/Footer";

export function App() {
  const [results, setResults] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [resultsOpen, setResultsOpen] = useState(false);

  return (
    <>
      <Header />
      <main className="main-panel">
        <aside>
          <JobForm
            setResults={setResults}
            setLoading={setLoading}
            onSubmit={() => setResultsOpen(true)}
            loading={loading}
          />
        </aside>
        <section>
          <ResultsPanel
            results={results}
            loading={loading}
            open={resultsOpen}
            setOpen={setResultsOpen}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
