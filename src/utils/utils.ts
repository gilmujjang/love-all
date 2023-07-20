import { RangeEnum } from "../types";

export const makeRangeDate = (type: RangeEnum) => {
  const today = new Date();
  switch (type) {
    case RangeEnum.일개월:
      return new Date(today.getFullYear(), today.getMonth() - 1, 1);
    case RangeEnum.삼개월:
      return new Date(today.getFullYear(), today.getMonth() - 3, 1);
    case RangeEnum.육개월:
      return new Date(today.getFullYear(), today.getMonth() - 6, 1);
    case RangeEnum.일년:
      return new Date(today.getFullYear(), today.getMonth() - 12, 1);
    case RangeEnum.전체:
      return undefined;
  }
};

export const makeCourtColor = (court: string) => {
  switch (court) {
    case "계남":
      return "#CD5C5C";
    case "럽랑":
      return "#F39C12";
    case "안양천":
      return "#17A589";
    case "강서구립":
      return "#5DADE2";
    case "신도림":
      return "#1E8449";
    case "서남물":
      return "#1A5276";
    case "목동":
      return "#BB8FCE";
    case "보라매":
      return "#6C3483";
    case "망원":
      return "#839192";
    case "장충":
      return "#BA4A00";
    case "한남":
      return "#EC7063";
    case "럽픈":
      return "#9e9764";
    case "공휴일은못참지":
      return "#F5D033";
    case "1주년":
      return "#DE4C8A";
    case "대방":
      return "#025669";
    case "양재시민의숲":
      return "#A2231D";
    case "포천":
      return "#6A5D4D";
    case "우장산":
      return "#E1CC4F";
    case "서울대":
      return "#1C542D";
    case "럽랑가로스":
      return "#D36E70";
    default:
      return "#AED6F1";
  }
};

export const makeWeekColor = (day: string) => {
  switch (day) {
    case "월":
      return "#F5C324";
    case "화":
      return "#CBB4F4";
    case "수":
      return "#33BB33";
    case "목":
      return "#FF8506";
    case "금":
      return "#0013F5";
    case "토":
      return "#7406FD";
    case "일":
    default:
      return "#FF2400";
  }
};

export const getRangeDisplayName = (range: RangeEnum) => {
  switch (range) {
    case RangeEnum.전체:
      return "전체";
    case RangeEnum.일개월:
      return "1개월";
    case RangeEnum.삼개월:
      return "3개월";
    case RangeEnum.육개월:
      return "6개월";
    case RangeEnum.일년:
      return "1년";
  }
};

export const getDuration = (num: number, start: string, end?: string) => {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();

  const duration = Math.floor(
    (endDate.getTime() - startDate.getTime()) / 60000
  );

  let text = "";
  let cnt = 0;
  const year = Math.floor(duration / 60 / 24 / 365);
  const month = Math.floor(duration / 60 / 24 / 30);
  const day = Math.floor(duration / 60 / 24);
  const hour = Math.floor(duration / 60);
  const minute = duration;

  if (year) {
    text += year + "년 ";
    cnt += 1;
  }
  if (month) {
    text += month - 12 * year + "개월 ";
    cnt += 1;
  }
  if (day && cnt < num) {
    text += day - 30 * month + "일 ";
    cnt += 1;
  }
  if (hour && cnt < num) {
    text += hour - 24 * day + "시간 ";
    cnt += 1;
  }
  if (minute && cnt < num) {
    text += `${minute - 60 * hour} 분 `;
    cnt += 1;
  }

  return text;
};

export const getAge = (start: string) => {
  const startDate = new Date(start);
  const endDate = new Date();

  const duration = Math.floor(
    (endDate.getTime() - startDate.getTime()) / 60000
  );
  return `${Math.floor(duration / 60 / 24 / 365)}`;
};

export const makeRandomString = (len: number) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let str = "";
  for (let i = 0; i < len; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
};
