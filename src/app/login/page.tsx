import React from 'react'
import Auth from '../components/Auth'



const login = () => {
  return (
    <div>
      {/* <SignIn routing='hash' forceRedirectUrl={'/dashboard/${user}'}/> */}
      <Auth/>
    </div>
  )
}

export default login
