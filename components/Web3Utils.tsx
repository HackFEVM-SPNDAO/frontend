import { ethers } from "ethers"
import { useMetaMask } from "metamask-react"
import { useEffect, useState } from "react"


export default function Web3Utils() {
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

}