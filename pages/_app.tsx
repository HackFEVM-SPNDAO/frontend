import { ChakraProvider } from "@chakra-ui/react"
import type { AppProps } from "next/app"

import { MetaMaskProvider } from 'metamask-react'
import { AccountProvider } from '../context/AccountProvider'

import MainLayout from "../components/layouts/MainLayout"
import "../styles/globals.css"

const App = ({ Component, pageProps }: AppProps) => {
  return (

    <MetaMaskProvider>
      <AccountProvider>

        <ChakraProvider>
          
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>

        </ChakraProvider>
        
      </AccountProvider>
    </MetaMaskProvider>
  )
}

export default App
