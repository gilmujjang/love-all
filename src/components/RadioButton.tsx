import { ReactNode } from "react";
import { ThemeColor } from "../assets/constants";

interface Props {
  isSelected?: boolean;
  value: string | number;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disable?: boolean;
}

const Radiobutton = ({
  isSelected = false,
  value,
  name,
  onChange,
  disable = false,
}: Props) => {
  return (
    <label style={{ marginRight: "8px" }}>
      <input
        type="radio"
        value={value}
        checked={isSelected}
        name={name}
        disabled={disable}
        onChange={(e) => onChange(e)}
        style={{ marginRight: "4px" }}
      />
      {name}
    </label>
  );
};

export default Radiobutton;
