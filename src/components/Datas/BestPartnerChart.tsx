/* eslint-disable */

import { DataEnum, OriginData } from "../../types";
import { countData, sortDataByValue } from "../../utils/data";

interface Props {
  data: OriginData[];
  name: string;
}

const MAX = 3;

const BestPartnerChart = ({ data, name }: Props) => {
  const countedData = countData(data, DataEnum.이름);
  delete countedData[name];
  const sortedCountedData = sortDataByValue(countedData);
  const courtCount = sortedCountedData.splice(0, MAX);
  const etcCount = sortedCountedData
    .splice(MAX, sortedCountedData.length - 1)
    .reduce((sum, a) => sum + a.value, 0);
  if (etcCount) courtCount.push({ key: "기타", value: etcCount });

  const labels = [
    ...courtCount.map((item) => item.key + " " + item.value + "회"),
  ];
  const sum = courtCount.reduce(
    (total, value) => (total += Number(value.value)),
    0
  );

  const RankBar = ({ rank }: { rank: number }) => {
    const makeFontColor = () => {
      switch (rank) {
        case 0:
          return "darkgoldenrod";
        case 1:
          return "darkgray";
        case 2:
          return "chocolate";
      }
    };

    const makeBackgroundColor = () => {
      switch (rank) {
        case 0:
          return "gold";
        case 1:
          return "lightgray";
        case 2:
          return "#624637";
      }
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: makeFontColor(),
            fontWeight: "bold",
            marginBottom: 4,
          }}
        >
          {labels[rank]}
        </div>
        <div
          style={{
            backgroundColor: makeBackgroundColor(),
            height: (4 - rank) * 40,
            width: 100,
            color: makeFontColor(),
            textAlign: "center",
          }}
        >
          {(100 * (courtCount[rank]?.value / sum)).toFixed(1)}%
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ whiteSpace: "nowrap", fontWeight: "bold", fontSize: 18 }}>
        베스트 파트너😋
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div></div>
        <RankBar rank={1} />
        <RankBar rank={0} />
        <RankBar rank={2} />
      </div>
    </div>
  );
};

export default BestPartnerChart;
