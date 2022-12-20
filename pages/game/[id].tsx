import React, {useContext, useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {Game} from "../../types/Game";
import {ClockIcon, InformationCircleIcon, XCircleIcon} from '@heroicons/react/24/outline';
import MessageContext from "../../components/context/MessageContext";
import {UserIcon} from "@heroicons/react/20/solid";
import CreationModal from "../../components/CreationModal";
import axios, {AxiosResponse} from "axios";
import ms from 'ms'
import Link from "next/link";
import {GameId} from "../../types/Api";
import {Switch} from "@headlessui/react";
import {classNames} from "../../utils";
import Head from "next/head";
import {useSession} from "next-auth/react";

function GameView() {
    const router = useRouter()
    const {id} = router.query;
    const [game, setGame] = useState<Game>();
    const [open, setOpen] = useState(false);
    const [onlyVerified, setOnlyVerified] = useState(false);
    const {data: session} = useSession()
    const {setMessage} = useContext(MessageContext);
    /*
    Once the router is loaded/ready the data of the game is fetchted
     */
    useEffect(() => {
        if (!router.isReady) return;
        axios.get(`/api/game/${id}`).then((res: AxiosResponse<GameId>) => {
            if (!res.data.game)
                return setMessage({
                    title: "Info",
                    icon: <InformationCircleIcon className={"w-8 h-8 text-blue-500"}/>,
                    description: "No speed-runs found for the game"
                })
            setGame(res.data.game)
        }).catch(e => {
            setMessage({
                title: "Error",
                icon: <XCircleIcon className={"w-8 h-8 text-red-500"}/>,
                description: e.response.data.message
            })
        })
    }, [router.isReady, id, setMessage])

    return (
        game ?
            <>
                <Head>
                    <title>{game.name}</title>
                </Head>
                <CreationModal open={open} setOpen={setOpen} game={game}/>
                <div className="bg-gray-700 h-[100vh]">
                    <div className="p-20">
                        <div className="border-b rounded-md border-blue-500 bg-blue-400 px-4 py-5 sm:px-6">
                            <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                                <div className="ml-4 mt-2 flex flex-row">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">{game.name}</h3>
                                    <Switch.Group as="div" className="flex items-center ml-5">
                                        <Switch
                                            checked={onlyVerified}
                                            onChange={setOnlyVerified}
                                            className={classNames(
                                                onlyVerified ? 'bg-indigo-600' : 'bg-gray-200',
                                                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                                            )}
                                        >
                                        <span
                                            aria-hidden="true"
                                            className={classNames(
                                                onlyVerified ? 'translate-x-5' : 'translate-x-0',
                                                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                            )}
                                        />
                                        </Switch>
                                        <Switch.Label as="span" className="ml-3">
                                            <span
                                                className="text-sm font-medium text-gray-900">Only show verified runs</span>
                                        </Switch.Label>
                                    </Switch.Group>
                                </div>
                                {session && session.user && <div className="ml-4 mt-2 flex-shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => setOpen(true)}
                                        className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >New Speedrun
                                    </button>
                                </div>}
                            </div>
                            <div className="mt-5">
                                <div className="overflow-hidden bg-white shadow sm:rounded-md">
                                    <ul role="list" className="divide-y divide-gray-200">
                                        {(onlyVerified ? game.Speedrun.filter(r => r.Approval.length !== 0) : game.Speedrun)?.map((speedRun) => (
                                            <li key={speedRun.id.toString()}>
                                                <Link href={`/speedrun/${speedRun.id.toString()}`}
                                                      className="block hover:bg-gray-50">
                                                    <div className="px-4 py-4 sm:px-6">
                                                        <div className="flex items-center justify-between">
                                                            <p className="truncate text-sm font-medium text-indigo-600">{speedRun.name}</p>
                                                            <div className="ml-2 flex flex-shrink-0">
                                                                <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                                    {game.name}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="mt-2 sm:flex sm:justify-between">
                                                            <div className="sm:flex">
                                                                <p className="flex items-center text-sm text-gray-500">
                                                                    <ClockIcon
                                                                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                                                        aria-hidden="true"/>
                                                                    {ms(speedRun.time)}
                                                                </p>
                                                                <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                                                    <UserIcon
                                                                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                                                        aria-hidden="true"/>
                                                                    {speedRun.name}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            :

            <div role="status" className="max-w-sm animate-pulse">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                <span className="sr-only">Loading...</span>
            </div>

    );
}

export default GameView;
