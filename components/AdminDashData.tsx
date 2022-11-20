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
        return (<div><ul>{
            list.map((nft, index) => {
                return <li key={index}>{nft}</li>
            })
        }</ul></div>
        )
    }
}
