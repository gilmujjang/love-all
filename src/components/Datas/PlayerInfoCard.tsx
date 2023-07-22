import { gameDataStore } from "../../store/gameDataStore";
import { memberStore } from "../../store/memberStore";
import { DataEnum, RangeEnum } from "../../types";
import { countData, countPlayTimeData } from "../../utils/data";
import { getDuration, getRangeDisplayName } from "../../utils/utils";

const PlayerInfoCard = () => {
  const { members } = memberStore();
  const { searchTarget, range, myGameData, rainyData } = gameDataStore();
  const { targetName } = searchTarget;
  const playerInfo = members.find((member) => member.name === targetName);

  const playNum = countData(myGameData, DataEnum.이름)[targetName];
  const playTimeData = countPlayTimeData(myGameData, DataEnum.이름);
  const playTime = playTimeData[targetName] || 0;
  const haveRelation = Object.keys(playTimeData).length || 0;
  const rainyNum = countData(rainyData, DataEnum.이름)[targetName] || 0;

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

  const customRangeDisplayName = (range: RangeEnum) => {
    if (range === RangeEnum.전체) return "모든 시간";
    else return getRangeDisplayName(range);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <div style={{ whiteSpace: "nowrap", fontWeight: "bold", fontSize: 18 }}>
        러브올과 함께한 {customRangeDisplayName(range)}👑
      </div>
      <div
        style={{
          color: "black",
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
        }}
      >
        {playerInfo && (
          <>
            <Content bold={playerInfo.name} />
            <Content
              beforeBold="가입한지 "
              bold={getDuration(2, playerInfo.joinDate)}
            />
          </>
        )}
        <Content beforeBold="함께한 횟수" bold={` ${playNum}회`} />
        <Content beforeBold="함께한 시간" bold={` ${playTime}시간`} />
        <Content beforeBold="함께한 인연" bold={` ${haveRelation}명`} />
        <Content beforeBold="우천 취소" bold={` ${rainyNum}번`} />
      </div>
    </div>
  );
};

export default PlayerInfoCard;
