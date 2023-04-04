'use client'

import LoadingCircle from './components/loading/LoadingCircle'
import LoadingSquare from './components/loading/LoadingSquare'
import SignInPageAnimation from './components/signIn/SignInPageAnimation'
import StaticModal from './components/modal/StaticModal'
import { userId } from '@/toyData/userData'
import { explorePosts } from '@/toyData/postData'
import Slider from './components/posting/Slider'

export default function SignIn() {

  return (
    <div>
      {/* <StaticModal userId={'userId'} posts={explorePosts} changePost={function (index: number): void {
        console.log('hello')
      } }/> */}
      <SignInPageAnimation />
      {/* <Slider posts={explorePosts} userId={userId} /> */}
    </div>
  )
}