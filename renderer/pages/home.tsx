import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";


export default function HomePage() {
    const [message, setMessage] = useState("No message found");

    useEffect(() => {
        window.ipc.on("message", (message: unknown) => {
            setMessage(message as string);
        });
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>Home - Nextron (basic-lang-typescript)</title>
            </Head>
            <div>
                <p className="text-3xl">
                    ⚡ Electron + Next.js ⚡ -
                    <Link href="/next">
                        <a>Go to next page</a>
                    </Link>
                </p>
                <Image
                    src="/images/logo.png"
                    alt="Logo image"
                    width="256px"
                    height="256px"
                />
            </div>
            <div>
                <button
                    onClick={() => {
                        window.ipc.send("message", "Hello");
                    }}
                >
                    Test IPC
                </button>
                <p>{message}</p>
            </div>
        </React.Fragment>
    );
}
