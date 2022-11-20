import { useEffect, useState } from "react"
import { ethers } from "ethers"

import { useMMContext } from "../context/MMProvider"
import { useEthersContext } from "../context/EthersProvider"
import { abi } from "../abis/currentABI"



export default function UserDashData() {
    const mm = useMMContext().mmContext;
    const provider = useEthersContext().ethersContext as ethers.providers.Web3Provider;
    const [list, setList] = useState<any[]>([]);



    // updates dashboard if mm or provider changes
    useEffect(() => {
        const getNFTs = async () => {
            const signer = provider.getSigner();
            const contract = new ethers.Contract(process.env.NEXT_PUBLIC_SBT_ADDR!, abi, signer);

            const bal = await contract.balanceOf(mm.account!);


            for (let i = 0; i < bal; i++) {
                const tokenID = await contract.ownerToTokenIds(mm.account!, i);
                const token = await contract.tokenURI(tokenID);
                setList(list => [...list, token]);
                console.log(`tokenID: ${tokenID}, token: ${token}`);
            }

        }

        // only run when mm and provider are defined
        if (provider != undefined && mm != undefined && mm.status == 'connected') {
            getNFTs();
        }

    }, [provider, mm]);

    return (
        <div>
            <ul>
                {

                    list.map((nft, index) => {
                        return <li key={index}>{nft}</li>
                    })
                
                }
            </ul>
        </div>
    )
}
