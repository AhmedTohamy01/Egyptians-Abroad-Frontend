import { createContext, useState, useEffect } from 'react'
import getData from '../custom-hook/getData'

export const MainContext = createContext([{}, () => {}])

export const MainContextProvider = ({ children }) => {
	const { userProfile, avatarLink } = getData()
  const [showMenuCard, setShowMenuCard] = useState(false)
  const [showProfileCard, setShowProfileCard] = useState(false)

  return (
    <MainContext.Provider
      value={{
        showMenuCard,
        setShowMenuCard,
        showProfileCard,
        setShowProfileCard,
        userProfile,
        avatarLink,
      }}
    >
      {children}
    </MainContext.Provider>
  )
}
