import { create, StoreApi, UseBoundStore } from 'zustand'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import { auth, googleProvider } from "../../config/firebase-config"

// Global state manager
export const useAuth: UseBoundStore<StoreApi<AuthState>> = create((set, get: () => any) => ({
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
        try {
            await createUserWithEmailAndPassword(auth, get().createInfo.email, get().createInfo.password)
            await updateProfile(auth.currentUser!, { displayName: get().createInfo.userName })
            set({ signInInfo: get().createInfo, createInfo: {} as UserInfo })
            // The SDK doesn't automatically sign in users; get().signIn()
            get().signIn()
        } catch (err) {
            const error = err as Error
            if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
                return new Error(`${get().createInfo.email} is already registered. Please sign in instead.`)
            }
            return new Error('It seems there was issue with creating an account. Please try again later.', {cause: error.cause})

        }
    },
    signIn: async () => {
        // Error handling if any missing info
        if (!get().signInInfo.email && !get().signInInfo.password) return new Error(`Please enter your email and password`)
        else if (!get().signInInfo.email) return new Error('Seems that you forgot to add your email...')
        else if (!get().signInInfo.password) return new Error('Seems that you forgot to enter your password...')   
        // Send request if successful     
        try {
            await signInWithEmailAndPassword(auth, get().signInInfo.email, get().signInInfo.password);
            set({ signedIn: true, createAccount: false, signInInfo: {} as UserInfo });
        } catch (err) {
            const error = err as Error 
            return new Error('Incorrect email / password', {cause: error.cause})
        }
    },
    signInPop: async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            set({ signedIn: true });
        } catch (err) {
            const error = err as Error
            return new Error('Failed to sign in', {cause: error.cause})
        }
    },
    logOut: async () => {
        try {
            await signOut(auth);
            set({ signedIn: false });
        } catch (err) {
            const error = err as Error
            return new Error('Failed to log out', {cause: error.cause})
        }
    },
}))
