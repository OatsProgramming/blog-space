import { create, StoreApi, UseBoundStore } from 'zustand'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { auth, googleProvider } from "../config/firebase-config"

// Practically a context provider
export const useAuth: UseBoundStore<StoreApi<useAuthMethodsObj>> = create((set, get: () => any) => ({
    createAccount: false,
    signedIn: false,
    createInfo: {} as UserInfo,
    signInInfo: {} as UserInfo,
    registerAccount: async () => {
        await createUserWithEmailAndPassword(auth, get().createInfo.email, get().createInfo.password );
        set({ signedIn: true, createAccount: false });
    },
    signIn: async () => {
        await signInWithEmailAndPassword(auth, get().signInInfo.email, get().signInInfo.password);
        set({ signedIn: true });
    },
    signInPop: async () => {
        await signInWithPopup(auth, googleProvider);
        set({ signedIn: true });
    },
    logOut: async () => {
        await signOut(auth);
        set({ signedIn: false });
    },
}))
