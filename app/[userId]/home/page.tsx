import { Suspense } from "react";
import SubscribedPosts from "./SubscribedPosts";

export default async function Following({params: { userId }}: Params) {

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SubscribedPosts userId={userId} />
      </Suspense>
    </div>

  )
}
