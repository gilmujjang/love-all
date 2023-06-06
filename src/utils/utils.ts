import { RangeEnum } from "../types";

export const makeRangeDate = (type: RangeEnum) => {
  const today = new Date();
  switch (type) {
    case RangeEnum.육개월:
      return new Date(today.getFullYear(), today.getMonth() - 5, 0);
    case RangeEnum.일년:
      return new Date(today.getFullYear(), today.getMonth() - 11, 0);
    case RangeEnum.전체:
      return undefined;
  }
};
