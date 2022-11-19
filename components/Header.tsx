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
  const isMounted = useIsMounted()

  const { address } = useAccount()
  const { disconnect } = useDisconnect()

  const router = useRouter()
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
      <div className="container mx-auto px-8 flex items-center h-20 text-gray-600">
        <div className="flex items-center justify-between w-full">
          <button
            className="w-32 flex items-center justify-center"
            onClick={() => router.push("/")}
          >
            ZP DAO
          </button>

          <div className="flex hidden lg:flex lg:items-center space-x-6 xl:space-x-12 z-50">
            {!isMounted ? null : address ? (
              <button
                className="big-btn nlk-gradient"
                onClick={() => disconnect()}
              >
                {address}
              </button>
            ) : (
              <button
                className="big-btn nlk-gradient"
                onClick={() => setOpenConnectModal(true)}
              >
                Connect
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
