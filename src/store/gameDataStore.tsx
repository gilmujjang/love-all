import { create } from "zustand";
import { OriginData, RangeEnum } from "../types";

interface ITargetType {
  targetType: "player" | "court" | null;
  targetName: string;
}

interface IGameDataStore {
  searchTarget: ITargetType;
  setSearchTarget: (data: ITargetType) => void;
  range: RangeEnum;
  setRange: (data: RangeEnum) => void;
  totalData: OriginData[];
  setTotalData: (datas: OriginData[]) => void;
  myGameData: OriginData[];
  setMyGameData: (datas: OriginData[]) => void;
  reservedData: OriginData[];
  setReservedData: (datas: OriginData[]) => void;
  rainyData: OriginData[];
  setRainyData: (datas: OriginData[]) => void;
  playerList: string[];
  setPlayerList: (datas: string[]) => void;
}

export const gameDataStore = create<IGameDataStore>((set) => ({
  searchTarget: { targetType: null, targetName: "" },
  setSearchTarget: (data: ITargetType) => set({ searchTarget: data }),
  range: RangeEnum.육개월,
  setRange: (data: RangeEnum) => set({ range: data }),
  totalData: [],
  setTotalData: (datas: OriginData[]) => set({ totalData: datas }),
  myGameData: [],
  setMyGameData: (datas: OriginData[]) => set({ myGameData: datas }),
  reservedData: [],
  setReservedData: (datas: OriginData[]) => set({ reservedData: datas }),
  rainyData: [],
  setRainyData: (datas: OriginData[]) => set({ rainyData: datas }),
  playerList: [],
  setPlayerList: (datas: string[]) => set({ playerList: datas }),
}));
