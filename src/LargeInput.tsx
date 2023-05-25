import { HTMLAttributes } from "preact/compat";

interface Props extends HTMLAttributes<HTMLTextAreaElement> {
  label: string;
  handleChange: (val: string) => void;
}

export const LargeInput = ({ label, handleChange, ...props }: Props) => {
  const handleInput = (e: any) => handleChange?.(e.target?.value);
  return (
    <label className="input-wrapper">
      <span className="input-label-text">{label}</span>
      <textarea
        type="text"
        onInput={handleInput}
        {...props}
        className="input-large"
      ></textarea>
    </label>
  );
};
