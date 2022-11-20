import { createContext, SetStateAction, useContext, useState } from "react";

type AccContextType = {
    accountContext: string | null;
    setAccountContext: React.Dispatch<SetStateAction<string | null>>;
}

const initAccContext = {
    accountContext: null,
    setAccountContext: () => {}
}

const AccContext = createContext <AccContextType> (initAccContext);


export function AccountProvider( { children } : any) {
    const [accountContext, setAccountContext] = useState <string | null> (null);

    return (
        <AccContext.Provider value={ {accountContext, setAccountContext} }> {children}</AccContext.Provider>
    )
}

// Export useContext Hook.
export function useAccContext() {
    return useContext(AccContext);
}
