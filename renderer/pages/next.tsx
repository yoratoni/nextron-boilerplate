import Head from "next/head";
import Link from "next/link";
import React, { Fragment } from "react";


export default function NextPage() {
    return (
        <Fragment>
            <Head>
                <title>Next - Nextron (basic-lang-typescript)</title>
            </Head>
            <div>
                <p>
                    ⚡ Electron + Next.js ⚡ -
                    <Link href="/home">
                        <a>Go to home page</a>
                    </Link>
                </p>
            </div>
        </Fragment>
    );
}
