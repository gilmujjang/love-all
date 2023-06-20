import { Link, NavLink } from "react-router-dom";
import { SkyBlue, ThemeColor } from "../assets/constants";
import styled from "styled-components";

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
      <div style={{ display: "flex" }}>
        <SubMenu to={"/"}>데이터 분석</SubMenu>
        <SubMenu to={"/insta"}>인스타</SubMenu>
      </div>
    </header>
  );
};

const SubMenu = styled(NavLink)`
  display: flex;
  align-items: center;
  margin-left: 20px;
  font-weight: 600;
  color: ${SkyBlue};
  &.active {
    color: ${ThemeColor};
    font-weight: bold;
  }
`;

export default Header;
