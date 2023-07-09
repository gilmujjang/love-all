import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { SkyBlue, ThemeColor } from "../assets/constants";
import styled from "styled-components";
import { authStore } from "../store/authStore";
import { BoxShadow } from "../utils/styled";
import { auth } from "../Firebase";
import googleImage from "../assets/images/googleLogin.png";
import NoProfileImage from "../assets/images/noProfileImage.png";

const Header = () => {
  const { user, isManager, handleGoogleLogin, handleLogout } = authStore();
  const [menuMore, setMenuMore] = useState(false);

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
      <div style={{ display: "flex", alignItems: "center" }}>
        {user ? (
          <ProfileWrapper
            style={{
              position: "relative",
              display: "flex",
            }}
            onClick={() => setMenuMore(!menuMore)}
          >
            <Profile src={user.photoURL || NoProfileImage} />
            <DisplayName>{user.displayName}님</DisplayName>
            {menuMore && (
              <MenuWrapper>
                {isManager && <MenuNavLink to={"/admin"}>어드민</MenuNavLink>}
                <Menu onClick={() => handleLogout(auth)}>로그아웃</Menu>
              </MenuWrapper>
            )}
          </ProfileWrapper>
        ) : (
          <GoogleLogin onClick={handleGoogleLogin} />
        )}
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

const GoogleLogin = styled.div`
  background-image: url(${googleImage});
  background-size: contain;
  width: 144px;
  height: 36px;
  cursor: pointer;
`;

const ProfileWrapper = styled.div`
  cursor: pointer;
`;

const Profile = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 32px;
`;

const DisplayName = styled.div`
  display: flex;
  align-items: center;
  margin-left: 4px;
  font-weight: 600;
`;

const MenuWrapper = styled.ul`
  position: absolute;
  top: 40px;
  left: 0px;
  border: 1px solid lightgray;
  border-top: none;
  border-radios: 8px;
  box-shadow: ${BoxShadow};
  z-index: 1;
`;

const Menu = styled.li`
  width: 94px;
  background-color: white;
  border-top: 1px solid lightgray;
  padding: 4px 8px;
  &:hover {
    background-color: whitesmoke;
  }
`;

const MenuNavLink = styled(NavLink)`
  display: block;
  width: 94px;
  background-color: white;
  border-top: 1px solid lightgray;
  padding: 4px 8px;
  &:hover {
    background-color: whitesmoke;
  }
`;

export default Header;
