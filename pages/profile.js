import React, { useContext, useState, useEffect } from 'react'
import PrivateRoute from '../custom-routes/PrivateRoute'
import ProfileHeader from '../components/Profile/ProfileHeader'
import HomeNavbar from '../components/Navbar/HomeNavbar'
import Head from 'next/head'
import Footer from '../components/Footer/Footer'
import ProfileBody from '../components/Profile/ProfileBody'
import { MainContext } from '../context/MainContext'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'

export default function ProfilePage() {
  const { userProfile, avatarLink } = useContext(MainContext)

	if (!userProfile || !avatarLink) {
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
        <ProfileHeader userProfile={userProfile} avatarLink={avatarLink} />
        <ProfileBody avatarLink={avatarLink} />
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
