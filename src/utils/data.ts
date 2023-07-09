import originData from "/src/assets/data/data.json";
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

  const filteredData: OriginData[] = data.filter((item: OriginData) => {
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

const getMyGameData = ({
  data,
  myPlayData,
}: {
  data: OriginData[];
  myPlayData: OriginData[];
}) => {
  let myCnt = 0;
  let myToggle = false;
  const myGameData = data.filter((item) => {
    const target = myPlayData[myCnt];
    if (
      item?.년 === target?.년 &&
      item?.월 === target?.월 &&
      item?.일 === target?.일 &&
      item?.시작시간 === target?.시작시간 &&
      item?.종료시간 === target?.종료시간
    ) {
      myToggle = true;
      return true;
    } else {
      if (myToggle) {
        myCnt += 1;
        myToggle = false;
      }
      return false;
    }
  });

  return myGameData;
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

const countPlayTimeData = (data: OriginData[], target: DataEnum) => {
  const temp: { [key: string]: number } = {};
  data.map((item) => {
    const targetData = item[target];
    if (targetData) {
      if (temp[targetData]) {
        temp[targetData] += Number(item.운동시간);
      } else {
        temp[targetData] = Number(item.운동시간);
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

const checkZero = (data: { [key: string]: number }) => {
  const keys = Object.keys(data);
  let tempYear = 0;
  let tempMonth = 0;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i].split(".");
    const keyYear = Number(key[0]);
    const keyMonth = Number(key[1]);
    if (tempMonth !== 0) {
      if (tempMonth === 12) {
        if (keyMonth !== 1) {
          data[tempYear + 1 + ".01"] = 0;
        }
      } else {
        if (tempMonth + 1 !== keyMonth) {
          data[
            tempYear +
              "." +
              (tempMonth > 9 ? tempMonth + 1 : "0" + (tempMonth + 1))
          ] = 0;
        }
      }
    }
    tempYear = keyYear;
    tempMonth = keyMonth;
  }
  return data;
};

const compareZero = (
  data: { [key: string]: number },
  compareData: { [key: string]: number }
) => {
  const compareKeys = Object.keys(compareData);
  compareKeys.map((key) => {
    if (!data[key]) data[key] = 0;
    return;
  });
  return data;
};

const sortDataByValue = (data: { [key: string]: number }) => {
  const sortedArray = Object.entries(data)
    .sort((a, b) => b[1] - a[1])
    .map(([key, value]) => ({ key, value }));
  return sortedArray;
};

const sortDataByKey = (data: { [key: string]: number }) => {
  const sortedArray = Object.entries(data)
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(([key, value]) => ({ key, value }));
  return sortedArray;
};

export {
  getData,
  getMyGameData,
  countData,
  countPlayTimeData,
  countDataMonthly,
  checkZero,
  compareZero,
  sortDataByValue,
  sortDataByKey,
};
