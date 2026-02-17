import { ButtonProps } from "@type/Common";
import "./Button.css";

const Button = ({ text, type, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className={`Button Button_${type}`}>
      {text}
    </button>
  );
};

export default Button;
