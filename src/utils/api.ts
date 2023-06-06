import originData from "../assets/data/data.json";
import { DataFilter, OriginData, DataEnum } from "../types";

const getData = ({
  startDate,
  endDate,
  name,
  court,
  reservation,
  cancel = false,
  rainy = false,
  day,
}: DataFilter) => {
  const { data } = originData;

  const filteredData = data.filter((item: OriginData) => {
    const { 날짜, 요일, 장소, 이름, 예약자, 코트취소여부 } = item;
    const playDate = new Date(날짜);
    if (startDate && playDate < startDate) return null;
    if (endDate && playDate > endDate) return null;
    if (name && name !== 이름) return null;
    if (cancel && !코트취소여부) return null;
    if (rainy && !(코트취소여부 === "우취" || 코트취소여부 === "우천취소"))
      return null;
    if (court && 장소 !== court) return null;
    if (reservation && 예약자 !== reservation) return null;
    if (day && day !== 요일) return null;
    return true;
  });

  return filteredData;
};

const countData = (data: OriginData[], target: DataEnum) => {
  const temp: { [key: string]: number } = {};
  data.map((item) => {
    const targetData = item[target];
    if (targetData) {
      if (temp[targetData]) {
        temp[targetData] += 1;
      } else {
        temp[targetData] = 1;
      }
    }
    return null;
  });
  const sortedArray = Object.entries(temp)
    .sort((a, b) => b[1] - a[1])
    .map(([key, value]) => ({ key, value }));
  return sortedArray;
};

export { getData, countData };
