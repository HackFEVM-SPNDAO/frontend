import { Contract, ethers } from "ethers"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { AiFillStar } from "react-icons/ai"
import { FiShoppingBag } from "react-icons/fi"
import { IoIosCheckmark } from "react-icons/io"

import PageLayout from "../components/layouts/PageLayout"
import Spinner from "../components/Spinner"
import useIsMounted from "../hooks/useIsMounted"

import { useEthersContext } from "../context/EthersProvider"
import { useMMContext } from "../context/MMProvider"
import { ADMIN_ABI } from "../abis/currentABI"

enum AdminState {
  NoData = "noData",
  FetchData = "fetchData",
  FetchError = "fetchError",
  DecryptSuccess = "decryptSuccess",
  DecryptFailure = "decryptFailure",
}

type EncryptedData = {
  address: string
  url: string
}

export default function Home() {
  const mm = useMMContext().mmContext
  const provider = useEthersContext().ethersContext as ethers.providers.Web3Provider
  const router = useRouter()
  const isMounted = useIsMounted()


  const [adminState, setAdminState] = useState(AdminState.NoData)

  const [isLoadingData, setIsLoadingData] = useState(false)
  const [encryptedData, setEncryptedData] = useState<EncryptedData[]>([])

  const [isLoadingDecryptionFor, setIsLoadingDecryptionFor] =
    useState<string>("")

  function onStartDecrypt() {
    setAdminState(AdminState.FetchData)
  }

  useEffect(() => {
    // check for admin NFT
    


    async function getEncryptedData() {
      if (adminState === AdminState.FetchData && !isLoadingData) {
        setIsLoadingData(true)

        try {         
          setEncryptedData([
            {
              address: ethers.constants.AddressZero,
              url: "https://gateway.pinata.cloud/ipfs/Qmez6fQ7pQ88MecRpiJSCcSF8ePdCtVPRLCB6kvxVXQgCp/0.json",
            },
          ])
        } catch (e: any) {
          console.error(`Error while fetching the encrypted data, ${e.message}`)
          setAdminState(AdminState.FetchError)
        } finally {
          setIsLoadingData(false)
        }
      }
    }

    getEncryptedData()
  }, [adminState, isLoadingData])

  async function onDecryptData(data: EncryptedData) {
   
    setIsLoadingDecryptionFor(data.address)
    try {
     

      // call contract to decrypt

      setAdminState(AdminState.DecryptSuccess)
    } catch (e: any) {
      console.error(`Error while decrypting the data, ${e.message}`)
      setAdminState(AdminState.DecryptFailure)
    } finally {
      setIsLoadingDecryptionFor("")
    }
  }

  function onViewDashboard() {
    router.push("/admin-dashboard")
  }

  function showTitle() {
    let title = null
    switch (adminState) {
      case AdminState.NoData:
        title = "You don't have any data yet..."
        break
      case AdminState.FetchData:
        title = "Decrypt data"
        break
      case AdminState.FetchError:
      case AdminState.DecryptFailure:
        title = (
          <>
            <p>We&apos;re really sorry.</p>
            <p>An error occured, please refresh the page and try again.</p>
          </>
        )
        break
      case AdminState.DecryptSuccess:
        title = "Data decrypt successful"
        break
      default:
        break
    }

    return title
  }

  function showContent() {
    let content = null
    switch (adminState) {
      case AdminState.NoData:
        content = (
          <div className="flex flex-col items-center mx-auto mt-24 px-8">
            <div className="text-violet-600 rounded-full py-4 px-4 text-bold text-8xl ">
              <FiShoppingBag />
            </div>

            <button
              className="bg-violet-600 text-white text-bold text-xl rounded-xl mt-24 px-16 py-2"
              onClick={() => onStartDecrypt()}
            >
              Start to decrypt data
            </button>
          </div>
        )
        break
      case AdminState.FetchData:
        content = (
          <div className="flex flex-col items-center mx-auto mt-24 px-8">
            {encryptedData.map((data: EncryptedData) => {
              return (
                <div
                  key={data.address}
                  className="flex items-center justify-between rounded-lg bg-white py-4 px-8 shadow-md"
                >
                  <div className="flex flex-col items-start">
                    <p className="text-bold text-gray-500">Wallet address</p>
                    <p className="truncate max-w-xs text-bold text-gray-500">
                      {data.address}
                    </p>
                  </div>
                  <div className="ml-8 flex flex-col items-start">
                    <p className="text-bold text-gray-500">SBT Contract</p>
                    <p className="truncate max-w-xs text-bold text-gray-500">
                      {process.env.NEXT_PUBLIC_SBT_ADDR!}
                    </p>
                  </div>
                  <div className="ml-8 flex flex-col items-start">
                    <p className="text-bold text-gray-500">Rewards</p>
                    <p className="text-bold text-gray-500">0.1 FIL</p>
                  </div>

                  <button
                    className="ml-8 bg-violet-600 text-white text-bold text-md rounded-md px-6 py-2"
                    disabled={!!isLoadingDecryptionFor}
                    onClick={() => onDecryptData(data)}
                  >
                    {!!isLoadingDecryptionFor ? <Spinner /> : "Decrypt"}
                  </button>
                </div>
              )
            })}
          </div>
        )
        break
      case AdminState.FetchError:
      case AdminState.DecryptFailure:
        break
      case AdminState.DecryptSuccess:
        content = (
          <div className="flex flex-col items-center mx-auto mt-18 py-24 px-8">
            <span className="text-md mr-10 text-red-500">
              <AiFillStar />
            </span>

            <div className="flex">
              <span className="text-lg mt-20 text-red-500">
                <AiFillStar />
              </span>
              <div className="text-white border-4 border-blue-600 bg-gradient-to-br from-violet-700 via-red-500 to-red-200 rounded-full py-1 px-1 text-bold text-8xl">
                <IoIosCheckmark />
              </div>
              <span className="text-lg mt-2 text-red-500">
                <AiFillStar />
              </span>
              <span className="text-sm mt-10 text-red-500">
                <AiFillStar />
              </span>
            </div>

            <button
              className="bg-violet-600 text-white text-bold text-xl rounded-xl mt-24 px-16 py-2"
              onClick={() => onViewDashboard()}
            >
              View in dashboard
            </button>
          </div>
        )
        break
      default:
        break
    }

    return content
  }

  return (
    <PageLayout containerClassName="bg-gray-50">
      <div className="w-full min-h-screen bg-cover">
        <div className="text-center mt-32">
          {!isMounted ? null : mm.status != "connected" ? (
            <h1 className="font-bold text-4xl leading-tight">Please sign in</h1>
          ) : (
            <>
              <h1 className="font-bold text-4xl leading-tight">
                {showTitle()}
              </h1>

              <div className="mt-10">Explanatory text, lorem ipsum...</div>

              {showContent()}
            </>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
