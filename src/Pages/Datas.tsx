import { useEffect } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import ActiveChart from "../components/Datas/ActiveChart";
import CourtChart from "../components/Datas/CourtChart";
import PlayerChart from "../components/Datas/PlayerChart";
import ReserveChart from "../components/Datas/ReserveChart";
import SearchInput from "../components/SearchInput";
import { RangeEnum, DataEnum } from "../types";
import { countData, getData, getMyGameData } from "../utils/data";
import { getRangeDisplayName, makeRangeDate } from "../utils/utils";
import { ThemeColor } from "../assets/constants";
import BestPartnerChart from "../components/Datas/BestPartnerChart";
import PlayerInfoCard from "../components/Datas/PlayerInfoCard";
import WeekChart from "../components/Datas/WeekChard";
import LoveAllInfoCard from "../components/Datas/LoveAllInfoCard";
import { gameDataStore } from "../store/gameDataStore";
import { GROUP_NAME } from "../constants";

const Datas = () => {
  const {
    searchTarget,
    range,
    setRange,
    setTotalData,
    setMyGameData,
    setReservedData,
    setRainyData,
    setPlayerList,
  } = gameDataStore();
  const { targetType, targetName } = searchTarget;

  useEffect(() => {
    const totalData = getData({});
    const memberList = countData(totalData, DataEnum.이름);
    setPlayerList(Object.keys(memberList));
  }, [setPlayerList]);

  useEffect(() => {
    const myData = getData({
      startDate: makeRangeDate(range),
      name: targetName ? targetName : undefined,
    });
    setTotalData(myData);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range, targetName]);

  const renderCard = () => {
    if (targetType === "player") {
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
            <PlayerInfoCard />
          </Card>
          {range !== RangeEnum.일개월 && (
            <Card>
              <ActiveChart />
            </Card>
          )}
          <Card>
            <CourtChart />
          </Card>
          <Card>
            <BestPartnerChart />
          </Card>
          <Card>
            <WeekChart />
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
          <Card>
            <LoveAllInfoCard />
          </Card>
          {range !== RangeEnum.일개월 && (
            <Card>
              <ActiveChart />
            </Card>
          )}
          <Card>
            <PlayerChart />
          </Card>
          <Card>
            <CourtChart />
          </Card>
          <Card>
            <ReserveChart />
          </Card>
          <Card>
            <WeekChart />
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
            {targetName ? targetName : GROUP_NAME}
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
            <SearchInput />
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
