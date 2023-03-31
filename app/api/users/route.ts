import { db } from "@/app/config/firebase-config";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "@firebase/firestore/lite";
import { badRequest, fetchFail, responseSuccess, failedResponse, NotFound, notFoundRequest, creationSuccess } from "../requestStatus";

// export const config = {
//     runtime: 'edge',
// }

export async function GET(request: Request){
    // Parse the query
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    // On bad request
    if (!userId) return failedResponse(new Error('User ID not given'), badRequest)
    let documentData;
    try {
        const userDocRef = doc(db, 'users', userId!)
        // Get specified user
        documentData = await getDoc(userDocRef)
        if (!documentData.exists()) throw new NotFound('User not found')
    } catch (err) {
        const error = err as Error
        // On client error
        if (error instanceof NotFound) return failedResponse(error, badRequest)
        // On network error
        return failedResponse(error, fetchFail)
    }
    const user = {
        ...documentData.data(),
        id: documentData.id
    } as UserObj
    
    if (!user.userEmail || !user.subscribedTo) return new Response(JSON.stringify({message: "User not found"}), notFoundRequest)
    return new Response(JSON.stringify(user), responseSuccess)
}

// On POST, we're creating a new user
// This would have a subscription list and
// Said user's email ( when listing out posts, use this instead of userId for human readability )
export async function POST(request: Request){
    const user = await ValidateRequest(request, 'POST')
    // On bad request
    if (user instanceof Error) return failedResponse(user, badRequest)
    
    // Add the document in the database
    // Using 'set' not 'add': avoid duplication just in case
    try {
        const userDocRef = doc(db, 'users', user.id)
        await setDoc(userDocRef, {
            subscribedTo: user.subscribedTo,
            userEmail: user.userEmail
        })
    } catch (err: unknown) {
        // On network error
        const error = err as Error
        return failedResponse(error, fetchFail)
    }
    return new Response(JSON.stringify(user), creationSuccess)
}

// On PATCH, determine what to update: subscription list or userEmail
// if subscription list, request must have userId and otherUserId (check api/subscriptions)
// if userEmail, request must userId and userEmail
export async function PATCH(request: Request){
    const user = await ValidateRequest(request, 'PATCH')
    // On bad request
    if (user instanceof Error) return failedResponse(user, badRequest)

    try {
        const userDocRef = doc(db, 'users', user.id)
        await updateDoc(userDocRef, {
            userEmail: user.userEmail
        })
    } catch (err) {
        // On network error
        const error = err as Error
        return failedResponse(error, fetchFail)
    }
    return new Response(JSON.stringify(user), responseSuccess) 
}

export async function DELETE(request: Request){
    const user = await ValidateRequest(request, 'DELETE')
    // On bad request
    if (user instanceof Error) return failedResponse(user, badRequest)

    try {
        const userDocRef = doc(db, 'users', user.id)    
        await deleteDoc(userDocRef)
    } catch (err) {
        // On network error
        const error = err as Error
        return failedResponse(error, fetchFail)
    }
    return new Response(JSON.stringify(user), responseSuccess)
}

async function ValidateRequest(req: Request, HTTP: HTTP){

    let user: UserReqObj;
    try {
        user = await req.json()
        // Check if any required properties are missing
        switch (HTTP) {
            case 'POST': {
                if (!user.id || !user.subscribedTo || !user.userEmail){
                    throw new Error(`\nInvalid 'user' request body:
                        id?             ${user.id ? 'OK' : 'MISSING'}
                        subscribedTo?   ${user.subscribedTo ? 'OK' : 'MISSING'}
                        userEmail?      ${user.userEmail ? 'OK' : 'MISSING'}
                    `)
                }
                break;
            }
            case 'PATCH': {
                if (!user.id || !user.userEmail){
                    throw new Error(`\nInvalid 'user' request body:
                        id?             ${user.id ? 'OK' : 'MISSING'}
                        userEmail?      ${user.userEmail ? 'OK' : 'MISSING'}
                    `)
                }
                break;
            }
            case 'DELETE': {
                if (!user.id) {
                    throw new Error(`\nInvalid 'user' request body:
                        id?             ${user.id ? 'OK' : 'MISSING'}
                    `)
                }
                break;
            }
            default: {
                throw new Error('Unknown HTTP Method') 
            }
        }
    } catch (err: unknown) {
        // Will return if any missing properties
        return err as Error
    }
    return user
}