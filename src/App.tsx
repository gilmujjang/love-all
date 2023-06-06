import { useState, useEffect } from "react";
import "./App.css";
import { getData, countData } from "./utils/api";
import Header from "./components/Header";
import { DataEnum } from "./types";

function App() {
  useEffect(() => {
    const filteredData = getData({ name: "민무길" });
    console.log("코트장별 횟수 비교");
    console.log(countData(filteredData, DataEnum.요일));
  }, []);

  return (
    <div
      className="bg-gray-50"
      style={{ minWidth: "100vw", minHeight: "100vh" }}
    >
      <Header />
    </div>
  );
}

export default App;
