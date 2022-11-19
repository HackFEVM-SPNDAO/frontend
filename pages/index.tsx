import { useRouter } from "next/router"
import PageLayout from "../components/layouts/PageLayout"

export default function Home() {
  const router = useRouter()

  return (
    <PageLayout>
      <div className="w-full min-h-screen bg-cover">
        <div className="text-center mt-32">
          <h1 className="font-bold text-violet-600 text-6xl leading-tight">
            ZP DAO
          </h1>

          <div className="text-bold text-2xl text-gray-500 mt-10">
            Control your own data & profit from it
          </div>

          <button
            className="bg-violet-600 text-white text-bold text-xl rounded-xl mt-48 px-16 py-2"
            onClick={() => router.push("/join")}
          >
            Join ZP DAO
          </button>
        </div>
      </div>
    </PageLayout>
  )
}
