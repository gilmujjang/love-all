import { Line } from "react-chartjs-2";
import { OriginData } from "../../types";
import { countDataMonthly, sortDataByKey } from "../../utils/api";
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

const ActiveChart = ({ data }: Props) => {
  const playTimeCount = sortDataByKey(countDataMonthly(data));

  const dataSet = {
    labels: playTimeCount.map((item) => item.key),
    datasets: [
      {
        label: "월별 모임 횟수🎾",
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

  return <Line data={dataSet} />;
};

export default ActiveChart;
