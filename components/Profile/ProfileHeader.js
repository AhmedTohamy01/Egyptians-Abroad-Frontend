import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import axiosAPI from '../../api/axiosAPI'

/*---> Component <---*/
export default function ProfileHeader() {
  const [avatarLink, setAvatarLink] = useState(null)
  const [error, setError] = useState(null)
  const [userData, setUserData] = useState(null)

  useEffect(async () => {
    try {
      const user = await axiosAPI.user.getUserInfo()
      const avatar = user.data.avatar
        ? await axiosAPI.user.getUserAvatar(user.data._id)
        : null
      setUserData(user)
      if (user.avatar) {
        setAvatarLink(avatar)
      }
    } catch (e) {
      setError(e)
    }
  }, [])

  return (
    <ProfileHeaderWrapper>
      <AvatarWrapper>
        <AvatarImage src={avatarLink || 'images/avatar.png'} alt='avatar big' />
      </AvatarWrapper>
      <ProfileName>{userData?.data.name}</ProfileName>
      <ProfileBio>{userData?.data.bio}</ProfileBio>
      <CountryCity>
        {userData?.data.city}, {userData?.data.country}
      </CountryCity>
    </ProfileHeaderWrapper>
  )
}

/*---> Styles <---*/
export const ProfileHeaderWrapper = styled.div`
  /* border: solid red; */
  max-width: 460px;
  margin: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
`

export const AvatarWrapper = styled.div`
  /* border: 1px solid red; */
  text-align: center;
`

export const AvatarImage = styled.img`
  /* border: 1px solid red; */
  width: 128px;
  height: 128px;
  border-radius: 50%;
`

export const ProfileName = styled.p`
  /* border: 1px solid green; */
  font-size: 24px;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 10px;
  color: #363636;
  padding: 0px 10px;
  text-align: center;
`

export const ProfileBio = styled.p`
  /* border: 1px solid green; */
  font-size: 18px;
  font-weight: 500;
  line-height: 1.33;
  color: #9b9b9b;
  text-align: center;
  padding: 0px 10px 0px 10px;
  margin-bottom: 20px;
  white-space: pre-line;
`

export const CountryCity = styled.p`
  /* border: solid green; */
  font-size: 18px;
  font-weight: 900;
  color: #363636;
`
