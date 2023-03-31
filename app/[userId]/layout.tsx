import Link from "next/link";
import ValidUser from "../components/signIn/ValidUser";
import { url } from "../lib/tempURL";
import AddPost from "../components/posting/AddPost";
import RefreshPage from "../components/RefreshPage";
import { BiUserCircle } from 'react-icons/bi'
import { AiFillHome } from 'react-icons/ai'
import { FaRegCompass } from 'react-icons/fa'

export async function generateMetadata({ params: { userId } }: Params) {
  const res = await fetch(`${url}/api/users?userId=${userId}`)
  if (!res.ok) {
    console.log(res)
  }
  const user = await res.json() as UserObj
  return ({
    title: `${user.userEmail}'s Page`,
    description: `Insert something here`
  })
}

export default async function NaviBar({
  children,
  params: { userId }
}: {
  children: React.ReactNode,
  params: {
    userId: string
  }
}) {

  return (
    <>
      <nav>
        <Link href={`/${userId}/explore`} className="navBarItem">
          <FaRegCompass className="icon" />
        </Link>
        <Link href={`/${userId}/home`} className="navBarItem">
          <AiFillHome className="icon" />
        </Link>
        <AddPost />
        <Link href={`/${userId}/user`} className="navBarItem">
          <BiUserCircle className="icon" />
        </Link>
        <RefreshPage />
      </nav>
        {children}
      <ValidUser userId={userId} />
    </>
  );
}
