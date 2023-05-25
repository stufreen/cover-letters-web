interface Props {
  results: string;
}

export const ResultsPanel = ({ results }: Props) => {
  return (
    <div className="results-panel">
      <h2>Results panel</h2>
      <pre>{results}</pre>
    </div>
  );
};
