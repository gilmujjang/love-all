import { create } from "zustand";
import { IMember } from "../types";

export interface IMemberStore {
  members: IMember[];
  setMembers: (memberList: IMember[]) => void;
}

export const memberStore = create<IMemberStore>((set) => ({
  user: null,
  members: [],
  setMembers: (memberList: IMember[]) => set({ members: memberList }),
}));
