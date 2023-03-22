import { UseBoundStore, StoreApi, create } from "zustand"
import { NotFound } from "../api/requestStatus"
import { auth } from "../config/firebase-config"
import { url } from "./tempURL"

export const getUserData: UseBoundStore<StoreApi<UserState>> = create((set, get: () => any) => ({
    userInfo: {},
    userPosts: [],
    updateUserInfo: async (userId: string) => {
        const res = await fetch(`${url}/api/users?userId=${userId}`)
        if (!res.ok) {
            const err = await res.json() as Error
            // Return err, not throw: helps figure out if valid user needs to be created in db
            return new Error(err.message, {cause: err.cause})
        } 
        const result = await res.json() as UserObj
        set({userInfo: result})

    },
    // Call this fn if valid user doesnt exist in the db
    createUserInfo: async (userId: string, userEmail: string) =>{
        const res = await fetch(`${url}/api/users?userId=${userId}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: userId,
                userEmail: userEmail,
                subscribedTo: []
            } as UserObj)
        })
        if (!res.ok) {
            const err = await res.json() as Error
            throw new Error(err.message, {cause: err.cause})
        }
        const result = await res.json() as UserObj
        console.log(result)
        set({userInfo: result})
    },
    updateUserPosts: async (userId: string) => {
        // Note to self: Be sure to check for typos: ( i.e. ? not / )
        const res = await fetch(`${url}/api/posts?userId=${userId}`)
        if (!res.ok){
            const err = await res.json() as Error
            if (res.status == 404) set({userPosts: []})
            throw err
        } else {
            const result = await res.json() as PostObj[]
            set({userPosts: [...get().userPosts, ...result]})
        }
    }
}))

