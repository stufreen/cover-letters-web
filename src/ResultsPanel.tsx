import "./ResultsPanel.css";

interface Props {
  results: string;
  loading: boolean;
}

export const ResultsPanel = ({ results, loading }: Props) => {
  return (
    <div className="results-panel">
      <h2 className="results-panel--header">Result</h2>
      {loading ? (
        <span className="results-panel--loading">Loading...</span>
      ) : (
        <div>{results || "Fill out the form to generate"}</div>
      )}
    </div>
  );
};
