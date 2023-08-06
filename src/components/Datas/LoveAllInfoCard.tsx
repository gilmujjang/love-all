import { useState, useEffect } from "react";
import { gameDataStore } from "../../store/gameDataStore";
import { memberStore } from "../../store/memberStore";
import { DataEnum } from "../../types";
import {
  countData,
  countPlayTimeData,
  removeDuplicatedCourt,
} from "../../utils/data";

const LoveAllInfoCard = () => {
  const { totalData } = gameDataStore();
  const { members } = memberStore();

  const [filteredPlayerList, setFilteredPlayerList] = useState<string[]>([]);
  const [playNum, setPlayNum] = useState(0);
  const [playTime, setPlayTime] = useState(0);

  useEffect(() => {
    const countPlayerList = countData(totalData, DataEnum.이름);
    const countPlayTimeList = countPlayTimeData(totalData, DataEnum.이름);
    setFilteredPlayerList(Object.keys(countPlayerList));
    setPlayNum(removeDuplicatedCourt(totalData).length);
    setPlayTime(
      Object.values(countPlayTimeList)?.reduce(
        (accumulate: number, curr: number) => accumulate + curr,
        0
      )
    );
  }, [totalData]);

  const Content = ({
    beforeBold,
    bold,
    afterBold,
  }: {
    beforeBold?: string;
    bold: string;
    afterBold?: string;
  }) => {
    return (
      <div
        style={{
          display: "flex",
          marginTop: 12,
          whiteSpace: "pre",
          color: "black",
        }}
      >
        {beforeBold && <div>{beforeBold}</div>}
        <div style={{ fontWeight: 600 }}>{bold}</div>
        {afterBold && <div>{afterBold}</div>}
      </div>
    );
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <div style={{ whiteSpace: "nowrap", fontWeight: "bold", fontSize: 18 }}>
        러브올의 기록
      </div>
      {members.length !== 0 && (
        <Content bold={`${members.length}명`} afterBold="의 가입 회원" />
      )}
      <Content bold={`${filteredPlayerList.length}명`} afterBold="의 참여" />
      <Content bold={`${playNum}번`} afterBold="의 만남" />
      <Content beforeBold="함께한" bold={` ${playTime}시간`} />
    </div>
  );
};

export default LoveAllInfoCard;
