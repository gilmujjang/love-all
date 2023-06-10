import { useRef } from "react";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import ActiveChart from "../components/Chart/ActiveChart";
import CourtChart from "../components/Chart/CourtChart";
import PlayerChart from "../components/Chart/PlayerChart";
import ReserveChart from "../components/Chart/ReserveChart";
import SearchInput from "../components/SearchInput";
import { RangeEnum, OriginData } from "../types";
import { getData } from "../utils/api";
import { makeRangeDate } from "../utils/utils";
import { ThemeColor } from "../assets/constants";

const Datas = () => {
  const [range, setRange] = useState(RangeEnum.육개월);
  const [data, setData] = useState<OriginData[]>([]);
  const [reservedData, setReservedData] = useState<OriginData[]>([]);

  const [text, setText] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    setData(
      getData({
        startDate: makeRangeDate(range),
        name: name ? name : undefined,
      })
    );

    setReservedData(
      getData({
        startDate: makeRangeDate(range),
        reservation: name ? name : undefined,
      })
    );
  }, [range, name]);

  return (
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
            color: ThemeColor,
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
          <ActiveChart data={data} reservedData={reservedData} name={name} />
        </Card>
        <Card>
          <CourtChart data={data} />
        </Card>
        {name ? (
          <></>
        ) : (
          <Card>
            <PlayerChart data={data} />
          </Card>
        )}
        {name ? (
          <></>
        ) : (
          <Card>
            <ReserveChart data={reservedData} />
          </Card>
        )}
      </div>
    </div>
  );
};

export default Datas;
