import React, { useContext, useState, useEffect } from 'react'
import Head from 'next/head'
import HomeNavbar from '../components/Navbar/HomeNavbar'
import PrivateRoute from '../custom-routes/PrivateRoute'
import ProfileHeader from '../components/Profile/ProfileHeader'
import HomeBody from '../components/Home/HomeBody'
import Footer from '../components/Footer/Footer'
import AddButton from '../components/Home/AddButton'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'
import { MainContext } from '../context/MainContext'

export default function HomePage() {
  const { userProfile, avatarLink } = useContext(MainContext)

  if (Object.keys(userProfile).length === 0) {
    return (
      <SpinnerWrapper>
        <Loader type='ThreeDots' color='#1399ff' height={100} width={100} />
      </SpinnerWrapper>
    )
  }

  return (
    <PrivateRoute>
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
      <HomeNavbar userProfile={userProfile} avatarLink={avatarLink} />
      <ProfileHeader userProfile={userProfile} avatarLink={avatarLink} />
      <HomeBody />
      <AddButton ButtonLink='/new-post' />
      <Footer />
    </PrivateRoute>
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
