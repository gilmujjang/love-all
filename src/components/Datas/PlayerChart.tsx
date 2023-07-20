import { Bar } from "react-chartjs-2";
import { DataEnum } from "../../types";
import {
  countData,
  countPlayTimeData,
  sortDataByValue,
} from "../../utils/data";
import {
  registerables,
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";
import { ThemeColor } from "../../assets/constants";
import { useState } from "react";
import Radiobutton from "../RadioButton";
import { gameDataStore } from "../../store/gameDataStore";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  ...registerables
);

enum ChartType {
  count = 1,
  time = 2,
}

const PlayerChart = () => {
  const { totalData } = gameDataStore();
  const [chartType, setChartType] = useState(ChartType.count);

  const makePlayTimeCount = () => {
    switch (chartType) {
      case ChartType.count:
      default:
        return sortDataByValue(countData(totalData, DataEnum.이름)).slice(
          0,
          15
        );
      case ChartType.time:
        return sortDataByValue(
          countPlayTimeData(totalData, DataEnum.이름)
        ).slice(0, 15);
    }
  };

  const playTimeCount = makePlayTimeCount();

  const dataSet = {
    labels: playTimeCount.map((item) => item.key),
    datasets: [
      {
        label: chartType === ChartType.count ? "참석횟수💪" : "참석시간💪",
        backgroundColor: ThemeColor,
        data: playTimeCount.map((item) => item.value),
        datalabels: {
          labels: {
            title: null,
          },
        },
      },
    ],
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", alignSelf: "flex-end" }}>
        <Radiobutton
          value={ChartType.count}
          name="횟수"
          isSelected={chartType === ChartType.count}
          onChange={(e) => {
            const newChartType = Number(e.currentTarget.value);
            setChartType(newChartType);
          }}
        />
        <Radiobutton
          value={ChartType.time}
          name="시간"
          isSelected={chartType === ChartType.time}
          onChange={(e) => {
            const newChartType = Number(e.currentTarget.value);
            setChartType(newChartType);
          }}
        />
      </div>
      <Bar data={dataSet} />
    </div>
  );
};

export default PlayerChart;
