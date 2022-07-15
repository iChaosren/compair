import { Container } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
// import Image from 'next/image'
import Footer from '../components/footer'
import Main from '../components/main'
// import Site from '../types/site'

const Home: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>Compair</title>
        <meta name="description" content="Compair" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>

      </Main>

      <Footer>
        Some Footer
      </Footer>
    </Container>
  )
}

export default Home
