import CRUDButtons from "./CRUDButtons";
import { Metadata } from "next";

export async function generateMetadata({ params: {userEmail} }: {params: {userEmail: string}}): Promise<Metadata> {
    return { 
        title: userEmail,
        description: 'User page'
    }
}



// Not sure why but for some reason I can't verify if a user is logged in.
// For now, useEffect at Auth Component to verify
export default function UserPage({params: {userEmail}} : {params : {userEmail: string}}){
    return (
        <>
            <div>User: {userEmail}</div>
            <CRUDButtons />
        </>
    )
}