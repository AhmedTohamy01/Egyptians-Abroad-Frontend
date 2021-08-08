import React, { useContext, useState, useEffect } from 'react'
import PrivateRoute from '../../custom-routes/PrivateRoute'
import ProfileHeader from '../../components/Profile/ProfileHeader'
import HomeNavbar from '../../components/Navbar/HomeNavbar'
import Head from 'next/head'
import Footer from '../../components/Footer/Footer'
import { MainContext } from '../../context/MainContext'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'
import axiosAPI from '../../api/axiosAPI'
import Button from '@material-ui/core/Button'
import Link from 'next/link'

export default function PublicProfilePage() {
  const { userProfile, avatarLink } = useContext(MainContext)
	const [userPublicProfile, setUserPublicProfile] = useState({})
	const [userPublicAvatar, setUserPublicAvatar] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(async () => {
    try {
      setLoading(true)
      const userId = window.location.href.split('/')[4]
      const user = await axiosAPI.user.getOtherUserInfo(userId)
      const avatar = user.data.avatar
        ? axiosAPI.user.getUserAvatar(user.data._id)
        : null
      setUserPublicProfile(user)
      setUserPublicAvatar(avatar)
      setLoading(false)
    } catch (e) {
      console.error(e)
    }
  }, [])

  if (loading) {
    return (
      <SpinnerWrapper>
        <Loader type='ThreeDots' color='#1399ff' height={100} width={100} />
      </SpinnerWrapper>
    )
  }

  return (
    <>
      <Head>
        <title>Egyptians Abroad</title>
        <meta charSet='utf-8' />
        <meta
          name='description'
          content='website to connect egyptians abroad and answer their questions'
        />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <PrivateRoute>
        <HomeNavbar userProfile={userProfile} avatarLink={avatarLink} />
        <ProfileHeader
          userProfile={userPublicProfile}
          avatarLink={userPublicAvatar}
        />
        <ButtonsWrapper>
          <Link href='#' passHref>
            <MessageButton variant='contained'>Send Message</MessageButton>
          </Link>
          <Link href='/home' passHref>
            <HomeButton variant='contained'>Back to Home</HomeButton>
          </Link>
        </ButtonsWrapper>
        <Footer />
      </PrivateRoute>
    </>
  )
}

/*---> Styles <---*/
export const SpinnerWrapper = styled.div`
  /* border: 1px solid red; */
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ButtonsWrapper = styled.div`
  /* border: 1px solid red; */
  display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

export const MessageButton = styled(Button)`
  background: linear-gradient(to bottom, #2bc9ff, #1399ff 100%) !important;
  width: 460px !important;
  height: 40px !important;
  padding: 0 12px !important;
  border-radius: 8px !important;
  text-transform: initial !important;
  color: white !important;
  font-size: 16px !important;
  margin-top: 30px !important;

  @media (max-width: 550px) {
    width: 80% !important;
  }
`

export const HomeButton = styled(Button)`
  background: #f0f0f0 !important;
  width: 460px !important;
  height: 40px !important;
  padding: 0 12px !important;
  border-radius: 10px !important;
  text-transform: capitalize !important;
  color: #5a5a5a !important;
  font-size: 16px !important;
  margin-bottom: 50px !important;
  margin-top: 30px !important;

  @media (max-width: 550px) {
    width: 80% !important;
  }
`