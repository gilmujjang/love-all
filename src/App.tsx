import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { auth } from "./Firebase";
import { authStore } from "./store/authStore";
import Header from "./components/Header";
import Datas from "./Pages/Datas";
import { getMembers } from "./utils/api";
import { IMember, memberStore } from "./store/memberStore";
import Admin from "./Pages/Admin";

const App = () => {
  const { user, setIsAdmin, setIsManager, autoLogin } = authStore();
  const { setMembers } = memberStore();

  useEffect(() => {
    autoLogin(auth);
  }, [autoLogin]);

  useEffect(() => {
    if (user) {
      const temp: IMember[] = [];
      getMembers().then((memberCollection) => {
        memberCollection.forEach((memberDocument) => {
          const userData = memberDocument.data() as IMember;
          if (userData.uid === user.uid) {
            if (userData.isManager) setIsManager(true);
            if (userData.isAdmin) setIsAdmin(true);
          }
          temp.push(userData);
        });
      });
      setMembers(temp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div
      style={{
        minWidth: "100vw",
        minHeight: "100vh",
        backgroundColor: "white",
      }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<Datas />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
};

export default App;
