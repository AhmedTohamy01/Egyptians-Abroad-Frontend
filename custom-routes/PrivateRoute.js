import React, { useState, useEffect } from 'react'
import router from 'next/router'

/*---> Component <---*/
export default function PrivateRoute({ children }) {
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('EgAbroadToken')
    if (token) {
      setUserLoggedIn(true)
    } else {
      router.replace('/')
    }
  }, [])

  return <>{userLoggedIn ? children : null}</>
}


