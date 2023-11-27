import { create } from "zustand";

type UserState = {
    isLogged: boolean;
    username: string;
    profilePicture: string;
    login: (username: string, profilePicture: string) => void;
    logout: () => void;
};

const useUserStore = create<UserState>((set) => ({
    isLogged: false,
    username: "",
    profilePicture: "",
    login: (username, profilePicture) =>
        set({ isLogged: true, username, profilePicture }),
    logout: () => set({ isLogged: false, username: "", profilePicture: "" }),
}));

export default useUserStore;
