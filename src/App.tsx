import "./App.css";
import Datas from "./Pages/Datas";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";

const App = () => {
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
