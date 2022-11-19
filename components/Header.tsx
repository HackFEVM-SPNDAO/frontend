import { useRouter } from "next/router"
import { FC, useState } from "react"
import {
  Chain,
  useAccount,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
} from "wagmi"
import useIsMounted from "../hooks/useIsMounted"
import ConnectModal from "./ConnectModal"

type HeaderProps = {
  type?: string
}

const Header: FC<HeaderProps> = ({}) => {
  const router = useRouter()
  const isMounted = useIsMounted()

  const { address } = useAccount()
  const { disconnect } = useDisconnect()

  const [openConnectModal, setOpenConnectModal] = useState<boolean>(false)

  const { chain } = useNetwork()
  const { chains, error, isLoading, switchNetwork } = useSwitchNetwork()

  if (
    chain &&
    switchNetwork &&
    !chains.some((c: Chain) => c.id === chain.id) &&
    !isLoading &&
    !error
  ) {
    switchNetwork(chains[0].id)
  }

  return (
    <div className="min-h-full bg-transparent shadow-sm">
      <div className="container mx-auto px-6 flex items-center h-20 text-gray-600">
        <div className="flex items-center justify-between w-full">
          <button
            className="text-extrabold text-4xl text-violet-600 w-32 flex items-center justify-center"
            onClick={() => router.push("/")}
          >
            <h2>ZP DAO</h2>
          </button>

          <div className="flex items-center space-x-6 z-50">
            {!isMounted ? null : address ? (
              <button
                className="text-bold text-md rounded-xl text-violet-600 border-2 border-gray-100 py-2 px-6 max-w-xs truncate"
                onClick={() => disconnect()}
              >
                {address}
              </button>
            ) : (
              <button
                className="text-bold text-md rounded-xl text-violet-600 border-2 border-gray-100 py-2 px-6"
                onClick={() => setOpenConnectModal(true)}
              >
                Sign in with wallet
              </button>
            )}
          </div>
        </div>
      </div>
      <ConnectModal
        onClose={() => {
          setOpenConnectModal(false)
        }}
        open={openConnectModal}
        modalTitle="Connect Wallet"
      />
    </div>
  )
}

export default Header
