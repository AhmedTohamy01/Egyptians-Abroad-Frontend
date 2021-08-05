import { useState, useEffect } from 'react'
import axiosAPI from '../api/axiosAPI'

export default function getData() {
	const [userProfile, setUserProfile] = useState({})
	const [avatarURL, setAvatarURL] = useState(null)

  useEffect(() => {
		async function getUserProfile() {
			try {
        const user = await axiosAPI.user.getMyUserInfo()
        const avatar = user.data.avatar
          ? await axiosAPI.user.getUserAvatar(user.data._id)
          : null
        setUserProfile(user)
        setAvatarURL(avatar)
      } catch (e) {
        console.error(e)
      }
		}
    getUserProfile()
  }, [])

  return { userProfile, avatarURL }
}
