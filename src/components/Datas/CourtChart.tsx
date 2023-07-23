/* eslint-disable */

import { Doughnut } from "react-chartjs-2";
import { DataEnum } from "../../types";
import {
  countData,
  removeDuplicatedCourt,
  sortDataByValue,
} from "../../utils/data";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  registerables,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { makeCourtColor } from "../../utils/utils";
import { gameDataStore } from "../../store/gameDataStore";

ChartJS.register(
  ChartDataLabels,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  ...registerables
);

const MAX = 8;

const CourtChart = () => {
  const { totalData } = gameDataStore();
  const countedData = sortDataByValue(
    countData(removeDuplicatedCourt(totalData), DataEnum.장소)
  );
  const courtCount = countedData.splice(0, MAX);
  const etcCount = countedData
    .splice(MAX, countedData.length - 1)
    .reduce((sum, a) => sum + a.value, 0);
  if (etcCount) courtCount.push({ key: "기타", value: etcCount });

  const labels = [...courtCount.map((item) => item.key + " " + item.value)];

  const dataSet = {
    labels: labels,
    datasets: [
      {
        backgroundColor: [
          ...courtCount.map((item) => makeCourtColor(item.key)),
        ],
        data: [...courtCount.map((item) => item.value)],
        datalabels: {
          color: "white",
        },
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
  };

  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <span style={{ whiteSpace: "nowrap", fontWeight: "bold", fontSize: 18 }}>
        코트장 비율👨‍💻
      </span>
      <div style={{ width: "100%", height: "100%" }}>
        <Doughnut data={dataSet} options={options} />
      </div>
    </div>
  );
};

export default CourtChart;
