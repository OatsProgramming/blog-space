'use client'

import CommentsSection from './components/commenting/CommentSection'
import Gears from './components/Gears'
import SignInPageAnimation from './components/signIn/SignInPageAnimation'

export default function SignIn() {

  function handleClick() {
    console.log('hello')
  }

  function reset() {
    console.log('world')
  }

  const error = {
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean posuere dapibus orci, ac malesuada orci ullamcorper non. Phasellus mauris felis, varius non tempus id, vestibulum eget sem. In augue metus, blandit eget enim eu, ullamcorper interdum metus. Nunc in nunc eu mauris porta bibendum at tincidunt ligula. In a elit eu diam cursus pellentesque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis facilisis magna a est tincidunt laoreet. '
  }

  return (
    <div>
      {/* <SignInPageAnimation /> */}
    </div>
  )
}