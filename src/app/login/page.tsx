import React from 'react'
import Auth from '../components/Auth'
import LoginForm from '../components/Login'



const login = () => {
  return (
    <div className='pt-4 pb-4'>
      {/* <SignIn routing='hash' forceRedirectUrl={'/dashboard/${user}'}/> */}
      <LoginForm/>
      
    </div>
  )
}

export default login
