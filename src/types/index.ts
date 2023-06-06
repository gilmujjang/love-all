export interface OriginData {
  번호: string;
  날짜: string;
  년: string;
  월: string;
  일: string;
  요일: string;
  장소: string;
  시작시간: string;
  종료시간: string;
  운동시간: string;
  이름: string;
  예약자: string | null;
  당일취소: string | null;
  코트취소여부: string | null;
  비고: string | null;
  게스트: string | null;
}

export interface DataFilter {
  startDate?: Date;
  endDate?: Date;
  name?: string;
  court?: string;
  day?: string;
  reservation?: string;
  cancel?: boolean;
  rainy?: boolean;
  year?: string;
  month?: string;
}

export enum DataEnum {
  번호 = "번호",
  날짜 = "날짜",
  년 = "년",
  월 = "월",
  일 = "일",
  요일 = "요일",
  장소 = "장소",
  시작시간 = "시작시간",
  종료시간 = "종료시간",
  운동시간 = "운동시간",
  이름 = "이름",
  예약자 = "예약자",
  당일취소 = "당일취소",
  코트취소여부 = "코트취소여부",
  비고 = "비고",
  게스트 = "게스트",
}

export enum RangeEnum {
  삼개월 = "3month",
  육개월 = "6month",
  일년 = "1year",
  전체 = "all",
}
