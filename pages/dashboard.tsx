import { useRouter } from "next/router"
import PageLayout from "../components/layouts/PageLayout"

export default function Home() {
  const router = useRouter()

  return (
    <PageLayout>
      <div className="w-full min-h-screen bg-cover">
        <div className="text-center mt-32">
          <h1 className="font-bold text-violet-600 text-6xl leading-tight">
            Dashboard
          </h1>
        </div>
      </div>
    </PageLayout>
  )
}
