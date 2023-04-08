'use client'
import StaticModal from './components/modal/StaticModal'
import SignInPageAnimation from './components/signIn/SignInPageAnimation'
import { explorePosts } from '@/toyData/postData'
import { userId } from '@/toyData/userData'

export default function SignIn() {

  return (
    <div>
      <SignInPageAnimation />
      {/* <StaticModal posts={explorePosts} userId={userId} changePost={function (index: number): void {
        console.log('hello')
      } } /> */}
    </div>
  )
}
