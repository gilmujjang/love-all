import { Line } from "react-chartjs-2";
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
        type: "bar",
        label: "참석횟수💗",
        backgroundColor: "#0063B2",
        data: playTimeCount.map((item) => item.value),
      },
    ],
  };

  return <Line type="bar" data={dataSet} options={{}} />;
};

export default PlayerChart;
