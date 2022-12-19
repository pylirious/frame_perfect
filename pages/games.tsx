import React, {useContext, useEffect, useState} from 'react';
import {Game} from "../types/Game";
import axios, {AxiosResponse} from "axios";
import {GamesAPI} from "../types/Api";
import {InformationCircleIcon} from "@heroicons/react/24/outline";
import MessageContext from "../components/context/MessageContext";
import Link from "next/link";

function Games() {
    const [games, setGames] = useState<Game[]>([]);
    const {setMessage} = useContext(MessageContext);
    useEffect(() => {
        axios.get("/api/games").then((res: AxiosResponse<GamesAPI>) => {
            if (!res.data.games)
                setMessage({
                    title: "Info",
                    icon: <InformationCircleIcon className={"w-8 h-8 text-blue-500"}/>,
                    description: "No games found. Please contact an administrator."
                })
            else
                setGames(res.data.games)
        })
    }, [setMessage])
    return (
        <div className="m-5 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-10 sm:m-20">
            <h3 className="text-2xl font-medium leading-6 text-gray-900">Games</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Select a game below</p>
            <ul role="list" className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grow">
                {games.map((game) => (
                    <li
                        key={game.identifier}
                        className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
                    >
                        <Link href={`/game/${game.id}`}>
                            <div className="flex flex-1 flex-col p-8">
                                <img className="mx-auto h-32 w-32 flex-shrink-0 rounded-md"
                                     src={game.image ? game.image : undefined} alt=""/>
                                <h3 className="mt-6 text-sm font-medium text-gray-900">{game.name}</h3>

                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Games;
