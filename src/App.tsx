import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { auth } from "./Firebase";
import { authStore } from "./store";
import Header from "./components/Header";
import Datas from "./Pages/Datas";

const App = () => {
  const { autoLogin } = authStore();

  useEffect(() => {
    autoLogin(auth);
  }, [autoLogin]);

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
      </Routes>
    </div>
  );
};

export default App;
