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
          ZP DAO
        </h1>

        <div className="text-bold text-2xl text-gray-500 mt-8">
          {activeChoice === UserChoice.EndUser
            ? "Control your own data & profit from it"
            : "Use data more efficiently with compliance"}
        </div>

        <div
          className="mt-20 inline-flex rounded-full shadow-sm bg-gray-200 border-2 border-gray-300"
          role="group"
        >
          <button
            type="button"
            className={`py-2 px-4 text-sm font-medium text-gray-900 rounded-l-full rounded-r-full border border-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white ${
              activeChoice === UserChoice.EndUser ? "bg-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveChoice(UserChoice.EndUser)}
          >
            End user
          </button>
          <button
            type="button"
            className={`py-2 px-4 text-sm font-medium text-gray-900 rounded-r-full rounded-l-full border border-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white ${
              activeChoice === UserChoice.DaoAdmin ? "bg-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveChoice(UserChoice.DaoAdmin)}
          >
            DAO admin
          </button>
        </div>

        <button
          className="block mx-auto bg-violet-600 text-white text-bold text-xl rounded-xl mt-48 px-16 py-2"
          onClick={() => {
            router.push(
              activeChoice === UserChoice.EndUser ? "/join" : "/admin-dashboard"
            )
          }}
        >
          {activeChoice === UserChoice.EndUser
            ? "Join ZP DAO"
            : "Login with the wallet"}
        </button>
      </div>
    </div>
  )
}
