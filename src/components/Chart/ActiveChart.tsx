import { Line } from "react-chartjs-2";
import { DataEnum, OriginData } from "../../types";
import { countData, countDataMonthly, sortDataByKey } from "../../utils/api";
import {
  registerables,
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

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
        type: "line",
        label: "월별 모임 횟수",
        backgroundColor: "#0063B2",
        data: playTimeCount.map((item) => item.value),
      },
    ],
  };

  return <Line type="line" data={dataSet} options={[]} />;
};

export default ActiveChart;
