import { useRouter } from "next/router"
import PageLayout from "../components/layouts/PageLayout"

import { ethers } from "ethers"
import { useMetaMask } from "metamask-react"

import { useState, useEffect } from "react"

export default function UserDashData() {
  const router = useRouter()
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  const [provider, setProvider] = useState<any>(null);
  const abi = require('../abis/SpendDAO.json').abi;

  useEffect(() => {
    try {
      setProvider(new ethers.providers.Web3Provider((window as any).ethereum, "any"));
    } catch (e) {
      console.log(e);
    }
  }, [])






  return (
    <PageLayout>
      <div className="w-full min-h-screen bg-cover">
        <div className="text-center mt-32">
          <h1 className="font-bold text-violet-600 text-6xl leading-tight">
            Dashboard            
          </h1>          
        </div>

        <div>

          

        </div>

      </div>
    </PageLayout>
  )
}
