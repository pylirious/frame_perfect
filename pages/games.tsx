import React, {useContext, useEffect, useState} from 'react';
import {WithId} from "mongodb";
import {Game} from "../types/Game";
import axios, {AxiosResponse} from "axios";
import {GamesAPI} from "../types/Api";
import {InformationCircleIcon} from "@heroicons/react/24/outline";
import MessageContext from "../components/context/MessageContext";

function Games() {
    const [games, setGames] = useState<WithId<Game>[]>([]);
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
        <div>
            {JSON.stringify(games)}
        </div>
    );
}

export default Games;
