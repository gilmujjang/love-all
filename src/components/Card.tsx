import { CSSProperties, ReactNode } from "react";
import { ThemeColor } from "../assets/constants";
import { BoxShadow } from "../utils/styled";

interface Props {
  width?: number;
  height?: number;
  padding?: number;
  styles?: CSSProperties;
  children?: ReactNode;
}

const Card = ({
  width = 520,
  height = 320,
  padding = 16,
  styles,
  children,
}: Props) => {
  return (
    <div
      style={{
        ...styles,
        color: ThemeColor,
        backgroundColor: "white",
        borderRadius: 8,
        boxShadow: BoxShadow,
        padding: padding,
        width: width,
        height: height,
        marginRight: 16,
        maxWidth: "100%",
        marginTop: 20,
        display: "flex",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
};

export default Card;
