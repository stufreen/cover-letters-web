import { HTMLAttributes } from "preact/compat";

interface Props extends HTMLAttributes<HTMLInputElement> {
  label: string;
  handleChange: (val: string) => void;
}

export const SmallInput = ({ label, handleChange, ...props }: Props) => {
  const handleInput = (e: any) => handleChange?.(e.target?.value);
  return (
    <label className="input-wrapper">
      <span className="input-label-text">{label}</span>
      <input
        type="text"
        onInput={handleInput}
        {...props}
        className="input-small"
      ></input>
    </label>
  );
};
