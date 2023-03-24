import { Suspense } from "react";
import SubscribedPosts from "./SubscribedPosts";

export default async function Following() {

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SubscribedPosts />
      </Suspense>
    </div>

  )
}
