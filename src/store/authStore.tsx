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

export interface IAuthStore {
  isManager: boolean;
  setIsManager: (value: boolean) => void;
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  user: User | null;
  setUser: (newUser: User | null) => void;
  autoLogin: (auth: Auth) => void;
  handleGoogleLogin: () => void;
  handleLogout: (auth: Auth) => void;
}

export const authStore = create<IAuthStore>((set) => ({
  isManager: false,
  setIsManager: (value: boolean) => set({ isManager: value }),
  isAdmin: false,
  setIsAdmin: (value: boolean) => set({ isAdmin: value }),
  user: null,
  setUser: (newUser: User | null) => set({ user: newUser }),

  autoLogin: (auth) => {
    try {
      onAuthStateChanged(auth, (newUser) => {
        if (newUser) set({ user: newUser });
        else set({ user: null });
      });
    } catch {
      set({ user: null });
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
        set({ user: data.user });
      })
      .catch((error) => {
        console.log(error);
        set({ user: null });
      });
  },

  handleLogout: (auth) => {
    auth.signOut();
  },
}));
