import { ChakraProvider } from "@chakra-ui/react"
import type { AppProps } from "next/app"
import { chain, Chain, configureChains, createClient, WagmiConfig } from "wagmi"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"
import { publicProvider } from "wagmi/providers/public"
import MainLayout from "../components/layouts/MainLayout"
import "../styles/globals.css"

const fevmChain: Chain = {
  id: 31415,
  name: "wallaby",
  network: "wallaby",
  // nativeCurrency: "tFIL",
  rpcUrls: {
    default: "https://wallaby.node.glif.io/rpc/v0",
  },
  blockExplorers: {
    default: { name: "glif", url: "https://explorer.glif.io/wallaby" },
  },
  testnet: true,
}

const { chains, provider, webSocketProvider } = configureChains(
  [fevmChain, chain.localhost],
  [
    publicProvider(),
    jsonRpcProvider({
      rpc: (chain: Chain) => ({ http: chain.rpcUrls.default }),
    }),
  ]
)

const client = createClient({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  provider,
  webSocketProvider,
})

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <WagmiConfig client={client}>
      <ChakraProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ChakraProvider>
    </WagmiConfig>
  )
}

export default App
