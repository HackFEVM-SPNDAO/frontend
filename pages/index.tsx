import { useRouter } from "next/router"
import { useState } from "react"

enum UserChoice {
  EndUser = "endUser",
  DaoAdmin = "daoAdmin",
}

export default function Home() {
  const router = useRouter()

  const [activeChoice, setActiveChoice] = useState(UserChoice.EndUser)

  return (
    <div className="w-full min-h-screen bg-cover bg-[url('/assets/landing_bg.png')]">
      <div className="text-center pt-32">
        <h1 className="font-bold text-violet-600 text-6xl leading-tight">
          Spend DAO
        </h1>
        <button
          className="block mx-auto bg-violet-600 text-white text-bold text-xl rounded-xl mt-48 px-16 py-2"
          onClick={()=>router.push("/dashboard")}
        >          
            User
        </button>
        <h1 className="font-bold text-violet-600 text-6xl leading-tight">
          
        </h1>
        <button
          className="block mx-auto bg-violet-600 text-white text-bold text-xl rounded-xl mt-5 px-16 py-2"
          onClick={()=>router.push("/admin-dashboard")}
        >          
            Admin           
        </button>

      </div>
    </div>
  )
}
