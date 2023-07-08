import "./App.css";
import Datas from "./Pages/Datas";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import { auth } from "./Firebase";
import { useState } from "react";
import { GoogleAuthProvider, User, signInWithPopup } from "firebase/auth";

const App = () => {
  const [userData, setUserData] = useState<User | null>(null);

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((data) => {
        setUserData(data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      style={{
        minWidth: "100vw",
        minHeight: "100vh",
        backgroundColor: "white",
      }}
    >
      <Header />
      <button onClick={handleGoogleLogin}>Login</button>
      <Routes>
        <Route path="/" element={<Datas />} />
      </Routes>
    </div>
  );
};

export default App;
