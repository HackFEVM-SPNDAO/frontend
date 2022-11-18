import React, { FC } from "react"
import Head from "next/head"
import ErrorBoundary from "../ErrorBoundary"

type MainLayoutProps = {} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <Head>
        <title>ZP DAO</title>
        <meta name="description" content="ZP DAO - Protect your data and earn!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ErrorBoundary>{children}</ErrorBoundary>
    </div>
  )
}

export default MainLayout
