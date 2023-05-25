import { HTMLAttributes } from "preact/compat";
import "./SmallInput.css";

interface Props extends HTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  handleChange: (val: string) => void;
}

export const SmallInput = ({ label, error, handleChange, ...props }: Props) => {
  const handleInput = (e: any) => handleChange?.(e.target?.value);
  return (
    <label className="small-input--wrapper">
      <span className="small-input--label">{label}</span>
      {error && <span className="small-input--error">{error}</span>}
      <input
        type="text"
        onInput={handleInput}
        {...props}
        className="small-input--input"
      ></input>
    </label>
  );
};
