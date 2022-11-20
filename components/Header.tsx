import { useRouter } from "next/router"
import { FC, useState } from "react"

import useIsMounted from "../hooks/useIsMounted"

import { useMetaMask } from "metamask-react"

type HeaderProps = {
  type?: string
}

const Header: FC<HeaderProps> = ({}) => {
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  const router = useRouter()
  const isMounted = useIsMounted()

  return (
    <div className="min-h-full bg-transparent shadow-sm">
      <div className="container mx-auto px-6 flex items-center h-20 text-gray-600">
        <div className="flex items-center justify-between w-full">
          <button
            className="text-extrabold text-4xl text-violet-600 w-32 flex items-center justify-center"
            onClick={() => router.push("/")}
          >
            <h2>SpendDAO</h2>
          </button>

          <div className="flex items-center space-x-6 z-50">
            {!isMounted ? null : status == 'connected' ? (
              <button
                className="text-bold text-md rounded-xl text-violet-600 border-2 border-gray-100 py-2 px-6 max-w-xs truncate"
                // onClick={() => disconnect()}
              >
                {account}
              </button>
            ) : (
              <button
                className="text-bold text-md rounded-xl text-violet-600 border-2 border-gray-100 py-2 px-6"
                onClick={connect}
              >
                Sign in with wallet
              </button>
            )}
          </div>
        </div>
      </div>    
    </div>
  )
}

export default Header
