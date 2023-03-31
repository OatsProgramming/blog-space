import { db } from "@/app/config/firebase-config";
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "@firebase/firestore/lite";
import { badRequest, failedResponse, fetchFail, NotFound, responseSuccess } from "../requestStatus";

// export const config = {
//     runtime: 'edge',
// }

export async function GET(request: Request){
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    if (!userId) return failedResponse(new Error('User ID not given (api/subscription)'), badRequest)
    const userDocRef = doc(db, 'users', userId)
    try {
        const user = await getDoc(userDocRef)
        // If client error
        if (!user.exists()) throw new NotFound(`User ID: ${userId} does not exist`)
        const subscribedTo = user.data().subscribedTo
        return new Response(JSON.stringify(subscribedTo))
        
    } catch (err) {
        const error = err as Error
        // Client error
        if (error instanceof NotFound) return failedResponse(error, badRequest)
        // Server error
        return failedResponse(error, fetchFail)
    }
}

export async function PATCH(request: Request) {
    const user = await ValidateRequest(request)
    // On bad request
    if (user instanceof Error) return failedResponse(user, badRequest)
    
    try {
        const userDocRef = doc(db, 'users', user.id)
        if (user.PATCHMethod === 'add'){
            await updateDoc(userDocRef, {
                subscribedTo: arrayUnion(user.otherUserId)
            })
        // Did === 'delete' for extra safety measure instead of just 'else'
        } else if (user.PATCHMethod === 'delete'){
            await updateDoc(userDocRef, {
                subscribedTo: arrayRemove(user.otherUserId)
            })
        }
    } catch (err) {
        const error = err as Error
        return failedResponse(error, fetchFail)
    }
    return new Response(JSON.stringify(user), responseSuccess)
}

async function ValidateRequest(request: Request){
    let user: UserReqObj;
    try{
        user = await request.json()
        if (!user.id || !user.PATCHMethod || !user.otherUserId){
            throw new Error(`\nInvalid 'subscription' request body:
            id?             ${user.id ? 'OK' : 'MISSING'}
            otherUserId?    ${user.otherUserId ? 'OK' : 'MISSING'}
            PATCHMethod?    ${user.PATCHMethod ? 'OK' : 'MISSING'}
            `)
        } else if ((user.PATCHMethod !== 'add') && (user.PATCHMethod !== 'delete')) {
            throw new Error(`\nInvalid 'subscription' request body:
            Available PATCHMethods: 'add' || 'delete''
            Given PATCHMethod:    ${user.PATCHMethod}
            `)
        }
    } catch (err) {
        return err as Error
    }
    return user
}