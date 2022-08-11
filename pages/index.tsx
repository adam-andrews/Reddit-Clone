import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
const Home: NextPage = () => {
  console.log("Proces env" + process.env.GITHUB_ID)
  return (
    <div className="">
      <Head>
        <title>Reddit 2.0 Clone</title>
        </Head>
      <Header/>
    </div>
  )
}

export default Home
