import { useEffect } from "react";
import SearchLayout from "../Layout/SearchLayout";
import { DataEnum, SearchType } from "../types";
import { countData, getData, getMyGameData } from "../utils/data";
import { makeRangeDate } from "../utils/utils";
import { ThemeColor } from "../assets/constants";
import { gameDataStore } from "../store/gameDataStore";
import { GROUP_NAME } from "../constants";
import RenderCard from "../Layout/RenderCard";

const Datas = () => {
  const {
    searchTarget,
    range,
    setTotalData,
    setMyGameData,
    setReservedData,
    setRainyData,
    setPlayerList,
    setCourtList,
  } = gameDataStore();
  const { targetName, targetType } = searchTarget;

  useEffect(() => {
    const totalData = getData({});
    const memberInfoObj = countData(totalData, DataEnum.이름);
    setPlayerList(Object.keys(memberInfoObj));
    const courtInfoObj = countData(totalData, DataEnum.장소);
    setCourtList(Object.keys(courtInfoObj));
  }, [setPlayerList, setCourtList]);

  useEffect(() => {
    const myData = getData({
      startDate: makeRangeDate(range),
      name: targetType === SearchType.player ? targetName : undefined,
      court: targetType === SearchType.court ? targetName : undefined,
    });
    setTotalData(myData);

    setRainyData(
      getData({
        startDate: makeRangeDate(range),
        name: targetType === SearchType.player ? targetName : undefined,
        court: targetType === SearchType.court ? targetName : undefined,
        rainy: true,
      })
    );

    setReservedData(
      getData({
        startDate: makeRangeDate(range),
        reservation: targetType === SearchType.player ? targetName : undefined,
        court: targetType === SearchType.court ? targetName : undefined,
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
          <SearchLayout />
        </div>
        {/* contents */}
        <RenderCard />
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
