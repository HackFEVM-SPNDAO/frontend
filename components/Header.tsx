import { useRouter } from "next/router"
import { FC, useState } from "react"

import useIsMounted from "../hooks/useIsMounted"

import { useMMContext } from "../context/MMProvider"

type HeaderProps = {
  type?: string
}

const Header: FC<HeaderProps> = ({}) => {
  const mm = useMMContext().mmContext
  const router = useRouter()
  const isMounted = useIsMounted()

  return (
    <div className="min-h-full shadow-sm">
      <div className="container mx-auto px-6 flex items-center h-20 text-gray-600">
        <div className="flex items-center justify-between w-full">
          <button
            className="text-extrabold text-4xl text-violet-600 w-32 flex items-center justify-center"
            onClick={() => router.push("/")}
          >
            <h2>SpendDAO</h2>
          </button>

          <div className="flex items-center space-x-6 z-50">
            {!isMounted ? null : mm.status == "connected" ? (
              <button
                className="text-bold text-md rounded-xl text-violet-600 border-2 border-gray-100 py-2 px-6 max-w-xs truncate"
                // onClick={() => disconnect()}
              >
                {mm.account}
              </button>
            ) : (
              <button
                className="text-bold text-md rounded-xl text-violet-600 border-2 border-gray-100 py-2 px-6"
                onClick={mm.connect}
              >
                Sign in with wallet
              </button>
            )}
          </div>
        </div>
      </div>
      {/* <ConnectModal
        onClose={() => setOpenConnectModal(false)}
        open={openConnectModal}
        modalTitle="Connect Wallet"
      />
      </div>     */}
    </div>
  )
}

export default Header
