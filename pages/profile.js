import PrivateRoute from '../custom-routes/PrivateRoute'
import ProfileHeader from '../components/Profile/ProfileHeader'
import HomeNavbar from '../components/Navbar/HomeNavbar'
import Head from 'next/head'

export default function ProfilePage() {
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
        <HomeNavbar />
        <ProfileHeader />
      </PrivateRoute>
    </>
  )
}
