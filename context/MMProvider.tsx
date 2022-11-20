import { createContext, SetStateAction, useContext, useState, useEffect } from "react";
import { useMetaMask } from "metamask-react"

type MMDataType = {
    status: string;
    connect: () => void;
    account: string | null;
    chainId: string | null;
    ethereum: any;    
}

type MMContextType = {
    mmContext: MMDataType;
    setMMContext: React.Dispatch<SetStateAction<MMDataType>>;
}

const initMMContext = {
    mmContext: {
        status: 'notConnected',
        connect: () => {},
        account: null,
        chainId: null,
        ethereum: null
    },
    setMMContext: () => {}
}

const MMContext = createContext <MMContextType> (initMMContext);

export function MMProvider( { children } : any) {
    const [mmContext, setMMContext] = useState <any> (null);
    
    const { status, connect, account, chainId, ethereum } = useMetaMask();

    useEffect(() => {
        try {
            setMMContext({
                status: status,
                connect: connect,
                account: account,
                chainId: chainId,
                ethereum: ethereum
            });
        } catch (e) {
            console.log(e);
        }
    }, [status, connect, account, chainId, ethereum])

    return (
        <MMContext.Provider value={ {mmContext, setMMContext} }> {children}</MMContext.Provider>
    )
}

// Export useContext Hook.
export function useMMContext() {
    return useContext(MMContext);
}