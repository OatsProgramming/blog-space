import { db } from "@/app/config/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { badRequest, failedResponse, fetchFail, responseSuccess } from "../requestStatus";

const collectionRef = collection(db, 'posts')

export async function GET(request: Request){
    // Extract userId query to make sure to get all posts but current user
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    if (!userId) return failedResponse(new Error('User ID not given'), badRequest)
    const q = query(collectionRef, where('userId', '!=', userId))
    let documentData;
    try {
        documentData = await getDocs(q)
    } catch (err) {
        const error = err as Error
        return failedResponse(error, fetchFail)
    }

    const allPosts = documentData.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    })) as PostObj[]

    console.log(allPosts)

    return new Response(JSON.stringify(allPosts), responseSuccess)
}