import {
  Auth,
  GoogleAuthProvider,
  User,
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import { create } from "zustand";
import { auth } from "../Firebase";
import { IMember } from "../types";

export interface IAuthStore {
  user: IMember | null;
  setUser: (data: IMember | null) => void;
  googleLoginInfo: User | null;
  setGoogleLoginInfo: (newUser: User | null) => void;
  autoLogin: (auth: Auth) => void;
  handleGoogleLogin: () => void;
  handleLogout: (auth: Auth) => void;
}

export const authStore = create<IAuthStore>((set) => ({
  user: null,
  setUser: (data: IMember | null) => set({ user: data }),
  googleLoginInfo: null,
  setGoogleLoginInfo: (newUser: User | null) =>
    set({ googleLoginInfo: newUser }),

  autoLogin: (auth) => {
    try {
      onAuthStateChanged(auth, (newUser) => {
        if (newUser) set({ googleLoginInfo: newUser });
        else set({ googleLoginInfo: null });
      });
    } catch {
      set({ googleLoginInfo: null });
    }
  },

  handleGoogleLogin: () => {
    const provider = new GoogleAuthProvider();
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return;
      })
      .catch((error) => {
        console.log(error.message);
      });
    signInWithPopup(auth, provider)
      .then((data) => {
        set({ googleLoginInfo: data.user });
      })
      .catch((error) => {
        console.log(error);
        set({ googleLoginInfo: null });
      });
  },

  handleLogout: (auth) => {
    auth.signOut();
    set({ user: null, googleLoginInfo: null });
  },
}));
