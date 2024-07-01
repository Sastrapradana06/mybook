"use client";

interface InputProps {
  name: string;
  type: "password" | "email" | "text" | undefined;
  placeholder?: string;
  size: "small" | "medium" | "large";
  value?: string;
  setValue?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  name,
  type,
  placeholder,
  size,
  value,
  setValue,
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={setValue}
      placeholder={placeholder}
      required={true}
      className={`w-full border p-2 outline-[#4D44B5]  pr-10 text-black ${inputSize[size]}`}
    />
  );
};

const inputSize = {
  small: "text-[.9rem] rounded-lg",
  medium: "text-[1.1rem] rounded-lg",
  large: "text-[1.3rem] rounded-xl",
};

export default Input;
