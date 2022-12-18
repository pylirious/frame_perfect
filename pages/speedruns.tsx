import React, {useContext, useEffect, useState} from 'react';
import {ObjectId, WithId} from "mongodb";
import {Game} from "../types/Game";
import {Speedrun} from "../types/Speedrun"
import axios, {AxiosResponse} from "axios";
import {GamesAPI, SpeedRunsAPI} from "../types/Api";
import MessageContext from "../components/context/MessageContext";
import {InformationCircleIcon, XCircleIcon} from "@heroicons/react/24/outline";
import ms from "ms";
import Link from "next/link";

function Games() {
    const {setMessage} = useContext(MessageContext);
    const [runs, setRuns] = useState<Speedrun[]>([]);
    const [games, setGames] = useState<Game[]>([]);
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
        <div className="m-5 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-10 sm:m-20">
            <h1 className={"text-2xl"}>Speedruns</h1>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Name
                                    </th>
                                    <th scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Title
                                    </th>
                                    <th scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Email
                                    </th>
                                    <th scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Role
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {runs.map((run:Speedrun) => (
                                    <tr key={run.id.toString()}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            {run.name}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{ms(run.time)}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{run.user.name}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{games.find(g => g.identifier === run.gameId)?.name}</td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <Link href={`/speedrun/${run.id.toString()}`} className="text-indigo-600 hover:text-indigo-900">
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
    );
}

export default Games;
