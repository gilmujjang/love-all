import { Bar } from "react-chartjs-2";
import { DataEnum, OriginData } from "../../types";
import { countData, sortDataByValue } from "../../utils/api";
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

ChartJS.register(
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

const PlayerChart = ({ data }: Props) => {
  const playTimeCount = sortDataByValue(countData(data, DataEnum.이름)).slice(
    0,
    15
  );

  const dataSet = {
    labels: playTimeCount.map((item) => item.key),
    datasets: [
      {
        label: "참석횟수💪",
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

  return <Bar data={dataSet} />;
};

export default PlayerChart;
