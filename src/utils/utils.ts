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

export const checkEnter = (e: string) => {
  if (e === "Enter") {
    return true;
  } else {
    return false;
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
