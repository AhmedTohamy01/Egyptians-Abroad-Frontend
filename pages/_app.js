import GlobalStyles from '../styles/GlobalStyles'
import { MainContextProvider } from '../context/MainContext'


function MyApp({ Component, pageProps }) {
  return (
    <MainContextProvider>
      <GlobalStyles />
      <Component {...pageProps} />
    </MainContextProvider>
  ) 
}

export default MyApp
