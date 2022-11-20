import { useRouter } from "next/router"
import PageLayout from "../components/layouts/PageLayout"

import { ethers } from "ethers"
import { useMetaMask } from "metamask-react"

import { useState, useEffect } from "react"

let nfts = ['1', '2', '3'];

export default function UserDashData() {
    const router = useRouter()
    const { status, connect, account, chainId, ethereum } = useMetaMask();

    const [provider, setProvider] = useState<any>(null);
    const abi = require('../abis/SpendDAO.json').abi;

    async function getNFTs() {
        if (provider == undefined) {
            console.log('no provider')
            return
        }
        else if (status != 'connected') {
            console.log('not connected')
            return
        }
        console.log('running')
        console.log(account)
    }

    const listItems = nfts.map((nft) =>
        <li key={nft.toString()}>
            {nft}
        </li>
    );

    return (
        <ul>{listItems}</ul>
    )
}
