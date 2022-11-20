import { createContext, SetStateAction, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

type EthersContextType = {
    ethersContext: ethers.providers.Web3Provider | null;
    setEthersContext: React.Dispatch<SetStateAction<ethers.providers.Web3Provider | null>>;
}

const initEthersContext = {
    ethersContext: null,
    setEthersContext: () => {}
}

const EthersContext = createContext <EthersContextType> (initEthersContext);


export function EthersProvider( { children } : any) {
    const [ethersContext, setEthersContext] = useState <any> (null);

    useEffect(() => {
        try {
          setEthersContext(new ethers.providers.Web3Provider((window as any).ethereum, "any"));
        } catch (e) {
          console.log(e);
        }
      }, [])

    return (
        <EthersContext.Provider value={ {ethersContext, setEthersContext} }> {children}</EthersContext.Provider>
    )
}

// Export useContext Hook.
export function useEthersContext() {
    return useContext(EthersContext);
}