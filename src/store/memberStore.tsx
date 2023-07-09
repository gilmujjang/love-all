import { create } from "zustand";

export interface IMember {
  uid: string;
  name: string;
  isManager: boolean;
  isAdmin: boolean;
}

export interface IMemberStore {
  members: IMember[];
  setMembers: (memberList: IMember[]) => void;
}

export const memberStore = create<IMemberStore>((set) => ({
  members: [],
  setMembers: (memberList: IMember[]) => set({ members: memberList }),
}));
