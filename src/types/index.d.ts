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
