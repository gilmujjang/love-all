import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SkyBlue, ThemeColor } from "../assets/constants";
import styled from "styled-components";
import { authStore } from "../store/authStore";
import { BoxShadow } from "../utils/styled";
import { auth } from "../Firebase";
import googleImage from "../assets/images/googleLogin.png";
import NoProfileImage from "../assets/images/noProfileImage.png";
import { gameDataStore } from "../store/gameDataStore";

const Header = () => {
  const { user, googleLoginInfo, handleGoogleLogin, handleLogout } =
    authStore();
  const { setSearchTarget } = gameDataStore();
  const [menuMore, setMenuMore] = useState(false);
  const navigate = useNavigate();

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
        onClick={() => {
          setSearchTarget({
            targetType: null,
            targetName: "",
          });
        }}
      >
        월간 러브올
      </Link>
      <div style={{ display: "flex", alignItems: "center" }}>
        {googleLoginInfo ? (
          <ProfileWrapper
            style={{
              position: "relative",
              display: "flex",
            }}
            onClick={() => setMenuMore(!menuMore)}
          >
            <Profile src={googleLoginInfo?.photoURL || NoProfileImage} />
            <DisplayName>
              {user?.name || googleLoginInfo.displayName}님
            </DisplayName>
            {menuMore && (
              <MenuWrapper>
                <Menu
                  style={{ borderTop: "none" }}
                  onClick={() => handleLogout(auth)}
                >
                  로그아웃
                </Menu>
                {!user && (
                  <Menu
                    style={{ borderTop: "none" }}
                    onClick={() => navigate("/SignUp")}
                  >
                    회원 가입
                  </Menu>
                )}
              </MenuWrapper>
            )}
          </ProfileWrapper>
        ) : (
          <GoogleLogin onClick={handleGoogleLogin} />
        )}
        <SubMenu to={"/"}>데이터 분석</SubMenu>
        {user?.isManager && <SubMenu to={"/admin"}>어드민</SubMenu>}
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
  border-radius: 8px;
  padding: 4px 0px;
  background-color: white;
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

export default Header;
