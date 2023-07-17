import { gameDataStore } from "../../store/gameDataStore";
import { memberStore } from "../../store/memberStore";
import { DataEnum, RangeEnum } from "../../types";
import { countData, countPlayTimeData } from "../../utils/data";
import { getAge, getDuration, getRangeDisplayName } from "../../utils/utils";

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

  const Content = ({ title, text }: { title: string; text: string }) => {
    return (
      <div style={{ display: "flex", marginTop: 12 }}>
        <div>{title}</div>
        <div style={{ marginLeft: 8, fontWeight: 600 }}>{text}</div>
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
          marginTop: 24,
          color: "black",
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
        }}
      >
        {playerInfo && (
          <>
            <div style={{ fontWeight: 600 }}>
              {`${playerInfo.name} (${getAge(playerInfo.birthDay)})`}
            </div>
            <Content title="가입한지" text={getDuration(playerInfo.joinDate)} />
          </>
        )}
        <Content title="함께한 횟수" text={`${playNum}회`} />
        <Content title="함께한 시간" text={`${playTime}시간`} />
        <Content title="함께한 인연" text={`${haveRelation}명`} />
        <Content title="우천 취소" text={`${rainyNum}번`} />
      </div>
    </div>
  );
};

export default PlayerInfoCard;
