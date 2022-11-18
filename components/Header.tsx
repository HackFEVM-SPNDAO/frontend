import React, { useState, useEffect, FC } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"
import ConnectModal from "./ConnectModal"
import { useAccount, useDisconnect } from "wagmi"
import useIsMounted from "../hooks/useIsMounted"

type HeaderProps = {
  type?: string
}

const Header: FC<HeaderProps> = ({}) => {
  const isMounted = useIsMounted()

  const { address } = useAccount()
  const { disconnect } = useDisconnect()

  const router = useRouter()
  const [openConnectModal, setOpenConnectModal] = useState<boolean>(false)

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
