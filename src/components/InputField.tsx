import { ChangeEvent } from "react";

interface InputFieldProps {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  name,
  type,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full border-2 border-neutral-200 px-2 text-base py-2 rounded-lg outline-none"
    />
  );
};
