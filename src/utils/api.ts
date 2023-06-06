import originData from "../assets/data/data.json";
import { DataFilter, OriginData, DataEnum } from "../types";

const getData = ({
  startDate,
  endDate,
  name,
  court,
  reservation,
  //  cancel or rainy 둘중 하나가 true면 해당 내용만 출력
  // 둘다 false면 cancel된 코트는 제외
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
    if (!cancel && !rainy && 코트취소여부) return null;
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
  return temp;
};

const countDataMonthly = (data: OriginData[]) => {
  const temp: { [key: string]: number } = {};
  data.map((item) => {
    const targetData: string =
      item[DataEnum.년] +
      "." +
      (Number(item[DataEnum.월]) < 10 ? "0" : "") +
      item[DataEnum.월];
    if (targetData) {
      if (temp[targetData]) {
        temp[targetData] += 1;
      } else {
        temp[targetData] = 1;
      }
    }
    return null;
  });
  return temp;
};

const sortDataByValue = (data: { [key: string]: number }) => {
  const sortedArray = Object.entries(data)
    .sort((a, b) => b[1] - a[1])
    .map(([key, value]) => ({ key, value }));
  return sortedArray;
};

const sortDataByKey = (data: { [key: string]: number }) => {
  const sortedArray = Object.entries(data)
    .sort((a, b) => a[0] - b[0])
    .map(([key, value]) => ({ key, value }));
  return sortedArray;
};

export { getData, countData, countDataMonthly, sortDataByValue, sortDataByKey };
