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

const ReserveChart = ({ data }: Props) => {
  const playTimeCount = sortDataByValue(countData(data, DataEnum.예약자)).slice(
    0,
    15
  );

  const dataSet = {
    labels: playTimeCount.map((item) => item.key),
    datasets: [
      {
        type: "bar",
        label: "예약횟수💗",
        backgroundColor: "#85C1E9",
        data: playTimeCount.map((item) => item.value),
        datalabels: {
          labels: {
            title: null,
          },
        },
      },
    ],
  };

  return <Line data={dataSet} options={{}} />;
};

export default ReserveChart;
