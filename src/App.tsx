import { useState, useEffect } from "react";
import "./App.css";
import { getData } from "./utils/api";
import Header from "./components/Header";

function App() {
  useEffect(() => {
    // console.log(getData({ name: "민무길" }));
    // console.log("코트장별 횟수 비교");
    // const test: any = {};
    // getData({ name: "민무길" }).map((item) => {
    //   const { 장소 } = item;
    //   if (장소) {
    //     if (test[장소]) {
    //       test[장소] += 1;
    //     } else {
    //       test[장소] = 1;
    //     }
    //   }
    //   return null;
    // });
  }, []);

  return (
    <div
      className="bg-gray-50"
      style={{ minWidth: "100vw", minHeight: "100vh" }}
    >
      <Header />
      <div>hi</div>
    </div>
  );
}

export default App;
