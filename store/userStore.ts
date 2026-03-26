import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role = "USER" | "ADMIN" | "MANAGER";

export interface IUser {
  name: string;
  email: string;
  role: Role;
}

interface UserState {
  user: IUser | null;
  setUser: (user: IUser | null) => void; // null এলাউ করলাম ক্লিয়ার করার জন্য
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => {
        set({ user: null });
        localStorage.removeItem("user-storage");
      },
    }),
    {
      name: "user-storage", // নিশ্চিত করুন এই নামটাই সব জায়গায় আছে
    },
  ),
);
