import {
  registerables,
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ThemeColor } from "../../../assets/constants";
import { gameDataStore } from "../../../store/gameDataStore";
import {
  countDataMonthly,
  sortDataByKey,
  checkZero,
  removeDuplicatedCourt,
} from "../../../utils/data";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  ...registerables
);

const CourtPlayerChart = () => {
  const { totalData } = gameDataStore();
  const filteredData = removeDuplicatedCourt(totalData);
  const countedDataMonthly = countDataMonthly(filteredData);
  const playTimeCount = sortDataByKey(checkZero(countedDataMonthly));

  const labels = playTimeCount.map((item) => item.key);
  const values = playTimeCount.map((item) => item.value);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataSet: any = {
    labels: labels,
    datasets: [
      {
        label: "월별 모임 횟수🎾",
        type: playTimeCount.length === 1 ? "bar" : "line",
        backgroundColor: ThemeColor,
        borderColor: "lightgray",
        data: values,
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

export default CourtPlayerChart;
