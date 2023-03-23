import { db } from "@/app/config/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { failedResponse, fetchFail, responseSuccess } from "../requestStatus";

const collectionRef = collection(db, 'posts')

export async function GET(){
    let documentData;
    try {
        documentData = await getDocs(collectionRef)
    } catch (err) {
        const error = err as Error
        return failedResponse(error, fetchFail)
    }

    const allPosts = documentData.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))

    return new Response(JSON.stringify(allPosts), responseSuccess)
}