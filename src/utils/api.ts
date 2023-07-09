import { query, collection, getDocs } from "firebase/firestore";
import { fireStore } from "../Firebase";
import { GROUP } from "../constants";

export const getMembers = async () => {
  const dbSnapShot = query(collection(fireStore, GROUP, "members", "members"));
  return await getDocs(dbSnapShot);
};
