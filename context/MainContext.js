import { createContext, useState, useEffect } from 'react'

export const MainContext = createContext([{}, () => {}])

export const MainContextProvider = ({ children }) => {
  const [showMenuCard, setShowMenuCard] = useState(false)
  const [activeSignForm, setActiveSignForm] = useState('signup')
  const [activeGettingStarted, setActiveGettingStarted] = useState('basic-info')
  const [showProfileCard, setShowProfileCard] = useState(false)
	const [showAddCard, setShowAddCard] = useState(false)

  return (
    <MainContext.Provider
      value={{
        showMenuCard,
        setShowMenuCard,
        activeSignForm,
        setActiveSignForm,
        activeGettingStarted,
        setActiveGettingStarted,
        showProfileCard,
        setShowProfileCard,
        showAddCard,
        setShowAddCard,
      }}
    >
      {children}
    </MainContext.Provider>
  )
}
