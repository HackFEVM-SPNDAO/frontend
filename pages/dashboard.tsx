import PageLayout from "../components/layouts/PageLayout"
import UserDashData from "../components/UserDashData"
import { useRouter } from "next/router"

export default function Home() {
  const router = useRouter();

  return (
    <PageLayout>
      <div className="w-full min-h-screen bg-cover">
        <div className="text-center mt-20">
          <h1 className="font-bold text-violet-600 text-6xl leading-tight">
            Dashboard
          </h1>
          <button
          className="block mx-auto bg-violet-600 text-white text-bold text-xl rounded-xl mt-5 px-16 py-2"
          onClick={()=>router.push("/join")}
        >          
            Mint           
        </button>
        </div>

        <div className="text-center mt-20">
          <UserDashData />
        </div>

      </div>
    </PageLayout>
  )
}
