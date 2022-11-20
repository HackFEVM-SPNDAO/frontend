import { useEffect, useState } from "react"
import { ethers } from "ethers"

import { useMMContext } from "../context/MMProvider"
import { useEthersContext } from "../context/EthersProvider"
import { SBT_ABI } from "../abis/currentABI"



export default function AdminDashData() {
    const mm = useMMContext().mmContext;
    const provider = useEthersContext().ethersContext as ethers.providers.Web3Provider;
    const [list, setList] = useState<any[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    // updates dashboard if mm or provider changes
    useEffect(() => {
        const getNFTs = async () => {
            const signer = provider.getSigner();
            const contract = new ethers.Contract(process.env.NEXT_PUBLIC_SBT_ADDR!, SBT_ABI, signer);

            const bal = await contract.totalSupply();

            for (let i = 0; i < bal; i++) {
                const tokenID = await contract.tokenByIndex(i);
                const token = await contract.tokenURI(tokenID);
                setList(list => [...list, token]);
                console.log(`tokenID: ${tokenID}, token: ${token}`);
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
        return (<div><ul>{
            list.map((nft, index) => {
                return <li key={index}>{nft}</li>
            })
        }</ul></div>
        )
    }
}
