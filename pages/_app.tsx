import { ChakraProvider } from "@chakra-ui/react"
import type { AppProps } from "next/app"

import { MetaMaskProvider } from 'metamask-react'
import { EthersProvider } from '../context/EthersProvider'
import { MMProvider } from "../context/MMProvider" // custom mm context provider

import MainLayout from "../components/layouts/MainLayout"
import "../styles/globals.css"


const App = ({ Component, pageProps }: AppProps) => {
  return (

    <MetaMaskProvider>

        <MMProvider> 
        <EthersProvider>
          
          <ChakraProvider>

            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>

          </ChakraProvider>

        </EthersProvider>
        </MMProvider>

    </MetaMaskProvider>
  )
}

export default App
