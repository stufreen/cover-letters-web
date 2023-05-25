import { useState } from "preact/hooks";
import "./app.css";
import { Header } from "./Header";
import { JobForm } from "./JobForm";
import { ResultsPanel } from "./ResultsPanel";

export function App() {
  const [results, setResults] = useState<string>("");

  return (
    <>
      <Header />
      <aside>
        <JobForm setResults={setResults} />
      </aside>
      <main>
        <ResultsPanel results={results} />
      </main>
    </>
  );
}
