import { CSSProperties, ReactNode } from "react";

interface Props {
  width?: number;
  height?: number;
  styles?: CSSProperties;
  children?: ReactNode;
}

const Card = ({ width = 520, height = 320, styles, children }: Props) => {
  return (
    <div
      style={{
        ...styles,
        color: "#0063B2",
        borderRadius: 8,
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        padding: 16,
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
