import Head from 'next/head'
import React, { useContext } from 'react'
import { MainContext } from '../context/MainContext'
import PageWrapper from '../components/Landing/PageWrapper'
import ConnectAccrossGlobe from '../components/Landing/ConnectAccrossGlobe'
import Footer from '../components/Footer/Footer'
import FindCoFounder from '../components/Landing/FindCoFounder'
import StudyWorkAbroad from '../components/Landing/StudyWorkAbroad'
import VisaImmigration from '../components/Landing/VisaImmigration'
import ExpandYourNetwork from '../components/Landing/ExpandYourNetwork'
import ReadyToDive from '../components/Landing/ReadyToDive'
import AskAboutAnything from '../components/Landing/AskAboutAnything'
import FindPeopleToHelp from '../components/Landing/FindPeopleToHelp'

import MenuCard from '../components/Landing/MenuCard'
import MenuCardOverlay from '../components/Landing/MenuCardOverlay'

export default function LandingPage() {
  const { showMenuCard } = useContext(MainContext)

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
      <PageWrapper>
        {showMenuCard ? (
          <MenuCardOverlay>
            <MenuCard />
          </MenuCardOverlay>
        ) : null}
        <ConnectAccrossGlobe />
        <AskAboutAnything />
        <FindPeopleToHelp />
        <ExpandYourNetwork />
        <FindCoFounder id='FindCoFounder' />
        <StudyWorkAbroad />
        <VisaImmigration />
        <ReadyToDive />
        <Footer />
      </PageWrapper>
    </>
  )
}
