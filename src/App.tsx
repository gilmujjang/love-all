import { useEffect, useState } from "react";
import "./App.css";
import { getData, countData } from "./utils/api";
import Header from "./components/Header";
import { DataEnum, RangeEnum } from "./types";
import Card from "./components/Card";
import Button from "./components/Button";
import { makeRangeDate } from "./utils/utils";

function App() {
  const [range, setRange] = useState(RangeEnum.일년);

  useEffect(() => {
    const filteredData = getData({
      name: "민무길",
      startDate: makeRangeDate(range),
    });
    console.log("코트장별 횟수 비교");
    console.log(countData(filteredData, DataEnum.요일));
  }, [range]);

  return (
    <div
      className="bg-gray-50"
      style={{ minWidth: "100vw", minHeight: "100vh" }}
    >
      <Header />
      <body
        style={{
          margin: "0px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* button container */}
        <div style={{ marginTop: 20, display: "flex" }}>
          <Button
            onClick={() => setRange(RangeEnum.육개월)}
            isSelected={range === RangeEnum.육개월}
          >
            6개월
          </Button>
          <Button
            onClick={() => setRange(RangeEnum.일년)}
            isSelected={range === RangeEnum.일년}
          >
            1년
          </Button>
          <Button
            onClick={() => setRange(RangeEnum.전체)}
            isSelected={range === RangeEnum.전체}
          >
            전체
          </Button>
        </div>
        {/* contents */}
        <div style={{ width: 832, display: "flex", flexWrap: "wrap" }}>
          <Card>test</Card>
          <Card>test</Card>
          <Card>test</Card>
          <Card>test</Card>
        </div>
      </body>
    </div>
  );
}

export default App;
