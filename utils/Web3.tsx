import { useMMContext } from "../context/MMProvider"
import { useEthersContext } from "../context/EthersProvider"

import { abi } from "../abis/currentABI"
import { ethers } from "ethers"

// export const MM = () => {
//     return useMMContext().mmContext;
// }

// export const Provider = () => {
//     return useEthersContext().ethersContext as ethers.providers.Web3Provider;
// }

// export const ABI = () => {
//     return abi;
// }

// export const Contract = () => {
//     const provider = Provider();
//     const mm = MM();

//     if (mm.account != undefined && provider != undefined && mm.status == 'connected') {
//         const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_ETH!, abi, provider.getSigner(mm.account!));
//         return contract;
//     }
//     throw new Error("Contract not available");
// }


// export const getBalance = async (address: string) => {    
//     return await Contract().balanceOf(address).then(parseInt)
// }

// export default class Web3Utils {
//     provider = useEthersContext().ethersContext as ethers.providers.Web3Provider;
//     mm = useMMContext().mmContext;
//     contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_ETH!, abi, this.provider.getSigner(this.mm.account!));

//     constructor() {
//         // provider = useEthersContext().ethersContext as ethers.providers.Web3Provider;
//         // mm = useMMContext().mmContext;
//         // contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_ETH!, abi, this.provider.getSigner(this.mm.account!));
//     }

//     async getBalance(address: string) {
//         return await this.contract.balanceOf(address).then(parseInt)
//     }


// }



// export const getTokensByOwner = async (address: string) => {
//     const contract = Contract();
//     await contract.(address);
// }


   
