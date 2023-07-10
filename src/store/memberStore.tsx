import { create } from "zustand";

export interface IMember {
  uid: string;
  name: string;
  gender: string;
  isManager: boolean;
  isAdmin: boolean;
  joinDate: string;
  birthDay: string;
  createdDate: string;
  editedDate?: string;
  leaveDate?: string;
}

export interface IMemberStore {
  members: IMember[];
  setMembers: (memberList: IMember[]) => void;
}

export const memberStore = create<IMemberStore>((set) => ({
  members: [],
  setMembers: (memberList: IMember[]) => set({ members: memberList }),
}));
