import {
  query,
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { fireStore } from "../Firebase";
import { GROUP } from "../constants";
import { MemberDoc } from "../types";

export const getMembers = async () => {
  const dbSnapShot = query(collection(fireStore, GROUP, "members", "members"));
  return await getDocs(dbSnapShot);
};

export const postMember = async (payload: MemberDoc) => {
  await setDoc(
    doc(fireStore, GROUP, "members", "members", payload.name),
    payload
  );
};

export const updateMember = async (
  memberName: string,
  target: string,
  value: string | number | boolean | null
) => {
  await updateDoc(doc(fireStore, GROUP, "members", "members", memberName), {
    [target]: value,
  });
};
