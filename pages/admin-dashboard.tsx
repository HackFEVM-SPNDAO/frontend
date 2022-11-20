import Image from "next/image"
import { useRouter } from "next/router"
import PageLayout from "../components/layouts/PageLayout"

import { ethers } from "ethers";
import { useEthersContext } from "../context/EthersProvider"
import { useMMContext } from "../context/MMProvider"
import { ADMIN_ABI } from "../abis/currentABI"
import { useEffect } from "react";

import AdminDashData from "../components/AdminDashData";

export default function Home() {
  const mm = useMMContext().mmContext
  const provider = useEthersContext().ethersContext as ethers.providers.Web3Provider
  const router = useRouter()


  useEffect(() => {
    // check for admin NFT
    async function checkForAdminNFT() {
      if (provider == undefined) {
        console.log("no provider")        
        return
      } else if (mm.status != 'connected') {
        console.log("mm not connected")
        return
      }
  
      try {
        await provider.send("eth_requestAccounts", [])
        const signer = provider.getSigner()
  
        const SpendAdmin = new ethers.Contract(
          process.env.NEXT_PUBLIC_ADMIN_ADDR!,
          ADMIN_ABI as ethers.ContractInterface,
          signer
        )
        const bal = await SpendAdmin.balanceOf(mm.account!);
        // console.log(`bal: ${bal}`)
  
        if (bal > 0) {
          console.log('admin NFT found')          
        }
        else {
          console.log('NOT found')
          router.push("/")
        }
      }
      catch (e) {
        console.log(mm.account)                
        router.push("/")
      }
    }

    checkForAdminNFT()    
  }, [mm, provider])

  return (
    <PageLayout containerClassName="bg-gray-50">
      <div className="w-full min-h-screen bg-cover">
        <div className="text-center mt-32">
          <h1 className="font-bold text-6xl leading-tight">
            Decrypted Data
          </h1>

          <div className="mt-8 flex flex-col items-center mx-auto">

          <AdminDashData />

          </div>
        </div>
      </div>
    </PageLayout>
  )
}
