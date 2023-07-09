import { Line } from "react-chartjs-2";
import { OriginData } from "../../types";
import {
  checkZero,
  compareZero,
  countDataMonthly,
  sortDataByKey,
} from "../../utils/data";
import {
  registerables,
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";
import { SkyBlue, ThemeColor } from "../../assets/constants";

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
  reservedData: OriginData[];
  name: string;
}

const ActiveChart = ({ data, reservedData, name }: Props) => {
  const countedDataMonthly = countDataMonthly(data);
  const playTimeCount = sortDataByKey(checkZero(countedDataMonthly));

  const reservedCount = sortDataByKey(
    compareZero(countDataMonthly(reservedData), countedDataMonthly)
  );

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

  if (name)
    dataSet.datasets.push({
      type: "bar",
      label: "예약횟수👍",
      backgroundColor: SkyBlue,
      barThickness: 32,
      opacity: 0.5,
      data: reservedCount.map((item) => item.value),
      datalabels: {
        labels: {
          title: null,
        },
      },
    });

  return <Line data={dataSet} />;
};

export default ActiveChart;
