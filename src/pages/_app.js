import '../css/style.scss'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="description" content="Generated by create next app" />
        <title>AZ Pokedex</title>
      </Head>
      <div className="grid wrapper">
        <Component {...pageProps} />
      </div>
  
    </>
  )
}

export default MyApp