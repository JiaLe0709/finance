import React from "react";
import Head from "next/head";

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>Stock Tracker</title>
                <meta name='theme-color' content='#0C0A09' />
                <meta name="robots" content="follow, index" />
                <meta name="keywords" content="finance, stock, stock price, jiale, jiale0709" />
                <link rel='icon' href='/favicon.ico' />
                <link rel="manifest" href="/manifest.json" />
            </Head>
            <div className={`flex flex-col min-h-screen justify-between space-y-4 container`}>
                {children}
            </div>
        </>
    )
}

export default Layout;