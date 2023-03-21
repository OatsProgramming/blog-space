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
        // Error handling if any missing info
        if (!get().createInfo.email && !get().createInfo.password) return new Error(`Please enter your email and password`)
        else if (!get().createInfo.email) return new Error('Seems that you forgot to add your email...')
        else if (!get().createInfo.password) return new Error('Seems that you forgot to enter a password...')
        // Send request if successful
        await createUserWithEmailAndPassword(auth, get().createInfo.email, get().createInfo.password );
        set({ signedIn: true, createAccount: false });
    },
    signIn: async () => {
        // Error handling if any missing info
        if (!get().signInInfo.email && !get().signInInfo.password) return new Error(`Please enter your email and password`)
        else if (!get().signInInfo.email) return new Error('Seems that you forgot to add your email...')
        else if (!get().signInInfo.password) return new Error('Seems that you forgot to enter your password...')   
        // Send request if successful     
        await signInWithEmailAndPassword(auth, get().signInInfo.email, get().signInInfo.password);
        set({ signedIn: true });
    },
    signInPop: async () => {
        const result = await signInWithPopup(auth, googleProvider);
        if (result instanceof Error) return result
        set({ signedIn: true });
    },
    logOut: async () => {
        await signOut(auth);
        set({ signedIn: false });
    },
}))
