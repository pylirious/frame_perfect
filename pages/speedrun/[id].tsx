import React, {useContext, useEffect, useState} from 'react';
import {WithId} from "mongodb";
import {Speedrun} from "../../types/Speedrun";
import {useRouter} from "next/router";
import axios, {AxiosResponse} from "axios";
import {GameId, SpeedrunId} from "../../types/Api";
import {XCircleIcon} from "@heroicons/react/24/outline";
import MessageContext from "../../components/context/MessageContext";
import {PaperClipIcon} from '@heroicons/react/20/solid';
import {Game} from "../../types/Game";
import ms from "ms";

function Speedrun() {
    const [run, setRun] = useState<WithId<Speedrun>>();
    const [game, setGame] = useState<WithId<Game>>();
    const router = useRouter()
    const {setMessage} = useContext(MessageContext);
    useEffect(() => {
        if (!router.isReady) return;
        axios.get(`/api/speedrun/${router.query.id}`).then((res: AxiosResponse<SpeedrunId>) => {
            setRun(res.data.speedRun)
            axios.get(`/api/game/${res.data.speedRun?.game.toString()}`).then((res: AxiosResponse<GameId>) => {
                setGame(res.data.game)
            }).catch(e => {
                setMessage({
                    title: "Error",
                    icon: <XCircleIcon className={"w-8 h-8 text-red-500"}/>,
                    description: e.response.data.message
                })
            })
        }).catch(e => {
            setMessage({
                title: "Error",
                icon: <XCircleIcon className={"w-8 h-8 text-red-500"}/>,
                description: e.response.data.message
            })
        })

    }, [router.isReady, router.query.id, setMessage])
    return (
        run ?
            <div className="m-5 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-10 sm:m-20">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Speedrun Details</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Nickname</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{run.name}</dd>
                        </div>
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Game</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{game?.name}</dd>
                        </div>
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Time</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{ms(run.time)} -
                                ({run.time} ms)
                            </dd>
                        </div>

                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Video of the run</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <iframe width="560" height="315" src={`https://www.youtube.com/embed/${run?.link.split('=')[1]}`}
                                        title="YouTube video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen></iframe>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div> : <div></div>
    );
}

export default Speedrun;
