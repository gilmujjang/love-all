import { useEffect, useState } from "react";
import "./App.css";
import { getData } from "./utils/api";
import Header from "./components/Header";
import { OriginData, RangeEnum } from "./types";
import Card from "./components/Card";
import Button from "./components/Button";
import { makeRangeDate } from "./utils/utils";
import PlayerChart from "./components/Chart/PlayerChart";
import CourtChart from "./components/Chart/CourtChart";
import ActiveChart from "./components/Chart/ActiveChart";
import ReserveChart from "./components/Chart/ReserveChart";
import SearchInput from "./components/SearchInput";

function App() {
  const [range, setRange] = useState(RangeEnum.육개월);
  const [data, setData] = useState<OriginData[]>([]);
  const [text, setText] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    setData(
      getData({
        startDate: makeRangeDate(range),
        name: name ? name : undefined,
      })
    );
  }, [range, name]);

  return (
    <div
      className="bg-gray-50"
      style={{
        minWidth: "100vw",
        minHeight: "100vh",
      }}
    >
      <Header />
      <div
        style={{
          margin: "0px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* button container */}
        <div style={{ marginTop: 20, display: "flex" }}>
          <span
            style={{
              marginRight: 48,
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              color: "#0063B2",
            }}
          >
            {name ? name : "러브올"}
          </span>
          <div style={{ display: "flex" }}>
            <Button
              onClick={() => setRange(RangeEnum.일개월)}
              isSelected={range === RangeEnum.일개월}
            >
              1개월
            </Button>
            <Button
              onClick={() => setRange(RangeEnum.삼개월)}
              isSelected={range === RangeEnum.삼개월}
            >
              3개월
            </Button>
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
            <SearchInput
              text={text}
              setText={setText}
              onClick={() => setName(text)}
            />
          </div>
        </div>
        {/* contents */}
        <div style={{ width: 1080, display: "flex", flexWrap: "wrap" }}>
          <Card>
            <ActiveChart data={data} />
          </Card>
          <Card>
            <CourtChart data={data} />
          </Card>
          <Card>
            <PlayerChart data={data} />
          </Card>
          <Card>
            <ReserveChart data={data} />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
