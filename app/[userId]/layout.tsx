import Link from "next/link";
import ValidUser from "../lib/components/ValidUser";

export async function generateMetadata({params : {userId}} : Params){
    // Temporary: fetch the proper data when possible
    return ({
       title:  userId
    })
}

export default function NaviBar({
    children,
    params : { userId }
  }: {
    children: React.ReactNode,
    params: {
        userId: string
    }
  }) {
    
    return (
        <>
            <Link href={`/${userId}/main`}>Main</Link>
            <Link href={`/${userId}/following`}>Following</Link>
            <Link href={`/${userId}/explore`}>Explore</Link>
            {children}
            <ValidUser userId={userId} />
        </>
    );
  }
