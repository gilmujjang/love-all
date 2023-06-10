import { Link } from "react-router-dom";
import { ThemeColor } from "../assets/constants";

const Header = () => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: "white",
        borderBottom: "1px solid gainsboro",
      }}
    >
      <Link
        to={"/"}
        style={{ fontWeight: "bold", fontSize: 24, color: ThemeColor }}
      >
        월간 러브올
      </Link>
    </header>
  );
};

export default Header;
