import React, { Suspense } from 'react'
import UnfilteredPosts from './UnfilteredPosts'

export default function Explore({params: {userId}}: Params) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <UnfilteredPosts userId={userId}/>
      </Suspense>
    </div>
  )
}
