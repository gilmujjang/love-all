import { useState, useEffect } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import ActiveChart from "../components/Datas/ActiveChart";
import CourtChart from "../components/Datas/CourtChart";
import PlayerChart from "../components/Datas/PlayerChart";
import ReserveChart from "../components/Datas/ReserveChart";
import SearchInput from "../components/SearchInput";
import { RangeEnum, OriginData, DataEnum } from "../types";
import { countData, getData, getMyGameData } from "../utils/data";
import { getRangeDisplayName, makeRangeDate } from "../utils/utils";
import { ThemeColor } from "../assets/constants";
import BestPartnerChart from "../components/Datas/BestPartnerChart";
import PlayerInfoCard from "../components/Datas/PlayerInfoCard";
import WeekChart from "../components/Datas/WeekChard";
import LoveAllInfoCard from "../components/Datas/LoveAllInfoCard";

const Datas = () => {
  const [range, setRange] = useState(RangeEnum.육개월);
  const [data, setData] = useState<OriginData[]>([]);
  const [playerList, setPlayerList] = useState<string[]>([]);
  const [rainyData, setRainyData] = useState<OriginData[]>([]);
  const [reservedData, setReservedData] = useState<OriginData[]>([]);
  const [myGameData, setMyGameData] = useState<OriginData[]>([]);

  const [input, setInput] = useState<string>("");
  const [autoTargetNameList, setAutoTargetNameList] = useState<string[]>([]);
  const [targetName, setTargetName] = useState<string>("");

  useEffect(() => {
    const totalData = getData({});
    const memberList = countData(totalData, DataEnum.이름);
    setPlayerList(Object.keys(memberList));
  }, []);

  useEffect(() => {
    const myData = getData({
      startDate: makeRangeDate(range),
      name: targetName ? targetName : undefined,
    });
    setData(myData);

    setRainyData(
      getData({
        startDate: makeRangeDate(range),
        name: targetName ? targetName : undefined,
        rainy: true,
      })
    );

    setReservedData(
      getData({
        startDate: makeRangeDate(range),
        reservation: targetName ? targetName : undefined,
      })
    );

    setMyGameData(
      getMyGameData({
        data: getData({ startDate: makeRangeDate(range) }),
        myPlayData: myData,
      })
    );
  }, [range, targetName]);

  useEffect(() => {
    if (input) {
      const filtered = playerList.filter((player) => {
        return player.toLowerCase().includes(input.toLowerCase());
      });

      const sorted = filtered.sort((a, b) => {
        const startsWithA = a.toLowerCase().startsWith(input.toLowerCase());
        const startsWithB = b.toLowerCase().startsWith(input.toLowerCase());
        if (startsWithA && !startsWithB) return -1;
        else if (!startsWithA && startsWithB) return 1;
        else return 0;
      });
      setAutoTargetNameList(sorted.slice(0, 8));
    } else setAutoTargetNameList([]);
  }, [playerList, input]);

  const renderCard = () => {
    if (targetName) {
      return (
        <div
          style={{
            width: "100%",
            maxWidth: 1080,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Card>
            <PlayerInfoCard
              data={myGameData}
              rainyData={rainyData}
              range={range}
              name={targetName}
            />
          </Card>
          {range !== RangeEnum.일개월 && (
            <Card>
              <ActiveChart
                data={data}
                reservedData={reservedData}
                name={targetName}
              />
            </Card>
          )}
          <Card>
            <CourtChart data={data} />
          </Card>
          <Card>
            <BestPartnerChart
              data={myGameData}
              name={targetName}
              onSubmit={(value: string) => {
                setInput("");
                setTargetName(value);
              }}
            />
          </Card>
          <Card>
            <WeekChart data={data} />
          </Card>
        </div>
      );
    } else {
      return (
        <div
          style={{
            width: "100%",
            maxWidth: 1080,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {range !== RangeEnum.일개월 && (
            <Card>
              <ActiveChart
                data={data}
                reservedData={reservedData}
                name={targetName}
              />
            </Card>
          )}
          <Card>
            <CourtChart data={data} />
          </Card>
          <Card>
            <PlayerChart data={data} />
          </Card>
          <Card>
            <ReserveChart data={reservedData} />
          </Card>
          <Card>
            <WeekChart data={data} />
          </Card>
          <Card>
            <LoveAllInfoCard data={data} rainyData={rainyData} />
          </Card>
        </div>
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          margin: "0px 20px 20px 20px",
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
            {targetName ? targetName : "러브올"}
          </span>
          <div style={{ display: "flex" }}>
            <Button
              onClick={() => setRange(RangeEnum.일개월)}
              isSelected={range === RangeEnum.일개월}
            >
              {getRangeDisplayName(RangeEnum.일개월)}
            </Button>
            <Button
              onClick={() => setRange(RangeEnum.삼개월)}
              isSelected={range === RangeEnum.삼개월}
            >
              {getRangeDisplayName(RangeEnum.삼개월)}
            </Button>
            <Button
              onClick={() => setRange(RangeEnum.육개월)}
              isSelected={range === RangeEnum.육개월}
            >
              {getRangeDisplayName(RangeEnum.육개월)}
            </Button>
            <Button
              onClick={() => setRange(RangeEnum.일년)}
              isSelected={range === RangeEnum.일년}
            >
              {getRangeDisplayName(RangeEnum.일년)}
            </Button>
            <Button
              onClick={() => setRange(RangeEnum.전체)}
              isSelected={range === RangeEnum.전체}
            >
              {getRangeDisplayName(RangeEnum.전체)}
            </Button>
            <SearchInput
              value={input}
              setValue={setInput}
              onSubmit={(value: string) => {
                setInput("");
                setTargetName(value);
              }}
              autoTargetNameList={autoTargetNameList}
            />
          </div>
        </div>
        {/* contents */}
        {renderCard()}
      </div>
      {/* insta */}
      <div style={{ position: "relative", width: "400px", height: "700px" }}>
        {/* <img
          src={IphoneImage}
          alt="iphone 14 pro image"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        /> */}
        <iframe
          src="https://www.instagram.com/loveall_tennis_official/embed"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    </div>
  );
};

export default Datas;
