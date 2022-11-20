import { ChakraProvider } from "@chakra-ui/react"
import type { AppProps } from "next/app"
import { MetaMaskProvider } from 'metamask-react'

import MainLayout from "../components/layouts/MainLayout"
import "../styles/globals.css"

const App = ({ Component, pageProps }: AppProps) => {
  return (
    
    <MetaMaskProvider>
      <ChakraProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ChakraProvider>
    </MetaMaskProvider>
  )
}

export default App
