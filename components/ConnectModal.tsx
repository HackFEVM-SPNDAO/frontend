import React, { FC, useState, useEffect } from "react"
import Image from "next/image"
import BaseModal, { BaseModalProps } from "./BaseModal"
import MetamaskIcon from "public/assets/metamask.svg"
import WalletConnectIcon from "public/assets/wallet_connect.svg"
import CoinbaseIcon from "public/assets/coinbase.svg"
import { useConnect, useAccount } from "wagmi"

type ConnectModalProps = {
  modalTitle: string
  modalType?: string
} & BaseModalProps

const Icons = {
  metaMask: MetamaskIcon,
  walletConnect: WalletConnectIcon,
  coinbaseWallet: CoinbaseIcon,
}

const ConnectModal: FC<ConnectModalProps> = ({ open, onClose, modalTitle }) => {
  // const [{ data: connectData, loading: connectDataLoading, error }, connect] = useConnect();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { address, isConnecting, isDisconnected } = useAccount()

  useEffect(() => {
    address && onClose()
  }, [address, onClose])

  return (
    <BaseModal open={open} onClose={onClose} title={modalTitle}>
      <p className="text-sm text-gray-500 w-80">
        Connect with one of our available wallet providers or create a new one.
      </p>
      <div className=" py-2">
        {connectors.map((connector) => (
          <div key={connector.id} className="mt-4 relative">
            <button
              className="w-full big-btn bg-gray-100 gap-2 !justify-start"
              disabled={!connector.ready}
              onClick={() => connect({ connector })}
            >
              <Image
                src={Icons[connector.id]}
                alt={connector.name}
                width={24}
                height={24}
              />
              {connector.name}
              {!connector.ready && " (unsupported)"}
              {isLoading &&
                connector.id === pendingConnector?.id &&
                " (connecting)"}
            </button>
            {connector.id === "metaMask" && (
              <span className="absolute text-xs font-medium text-gray-500 bg-gray-200 rounded-3xl px-3 py-1 top-3 right-4">
                Popular
              </span>
            )}
          </div>
        ))}
        {error && <div>{error.message}</div>}
      </div>
    </BaseModal>
  )
}

export default ConnectModal
