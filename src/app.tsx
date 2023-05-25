import { useState } from "preact/hooks";
import "./app.css";
import { Header } from "./Header";
import { JobForm } from "./JobForm";
import { ResultsPanel } from "./ResultsPanel";

export function App() {
  const [results, setResults] = useState<string>("");
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Header />
      <main className="main-panel">
        <aside>
          <JobForm
            setResults={setResults}
            setLoading={setLoading}
            loading={loading}
          />
        </aside>
        <section>
          <ResultsPanel results={results} loading={loading} />
        </section>
      </main>
    </>
  );
}
