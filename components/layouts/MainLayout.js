import Head from "next/head"
import React from 'react'

export const MainLayout = ({children, title}) => {
  return (
    <>
        <Head>
            <title>{title}</title>
        </Head>
        <main>
            {children}
        </main>
    </>
  )
}
