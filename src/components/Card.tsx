import React, { CSSProperties, ReactNode } from "react";

interface Props {
  styles?: CSSProperties;
  children?: ReactNode;
}

const Card = ({ styles, children }: Props) => {
  return (
    <div
      style={{
        ...styles,
        color: "#0063B2",
        borderRadius: 8,
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        padding: 16,
        width: 400,
        marginRight: 16,
        maxWidth: "100%",
        marginTop: 20,
      }}
    >
      {children}
    </div>
  );
};

export default Card;
