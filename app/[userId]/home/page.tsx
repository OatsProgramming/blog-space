import { Suspense } from "react";
import ShowPosts from "@/app/lib/components/userId/ShowPosts";

export default async function Following({ params: { userId } }: Params) {

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ShowPosts category='explore' userId={userId} />
      </Suspense>
    </div>

  )
}
