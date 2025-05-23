import React from 'react'
import Auth from '../components/Auth'
import { SignIn } from '@clerk/nextjs'


const login = () => {
  return (
    <div>
      <SignIn routing='hash' forceRedirectUrl={'/dashboard/${user}'}/>
    </div>
  )
}

export default login
