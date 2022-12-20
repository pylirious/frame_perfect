import React, {useContext, useEffect, useState} from 'react';
import {Game} from "../types/Game";
import {SpeedrunWithUserNameAndApproval} from "../types/Speedrun"
import axios, {AxiosResponse} from "axios";
import {GamesAPI, SpeedRunsAPI} from "../types/Api";
import MessageContext from "../components/context/MessageContext";
import {InformationCircleIcon, XCircleIcon} from "@heroicons/react/24/outline";
import ms from "ms";
import Link from "next/link";
import {Switch} from "@headlessui/react";
import {classNames} from "../utils";
import Head from "next/head";

function Games() {
    const {setMessage} = useContext(MessageContext);
    const [runs, setRuns] = useState<SpeedrunWithUserNameAndApproval[]>([]);
    const [games, setGames] = useState<Game[]>([]);
    const [onlyVerified, setOnlyVerified] = useState(false);
    useEffect(() => {
        axios.get("/api/speedruns").then((res: AxiosResponse<SpeedRunsAPI>) => {
            if (!res.data.speedRuns)
                setMessage({
                    title: "Info",
                    icon: <InformationCircleIcon className={"w-8 h-8 text-blue-500"}/>,
                    description: "No speed-runs found yet. Be the first to submit a run!"
                })
            else
                setRuns(res.data.speedRuns)
        }).catch(e => {
            setMessage({
                title: "Error",
                icon: <XCircleIcon className={"w-8 h-8 text-red-500"}/>,
                description: e.response.data.message
            })
        })
        axios.get("/api/games").then((res: AxiosResponse<GamesAPI>) => {
            if (!res.data.games)
                setMessage({
                    title: "Info",
                    icon: <InformationCircleIcon className={"w-8 h-8 text-blue-500"}/>,
                    description: "No speed-runs found yet. Be the first to submit a run!"
                })
            else
                setGames(res.data.games)
        }).catch(e => {
            setMessage({
                title: "Error",
                icon: <XCircleIcon className={"w-8 h-8 text-red-500"}/>,
                description: e.response.data.message
            })
        })
    }, [])
    return (
        <>
            <Head>
                <title>Speedruns</title>
            </Head>
            <div className="m-5 bg-white shadow px-4 py-24 sm:rounded-lg sm:p-10 sm:m-20">
                <div className={"flex flex-row"}>

                    <h1 className={"text-2xl"}>Speedruns</h1>
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
                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Nickname
                                        </th>
                                        <th scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Time
                                        </th>
                                        <th scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Frame-Perfect Name
                                        </th>
                                        <th scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Game
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                    {(onlyVerified ? runs.filter(r => r.Approval.length !== 0) : runs).map((run) => (
                                        <tr key={run.id.toString()}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {run.name}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{ms(run.time)}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{run.user.name}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{games.find(g => g.identifier === run.gameId)?.name}</td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <Link href={`/speedrun/${run.id.toString()}`}
                                                      className="text-indigo-600 hover:text-indigo-900">
                                                    View Run<span className="sr-only">,{run.name}</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Games;
