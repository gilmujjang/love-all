import { gameDataStore } from "../../store/gameDataStore";
import { DataEnum } from "../../types";
import { countData, sortDataByValue } from "../../utils/data";

const LoveAllInfoCard = () => {
  const { rainyData } = gameDataStore();
  const countRainyData = sortDataByValue(countData(rainyData, DataEnum.이름));

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
      {countRainyData?.[0] && (
        <div>
          {countRainyData?.[0]?.key} 우천취소 {countRainyData[0].value}번
        </div>
      )}
    </div>
  );
};

export default LoveAllInfoCard;
