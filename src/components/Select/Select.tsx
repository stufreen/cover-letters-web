import { HTMLAttributes } from "preact/compat";
import "./Select.css";

interface Props extends HTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  value: string;
  options: {
    label: string;
    value: string;
  }[];
  handleChange: (val: string) => void;
}

export const Select = ({
  label,
  error,
  options,
  handleChange,
  value,
  ...props
}: Props) => {
  const handleInput = (e: any) => handleChange?.(e.target?.value);
  return (
    <label className="select--wrapper">
      <span className="select--label">{label}</span>
      {error && <span className="select--error">{error}</span>}
      <div className="select--input-wrapper">
        <select
          onChange={handleInput}
          value={value}
          {...props}
          className="select--input"
        >
          {options.map((option) => {
            return <option value={option.value}>{option.label}</option>;
          })}
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="select--arrow"
          viewBox="0 0 48 48"
        >
          <path d="m24 30-10-9.95h20Z" />
        </svg>
      </div>
    </label>
  );
};
