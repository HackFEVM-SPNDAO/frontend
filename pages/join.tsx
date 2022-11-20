import { useRouter } from "next/router"
import { ChangeEvent, useRef, useState, useEffect } from "react"
import { AiFillDatabase, AiFillStar, AiOutlineStar } from "react-icons/ai"
import { BiUpload } from "react-icons/bi"
import { IoIosCheckmark } from "react-icons/io"

import PageLayout from "../components/layouts/PageLayout"
import Spinner from "../components/Spinner"
import useIsMounted from "../hooks/useIsMounted"

import { ethers } from "ethers"

import { useEthersContext } from "../context/EthersProvider"
import { useMMContext } from "../context/MMProvider"
import { abi } from "../abis/currentABI"

enum JoinState {
  Start = "start",
  UploadingCsv = "uploading-csv",
  UploadSuccess = "upload-success",
  UploadFailure = "upload-failure",
  MintToken = "mint-token",
  MintSuccess = "mint-success",
  MintFailure = "mint-failure",
}

let cid = "";

export default function Join() {
  const mm = useMMContext().mmContext;
  const provider = useEthersContext().ethersContext as ethers.providers.Web3Provider;
  const router = useRouter()
  const isMounted = useIsMounted()

  const [joinState, setJoinState] = useState<JoinState>(JoinState.Start)
  const [csvFile, setCsvFile] = useState<File>();


  // loads file client side so server can see it
  const uploadToClient = async (event: any) => {
    setCsvFile(event.target.files[0]);
  }

  const uploadToServer = async (event: any) => {
    setJoinState(JoinState.UploadingCsv)

    try {
      const body = new FormData()
      body.append("file", csvFile!)

      await fetch("/api/saveFile", { method: "POST", body })

      const new_cid = await fetch("/api/ipfs", { method: "POST", body })
        .then((res) => { return res.json() })

      cid = new_cid;

      setJoinState(JoinState.UploadSuccess)
    }
    catch (e: any) {
      console.error(`An error occured during uploading the file: ${e.message}`)
      setJoinState(JoinState.UploadFailure)
    }

  }



  async function onMintToken() {
    // FOR TESTING    
    if (provider == undefined) {
      console.log('no provider')
      return
    }
    else if (cid == undefined || cid == '') {
      console.log('invalid cid')
      return
    }


    try {
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      const SpendDAO = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_ETH!,
        abi as ethers.ContractInterface,
        signer
      );

      const tx = await SpendDAO.safeMint(mm.account!, cid)
      // await tx.wait(); // wait for the transaction to be mined
      setJoinState(JoinState.MintSuccess)
    }
    catch (e) {
      console.log(e);
      setJoinState(JoinState.MintFailure);
    }

    // await SpendDAO.balanceOf(account!)
    // .then(parseInt)
    // .then(console.log)

    // await provider.getBalance(account!)
    //   .then(ethers.utils.formatEther)
    //   .then(console.log)


  }

  function onViewDashboard() {
    router.push("/dashboard")
  }

  function showTitle() {
    let title = null
    switch (joinState) {
      case JoinState.Start:
        title = "Upload a CSV file"
        break
      case JoinState.UploadingCsv:
        title = "Uploading your files..."
        break
      case JoinState.UploadSuccess:
        title = "Upload successful!"
        break
      case JoinState.UploadFailure:
      case JoinState.MintFailure:
        title = (
          <>
            <p>We&apos;re really sorry.</p>
            <p>An error occured, please refresh the page and try again.</p>
          </>
        )
        break
      case JoinState.MintToken:
        title = "Data encrypted. You can mint your token now"
        break
      case JoinState.MintSuccess:
        title = "Token mint successful"
        break
      default:
        break
    }

    return title
  }

  function showContent() {
    let content = null

    switch (joinState) {
      case JoinState.Start:
        content = (
          <div className="mx-auto w-1/2 mt-24 py-24 px-8 py-2 border-2 border-dashed border-gray-500 rounded-xl">
            <form onSubmit={uploadToServer}>
              <input id="images" type="file" onChange={uploadToClient} />
              <br></br>
              <button type="submit">Upload</button>
            </form>

            {/* TEST BUTTON
            <br></br>
            <button onClick={onMintToken}>Mint Token</button> */}

          </div>
          // <div className="mx-auto w-1/2 mt-24 py-24 px-8 py-2 border-2 border-dashed border-gray-500 rounded-xl">
          //   <button
          //     className="mx-auto flex flex-col items-center rounded-xl"
          //     onClick={uploadToServer}
          //   >
          //     <div className="text-violet-600 text-bold text-5xl ">
          //       <BiUpload />
          //     </div>

          //     <p>
          //       <span className="text-violet-600 text-bold">Browse</span> your
          //       files
          //     </p>
          //   </button>


          //   <input
          //     ref={(ref) => (fileRef.current = ref)}
          //     type="file"
          //     accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          //     className="hidden"
          //     // className="flex justify-center mt-10 w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-600 hover:file:bg-violet-100"
          //     onChange={uploadToClient} 
          //   />
          // </div>
        )
        break
      case JoinState.UploadingCsv:
        content = (
          <div className="mx-auto w-1/2 mt-24 py-24 px-8 py-2 border-2 border-dashed border-gray-500 rounded-xl">
            <div className="mx-auto flex flex-col items-center rounded-xl">
              <Spinner />

              <p className="mt-4">This may take a while...</p>
              <p>Please do not close your browser</p>
            </div>
          </div>
        )
        break
      case JoinState.UploadSuccess:
        setJoinState(JoinState.MintToken)

        break
      case JoinState.UploadFailure:
      case JoinState.MintFailure:
        break
      case JoinState.MintToken:
        content = (
          <div className="flex flex-col items-center mx-auto mt-24 py-24 px-8">
            <div className="text-gray-500 bg-black rounded-full py-4 px-4 text-bold text-5xl ">
              <AiFillDatabase />
            </div>

            <button
              className="bg-violet-600 text-white text-bold text-xl rounded-xl mt-24 px-16 py-2"
              onClick={() => onMintToken()}
            >
              Mint token
            </button>
          </div>
        )
        break
      case JoinState.MintSuccess:
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
      <div className="w-full min-h-screen bg-cover ">
        <div className="text-center mt-32">

          {!isMounted ? null : mm.status != 'connected' ? (
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
