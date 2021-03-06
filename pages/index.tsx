import { Container, FormControl, FormLabel, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
// import Image from 'next/image'
import Footer from '../components/footer'
import Main from '../components/main'
import AddSite from '../forms/add-site'
// import Site from '../types/site'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Compair</title>
        <meta name="description" content="Compair" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>

        <AddSite />

      </Main>

      <Footer>
        Some Footer
      </Footer>
    </>
  )
}

export default Home
