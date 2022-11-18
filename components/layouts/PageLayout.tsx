import React, { FC, useEffect } from "react"
import { useRouter } from "next/router"
import Header from "../Header"

type PageLayoutProps = {
  fetching?: boolean
  title?: string
  isProtected?: boolean
  children?: React.ReactNode
}

const PageLayout: FC<PageLayoutProps> = ({ isProtected, children }) => {
  const router = useRouter()
  useEffect(() => {
    if (isProtected) {
      router.push("/")
    }
  }, [isProtected, router])

  return (
    <div>
      <Header />
      <div className="flex">{children}</div>
    </div>
  )
}

export default PageLayout
