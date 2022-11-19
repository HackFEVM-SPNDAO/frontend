import { useAccount, useBalance, useProvider } from "wagmi"
import PageLayout from "../components/layouts/PageLayout"
import useIsMounted from "../hooks/useIsMounted"

export default function Home() {
  const { address } = useAccount()
  const { data: balance } = useBalance({ address })

  const isMounted = useIsMounted()

  return (
    <PageLayout>
      <div className="w-full min-h-screen bg-cover">
        <div className="text-center ">
          <h1 className="font-bold text-6xl xl:text-8xl leading-tight">
            ZP DAO
          </h1>

          <div className="text-bold">
            Your current balance {isMounted && balance?.formatted}{" "}
            {isMounted && balance?.symbol}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
