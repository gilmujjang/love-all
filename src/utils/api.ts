import { query, collection, getDocs, setDoc, doc } from "firebase/firestore";
import { fireStore } from "../Firebase";
import { GROUP } from "../constants";
import { MemberDoc } from "../types";
import { makeRandomString } from "./utils";

export const getMembers = async () => {
  const dbSnapShot = query(collection(fireStore, GROUP, "members", "members"));
  return await getDocs(dbSnapShot);
};

export const postMember = async (payload: MemberDoc) => {
  const randomId = makeRandomString(28);
  await setDoc(doc(fireStore, GROUP, "members", "members", randomId), payload);
};
