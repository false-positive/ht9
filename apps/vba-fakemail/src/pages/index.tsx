import * as React from "react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

function Logo(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 225.7 232.5"
            {...props}
        >
            <style>
                {
                    ".st2{display:inline;fill:currentColor}.st4,.st5,.st6{fill:none;stroke:#babbbd;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10}.st5,.st6{stroke-dasharray:0,6.005}.st6{stroke-dasharray:0,5.9518}"
                }
            </style>
            <path
                d="M225.1 112.5c-.7-1.9-10.5-20-28.8-42.8-.4-.5-.8-1.2-.8-1.9-2.1-23.7-5.5-39.5-5.5-39.5-.5-2.7-2.9-4.7-5.6-5l-19-2.3h-.5c-2.2 0-4 1.8-4 4v6.6c0 .1-.1.2-.2.2s-.1 0-.2-.1c-11.4-10.2-24.1-20.2-38.3-28.9-2.7-1.8-5.9-2.8-9.3-2.8-3.5 0-6.7 1-9.4 2.8C38 43.2 2 108.9.6 112.5c-.4.8-.6 1.8-.6 2.8 0 3 2.1 5.6 4.9 6.3l18.9 3.6c2.5.7 4.4 2.9 4.7 5.5.2 3.3 3.7 77.7 8.2 96.9.7 2.8 3.3 4.8 6.3 4.8h.1c11-.3 21.1-.5 31.9-.6h.9c1.2 0 2.1-1 2.1-2.1v-.1c-.4-6.5-1.4-21.3-2.2-37 0-.4 0-.9-.1-1.3-.1-1.4-.8-2.5-1.9-3.2-5.7-3.4-9.5-9.4-9.9-16.4-1-26.1-1.5-56.2-.1-79.8.1-2 1.7-3.5 3.7-3.6 2.1 0 3.8 1.6 3.9 3.7v.3c-.9 15.7-1 34.3-.7 52.6 0 2.5 2.1 4.5 4.6 4.4 2.5 0 4.5-2.1 4.4-4.6-.3-18.5-.2-37.2.7-52.9.1-2 1.7-3.5 3.7-3.6 2.1 0 3.8 1.6 3.9 3.7v.3c-.9 15.6-1 34.1-.7 52.3 0 2.5 2.1 4.4 4.6 4.4 2.5 0 4.4-2.1 4.4-4.5-.3-18.4-.2-37 .7-52.7.1-2 1.7-3.5 3.7-3.6 2.1 0 3.8 1.6 3.9 3.7v.3c-1.4 22.9-.9 51.9 0 77.4V170.4c0 7-3.5 13.1-8.8 16.8-1 .7-1.6 1.7-1.7 2.9 0 0-.5 3.9 1.3 22.8.8 8.3 1.4 14 1.7 16.6.1 1 .9 1.7 2 1.7h28.6l10.7.1c1 0 1.9-.8 2-1.8 2.5-22.7 3.1-35.4 3.1-35.4 0-1.1-.9-2-2-2.2l-13-1.8c-2.1-.4-3.3-1.6-3.7-3.2-.3-.9-.2-2-.2-2 5.3-75.6 30.2-101.1 30.2-101.1.7-.7 1.2-1 1.2-1 .7-.5 1.5-.8 2.3-.8 1.7 0 3.1 1.1 3.7 2.5 0 0 .2.5.3 1.8 2.2 23.8 1.1 64.2-.2 95.8-1.1 26.8-2.5 47.8-2.5 47.8 0 .9.7 1.6 1.6 1.6 7.1.1 14 .3 21.4.4h.1c3 0 5.5-2 6.3-4.8 4.5-19.3 8-93.6 8.2-96.9.3-2.6 2.2-4.8 4.7-5.5l18.9-3.6c2.8-.7 4.9-3.3 4.9-6.3 0-.5-.2-1.4-.6-2.3z"
                fill="currentColor"
                id="Layer_1"
            />
        </svg>
    );
}

const Home: NextPage = () => {
    const hello = api.example.hello.useQuery({ text: "from tRPC" });

    return (
        <>
            <Head>
                <title>Вход във ВБА Поща</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex min-h-screen flex-col items-center justify-center">
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
                    <Logo className="w-1/2 max-w-xs rotate-180 text-green-600" />
                    <h1 className="text-center text-5xl font-bold tracking-tight sm:text-6xl">
                        Вход във <span className="text-green-600">ВБА</span>{" "}
                        Поща
                    </h1>
                    <form className="grid grid-cols-1 gap-4 md:gap-8">
                        <input
                            value={"testing"}
                            className="border-2 border-gray-300 p-3 outline-green-600"
                            type="text"
                            readOnly
                        />
                        <input
                            value={"testing"}
                            type="password"
                            className="border-2 border-gray-300 p-3 outline-green-600"
                            readOnly
                        />
                        <button className="bg-green-600 p-3 text-lg font-bold text-white transition-colors hover:bg-green-500">
                            Вход
                        </button>
                    </form>
                    <p className="text-2xl text-white">
                        {hello.data
                            ? hello.data.greeting
                            : "Loading tRPC query..."}
                    </p>
                </div>
            </main>
        </>
    );
};

export default Home;
