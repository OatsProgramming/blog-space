'use client'

import CommentsSection from './components/commenting/CommentSection'
import SignInPageAnimation from './components/signIn/SignInPageAnimation'

export default function SignIn() {

  return (
    <div>
      {/* <SignInPageAnimation /> */}
      <CommentsSection postId='123'/>
    </div>
  )
}