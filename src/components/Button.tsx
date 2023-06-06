import { ReactNode } from "react";

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
        padding: "4px 12px",
        color: isSelected ? "#ffffff " : "#0063B2",
        backgroundColor: isSelected ? "#0063B2" : "#ffffff",
        borderRadius: 16,
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        marginRight: 8,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
