import React, {useContext, useState} from 'react';
import {Game} from "../types/Game";
import MessageContext from "../components/context/MessageContext";
import Head from "next/head";
import {useSession} from "next-auth/react";
import axios from "axios";
import {CheckCircleIcon} from "@heroicons/react/24/outline";

function Games() {
    const [games, setGames] = useState<Game[]>([]);
    const {setMessage} = useContext(MessageContext);
    const {data: session} = useSession()
    return (
        <>
            <Head>
                <title>Secret Admin Panel</title>
            </Head>
            <div className="m-5 bg-gray-300 shadow px-4 mt-24 py-5 sm:rounded-lg sm:p-10 sm:m-20">
                <h3 className="text-2xl font-medium leading-6 text-gray-900">Secret Admin Panel to change your role</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">This would not be included in a real app and is only
                    for demonstration.</p>
                <p>You are currently {session?.user.role}</p>
                <div className={"mt-5"}>
                    <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
                        onClick={() => {
                            axios.post("/api/secret", {role: "Moderator"}).then(res => {
                                setMessage({
                                    description: res.data.message,
                                    icon: <CheckCircleIcon className={"w-8 h-8 text-green-500"}/>,
                                    title: "Success"
                                })
                            })
                        }
                        }
                    >Make me a Moderator
                    </button>
                    <button
                        type="button"
                        className="mt-5 inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => {
                            axios.post("/api/secret", {role: "Runner"}).then(res => {
                                setMessage({
                                    description: res.data.message,
                                    icon: <CheckCircleIcon className={"w-8 h-8 text-green-500"}/>,
                                    title: "Success"
                                })
                            })
                        }
                        }
                    >Make me a normal User (Runner)
                    </button>
                </div>
            </div>
        </>
    );
}

export default Games;
