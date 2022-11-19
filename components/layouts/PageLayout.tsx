import React, { FC, useEffect } from "react"
import { useRouter } from "next/router"
import Header from "../Header"

type PageLayoutProps = {
  fetching?: boolean
  title?: string
  isProtected?: boolean
  children?: React.ReactNode
  containerClassName?: string
}

const PageLayout: FC<PageLayoutProps> = ({
  isProtected,
  children,
  containerClassName,
}) => {
  const router = useRouter()
  useEffect(() => {
    if (isProtected) {
      router.push("/")
    }
  }, [isProtected, router])

  return (
    <div className={containerClassName || ""}>
      <Header />
      <div className="flex">{children}</div>
    </div>
  )
}

export default PageLayout
