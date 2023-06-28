import { DataEnum, OriginData, RangeEnum } from "../../types";
import { countData, countPlayTimeData } from "../../utils/api";
import { getRangeDisplayName } from "../../utils/utils";

interface Props {
  data: OriginData[];
  rainyData: OriginData[];
  range: RangeEnum;
  name: string;
}

const PlayerInfoCard = ({ data, rainyData, range, name }: Props) => {
  const playNum = countData(data, DataEnum.이름)[name];
  const playTimeData = countPlayTimeData(data, DataEnum.이름);
  const playTime = playTimeData[name];
  const haveRelation = Object.keys(playTimeData).length;
  const rainyNum = countData(rainyData, DataEnum.이름)[name];

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
      <div style={{ marginTop: 48, color: "black" }}>
        <Content title="함께한 횟수" text={`${playNum}회`} />
        <Content title="함께한 시간" text={`${playTime}시간`} />
        <Content title="함께한 인연" text={`${haveRelation}명`} />
        <Content title="우천취소" text={`${rainyNum}번`} />
      </div>
    </div>
  );
};

export default PlayerInfoCard;
