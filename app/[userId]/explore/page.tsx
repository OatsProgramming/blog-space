import ShowPosts from '@/app/lib/components/userId/ShowPosts'
import React, { Suspense } from 'react'

export default function Explore({params: {userId}}: Params) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ShowPosts category='explore' userId={userId}/>
      </Suspense>
    </div>
  )
}
