import "./ResultsPanel.css";
import classNames from "classnames";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  results: string;
  loading: boolean;
}

export const ResultsPanel = ({ open, setOpen, results, loading }: Props) => {
  return (
    <div
      className={classNames("results-panel", { "results-panel__open": open })}
    >
      <div
        className="results-panel--overlay"
        onClick={() => setOpen(false)}
      ></div>
      <div className="results-panel--content">
        <h2 className="results-panel--header">Result</h2>
        {loading ? (
          <span className="results-panel--loading">Loading...</span>
        ) : (
          <div>{results || "Fill out the form to generate"}</div>
        )}
        <button
          class="results-panel--closer-button"
          onClick={() => setOpen(false)}
        >
          <svg
            class="results-panel--closer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <title>Close navigation menu</title>
            <path
              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
