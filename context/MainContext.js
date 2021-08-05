import { createContext, useState, useEffect } from 'react'
import getData from '../custom-hook/getData'

export const MainContext = createContext([{}, () => {}])

export const MainContextProvider = ({ children }) => {
  const { userProfile, avatarURL } = getData()
  const [showMenuCard, setShowMenuCard] = useState(false)
  const [showProfileCard, setShowProfileCard] = useState(false)
  const [avatarLink, setAvatarLink] = useState(null)
  
	useEffect(() => {
		setAvatarLink(avatarURL)
	})

  return (
    <MainContext.Provider
      value={{
        showMenuCard,
        setShowMenuCard,
        showProfileCard,
        setShowProfileCard,
        userProfile,
        avatarLink,
        setAvatarLink,
      }}
    >
      {children}
    </MainContext.Provider>
  )
}
