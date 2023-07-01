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
import { makeWeekColor } from "../../utils/utils";

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

const WeekChart = ({ data }: Props) => {
  const weekData = sortDataByValue(countData(data, DataEnum.요일));

  const labels = [...weekData.map((item) => item.key + " " + item.value)];

  const dataSet = {
    labels: labels,
    datasets: [
      {
        backgroundColor: [...weekData.map((item) => makeWeekColor(item.key))],
        data: [...weekData.map((item) => item.value)],
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
        요일 비율👨‍💻
      </span>
      <div style={{ width: "100%", height: "100%" }}>
        <Doughnut data={dataSet} options={options} />
      </div>
    </div>
  );
};

export default WeekChart;
