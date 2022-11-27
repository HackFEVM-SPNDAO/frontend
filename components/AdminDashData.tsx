import { useEffect, useState } from "react"
import { ethers } from "ethers"

import { useMMContext } from "../context/MMProvider"
import { useEthersContext } from "../context/EthersProvider"
import { SBT_ABI } from "../abis/currentABI"

type Nft = {
    status: number
    totalItems: number
    items: [
      {
        id: string
        createdAt: string
        cid: string
        name: string
        originalname: string
        size: string
        metadata: Record<string, any>
        type: string
        pinToIPFS: boolean
        uri: string
      }
    ]
  }
  

export default function AdminDashData() {
    const mm = useMMContext().mmContext;
    const provider = useEthersContext().ethersContext as ethers.providers.Web3Provider;
    const [list, setList] = useState<any[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    // updates dashboard if mm or provider changes
    useEffect(() => {
        const getNFTs = async () => {
            setLoaded(false);
            setList([]);

            const signer = provider.getSigner();
            const contract = new ethers.Contract(process.env.NEXT_PUBLIC_SBT_ADDR!, SBT_ABI, signer);

            let bal = await contract.totalSupply();
            bal = bal.toNumber();
            
            console.log(bal);
            for (let i = 1; i < bal; i++) {
                await contract.cidList(i)
                    .then((cid: string) => {                        
                        fetch('/api/getData', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ cid: cid })
                        })
                        .then(res => res.json())
                        .then((data) => {
                            setList(list => [...list, JSON.stringify(data)]);
                        })
                    });
            }

            setLoaded(true);
        }

        // only run when mm and provider are defined
        if (provider != undefined && mm != undefined && mm.status == 'connected') {
            getNFTs();
        }

    }, [provider, mm]);

    if (!loaded) {
        return (<div><h1>Loading...</h1></div>)
    }
    else if (loaded && list.length == 0) {
        return (<div><h1>No SBTs minted</h1></div>)
    }
    else {
        // return (<div><ul>{
        //     list.map((nft, index) => {
        //         return <li key={index}>{nft}</li>
        //     })
        // }</ul></div>
        // )
        return (
            <div className="flex flex-col items-center mx-auto mt-24 px-8 py-3">
            {list.map((item, index) => {
              const nft = JSON.parse(item) as Nft
            return (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-white py-5 px-8 shadow-md"
              >
                <div className="flex flex-col items-start">
                  <p className="text-bold text-gray-500">Token Name</p>
                  <p className="truncate max-w-xs text-bold text-gray-500">
                    {nft?.items[0].name.substring(0, 8)}
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
                //   disabled={!!isBurning}
                //   onClick={() => burnToken(nft?.items[0].id)}
                >
                  {/* {!!isBurning ? <Spinner /> : "Burn"} */}
                Unlock
                </button>
              </div>
              
            )
          })}
      </div>
        )
    }
}
