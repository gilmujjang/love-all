import { ReactNode } from "react";
import { ThemeColor } from "../assets/constants";
import { BoxShadow } from "../utils/styled";

interface Props {
  isSelected?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

const Button = ({ isSelected = false, onClick, children }: Props) => {
  return (
    <button
      style={{
        fontSize: 14,
        fontWeight: 600,
        padding: "4px 8px",
        color: isSelected ? "#ffffff " : ThemeColor,
        backgroundColor: isSelected ? ThemeColor : "#ffffff",
        borderRadius: 16,
        boxShadow: BoxShadow,
        marginRight: 8,
        border: "1px solid lightgray",
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
