/* eslint-disable */

import { Doughnut } from "react-chartjs-2";
import { DataEnum, OriginData } from "../../types";
import { countData, sortDataByValue } from "../../utils/api";
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

ChartJS.register(
  ChartDataLabels,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  ...registerables
);

interface Props {
  data: OriginData[];
}

const MAX = 8;

const CourtChart = ({ data }: Props) => {
  const countedData = sortDataByValue(countData(data, DataEnum.장소));
  const courtCount = countedData.splice(0, MAX);
  const etcCount = countedData
    .splice(MAX, countedData.length - 1)
    .reduce((sum, a) => sum + a.value, 0);
  const labels = [
    ...courtCount.map((item) => item.key + " " + item.value),
    "기타 " + etcCount,
  ];

  const dataSet = {
    labels: labels,
    datasets: [
      {
        backgroundColor: [
          ...courtCount.map((item) => makeCourtColor(item.key)),
          makeCourtColor("기타"),
        ],
        data: [...courtCount.map((item) => item.value), etcCount],
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
      <span style={{ whiteSpace: "nowrap" }}>코트장 비율👨‍💻</span>
      <div style={{ width: "100%", height: "100%" }}>
        <Doughnut data={dataSet} options={options} />
      </div>
    </div>
  );
};

export default CourtChart;
