import PageLayout from "../components/layouts/PageLayout"
import UserDashData from "../components/UserDashData"

export default function Home() {
    
  return (
    <PageLayout>
      <div className="w-full min-h-screen bg-cover">
        <div className="text-center mt-32">
          <h1 className="font-bold text-violet-600 text-6xl leading-tight">
            Dashboard
          </h1>
        </div>

        <div className="text-center mt-32">
          <UserDashData />
        </div>

      </div>
    </PageLayout>
  )
}
