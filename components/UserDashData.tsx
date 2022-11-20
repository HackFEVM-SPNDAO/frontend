import { useEffect } from "react"
import { ethers } from "ethers"

import { useMMContext } from "../context/MMProvider"
import { useEthersContext } from "../context/EthersProvider"
import { abi } from "../abis/currentABI"

let nfts:string[] = [];

export default function UserDashData() {
    
    const mm = useMMContext().mmContext;
    const provider = useEthersContext().ethersContext as ethers.providers.Web3Provider;

    const getNFTs = async () => {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_ETH!, abi, provider.getSigner(mm.account!));
        const nftList = await contract.balanceOf(mm.account!);
        console.log(nftList);
        nfts = nftList;
    }

    // updates dashboard if mm or provider changes
    useEffect(() => {


        // only run when mm and provider are defined
        if (provider != undefined && mm != undefined && mm.status == 'connected') {
            console.log('here')
            getNFTs();
        }

    }, [provider, mm]);
    
    return (
        <ul>
            {
                nfts.map((nft) => {
                    return (
                        <li key={''}>
                            {nft}
                        </li>
                    )
                })
                    
            }
        </ul>
    )
}
