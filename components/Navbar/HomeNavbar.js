import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import axiosAPI from '../../api/axiosAPI'

/*---> Component <---*/
export default function HomeNavbar() {
  const [userData, setUserData] = useState(null)
  const [avatarLink, setAvatarLink] = useState(null)
	const [error, setError] = useState(null)

  useEffect(async () => {
    try {
      const user = await axiosAPI.user.getUserInfo()
      const avatar = user.data.avatar ?  await axiosAPI.user.getUserAvatar(user.data._id) : null
      setUserData(user)
      setAvatarLink(avatar)
    } catch (e) {
      setError(e)
    }
  }, [])

	if (!userData) {
    return <>Loading .... </>
  }
	
	if (error) {
    return <>Something went wrong, please try again later ... </>
  }

  return (
    <NavbarWrapper>
      <Link href='/'>
        <LogoWrapper>
          <LogoIcon>EgyptiansAbroad</LogoIcon>
        </LogoWrapper>
      </Link>
      <UserInfoWrapper>
        <LinksWrapper>
          <UsernameWrapper>
            <Username>{userData?.data.name}</Username>
          </UsernameWrapper>
          <AvatarWrapper>
            <Avatar
              src={avatarLink || '/images/avatar-sample.png'}
              alt='small avatar'
            />
          </AvatarWrapper>
        </LinksWrapper>
      </UserInfoWrapper>
    </NavbarWrapper>
  )
}

/*---> Styles <---*/
export const NavbarWrapper = styled.div`
  /* border: 1px solid yellow; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 940px;
  padding: 20px 10px 20px 10px;
  margin: auto;
`

export const LogoWrapper = styled.div`
  /* border: 1px solid yellow; */
  cursor: pointer;
`

export const LogoIcon = styled.p`
  /* border: 1px solid yellow; */
  font-size: 30px;
  font-family: 'Caveat', cursive;
  font-weight: 700;
  color: #1399ff;

  @media (max-width: 550px) {
    font-size: 20px;
  }
`

export const UserInfoWrapper = styled.div`
  /* border: solid red; */
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const LinksWrapper = styled.div`
  /* border: solid green; */
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* width: 175px; */
`

export const UsernameWrapper = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const Username = styled.p`
  font-weight: bold;
  font-size: 16px;
  font-weight: 600;
  color: #363636;
  margin-right: 5px;
`

export const AvatarWrapper = styled.div`
  /* border: 1px solid yellow; */
`

export const Avatar = styled.img`
  width: 42px;
  height: 42px;
  cursor: pointer;
  border-radius: 50%;
`
