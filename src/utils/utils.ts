import { RangeEnum } from "../types";

export const makeRangeDate = (type: RangeEnum) => {
  const today = new Date();
  switch (type) {
    case RangeEnum.삼개월:
      return new Date(today.getFullYear(), today.getMonth() - 2, 0);
    case RangeEnum.육개월:
      return new Date(today.getFullYear(), today.getMonth() - 5, 0);
    case RangeEnum.일년:
      return new Date(today.getFullYear(), today.getMonth() - 11, 0);
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
    default:
      return "#AED6F1";
  }
};
