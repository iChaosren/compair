import { Box, Container, FormControl, FormLabel, HStack, IconButton, List, ListItem, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
// import Image from 'next/image'
import Footer from '../components/footer'
import Main from '../components/main'
import AddSite from '../forms/add-site'
import Sites from '../types/sites'
import map from 'lodash/map'
import { CloseIcon, CheckIcon } from '@chakra-ui/icons'
// import Site from '../types/site'

interface HomeProps {
  sites: Sites;
}

const Home: NextPage<HomeProps> = ({ sites }) => {
  return (
    <>
      <Head>
        <title>Compair</title>
        <meta name="description" content="Compair" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <List spacing={4}>
          {Object.keys(sites).length > 0 ? map(sites,
            (site, siteId) => (
              <ListItem key={siteId}>
                <HStack spacing={8}>
                  <Box h={4} w={4} borderRadius={"full"} bg={site.enabled ? "green" : "red"}>&nbsp;</Box>
                  <Text fontWeight="bold">{site.name}</Text>
                  <IconButton aria-label={site.enabled ? "disable checks" : "enable checks"}>{site.enabled ? <CloseIcon /> : <CheckIcon />}</IconButton>
                </HStack>
              </ListItem>
            )
          ) : (<ListItem>No sites yet</ListItem>)
          }
        </List>
        
        <br />

        <AddSite />

      </Main>

      <Footer>
        {/* Some Footer */}
      </Footer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await fetch('http://localhost:3000/api/sites');
  const sites = await res.json();

  return {
    props: { sites }
  }
}

export default Home
