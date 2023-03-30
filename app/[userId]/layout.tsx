import Link from "next/link";
import ValidUser from "../components/signIn/ValidUser";
import { url } from "../lib/tempURL";
import AddPost from "../components/posting/AddPost";
import RefreshPage from "../components/RefreshPage";

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
      <RefreshPage userId={userId}>
      <nav>
        <Link href={`/${userId}/user`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
          </svg>
        </Link>
        <Link href={`/${userId}/home`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z" />
            <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z" />
          </svg>
        </Link>
        <Link href={`/${userId}/explore`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
            <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
            <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
          </svg>
        </Link>
      </nav>
      <AddPost>
        {children}
      </AddPost>
      <ValidUser userId={userId} />
      </RefreshPage>
    </>
  );
}
