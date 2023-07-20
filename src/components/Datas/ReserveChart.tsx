import { Bar } from "react-chartjs-2";
import { DataEnum } from "../../types";
import { countData, sortDataByValue } from "../../utils/data";
import {
  registerables,
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";
import { SkyBlue } from "../../assets/constants";
import { gameDataStore } from "../../store/gameDataStore";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  ...registerables
);

const ReserveChart = () => {
  const { reservedData } = gameDataStore();
  const playTimeCount = sortDataByValue(
    countData(reservedData, DataEnum.예약자)
  ).slice(0, 15);

  const dataSet = {
    labels: playTimeCount.map((item) => item.key),
    datasets: [
      {
        label: "예약횟수👍",
        backgroundColor: SkyBlue,
        data: playTimeCount.map((item) => item.value),
        datalabels: {
          labels: {
            title: null,
          },
        },
      },
    ],
  };

  return <Bar data={dataSet} />;
};

export default ReserveChart;
