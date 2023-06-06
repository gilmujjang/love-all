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
  plugins,
} from "chart.js";
import { makeCourtColor } from "../../utils/utils";

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

const MAX = 8;

const CourtChart = ({ data }: Props) => {
  const countedData = sortDataByValue(countData(data, DataEnum.장소));
  const courtCount = countedData.splice(0, MAX);
  const etcCount = countedData
    .splice(MAX, countedData.length - 1)
    .reduce((sum, a) => sum + a.value, 0);

  const dataSet = {
    labels: [...courtCount.map((item) => item.key), "기타"],
    datasets: [
      {
        label: "코트장 비율",
        backgroundColor: [
          ...courtCount.map((item) => makeCourtColor(item.key)),
          makeCourtColor("기타"),
        ],
        data: [...courtCount.map((item) => item.value), etcCount],
      },
    ],
  };

  return <Doughnut data={dataSet} options={{}} />;
};

export default CourtChart;
