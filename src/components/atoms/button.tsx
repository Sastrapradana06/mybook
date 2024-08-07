"use-client";

interface ButtonProps {
  teks?: string;
  icons?: React.ReactNode;
  type: "submit" | "reset" | "button" | undefined;
  color: "purple" | "blue" | "red" | "green" | "yellow" | "dark" | "light";
  size: "tiny" | "small" | "medium" | "large";
  func?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  teks,
  icons,
  type,
  color,
  size,
  func,
}) => {
  return (
    <button
      className={`w-max ${buttonColor[color]} ${buttonSize[size]}  duration-200 cursor-pointer flex items-center justify-center gap-2`}
      type={type}
      onClick={func}
    >
      {icons}
      {teks}
    </button>
  );
};

const buttonColor = {
  purple: "bg-purple-500 hover:bg-purple-600",
  blue: "bg-blue-500 hover:bg-blue-600",
  red: "bg-red-500 hover:bg-red-600 text-white",
  green: "bg-green-500 hover:bg-green-600",
  yellow: "bg-yellow-500 hover:bg-yellow-600",
  dark: "bg-gray-800 hover:bg-gray-900",
  light: "bg-slate-200 hover:bg-slate-300",
};

const buttonSize = {
  tiny: "text-xs px-2 py-1 rounded-sm",
  small: "text-sm px-3 py-2 rounded-lg",
  medium: "text-[1.1rem] px-6 py-2 rounded-xl",
  large: "text-lg px-7 py-3 rounded-2xl",
};

export default Button;
