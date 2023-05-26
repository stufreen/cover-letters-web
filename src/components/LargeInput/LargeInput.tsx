import { HTMLAttributes } from "preact/compat";
import "./LargeInput.css";

interface Props extends HTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  handleChange: (val: string) => void;
}

export const LargeInput = ({ label, handleChange, error, ...props }: Props) => {
  const handleInput = (e: any) => handleChange?.(e.target?.value);
  return (
    <label className="large-input--wrapper">
      <span className="large-input--label">{label}</span>
      {error && <span className="large-input--error">{error}</span>}
      <textarea
        type="text"
        onInput={handleInput}
        {...props}
        className="large-input--textarea"
      ></textarea>
    </label>
  );
};
