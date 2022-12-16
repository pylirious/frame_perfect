import React, {useContext, useEffect, useState} from 'react';
import {WithId} from "mongodb";
import {Game} from "../types/Game";
import {Speedrun} from "../types/Speedrun";
import axios, {AxiosResponse} from "axios";
import {SpeedRunsAPI} from "../types/Api";
import MessageContext from "../components/context/MessageContext";
import {XCircleIcon} from "@heroicons/react/24/outline";

function Games() {
    const {setMessage} = useContext(MessageContext);
    const [games, setGames] = useState<WithId<Speedrun>[]>([]);
    useEffect(()=>{
        axios.get("/api/speedruns").then((res:AxiosResponse<SpeedRunsAPI>)=>{
            setGames(res.data.speedRuns)
        }).catch(e => {
            setMessage({
                title: "Error",
                icon: <XCircleIcon className={"w-8 h-8 text-red-500"}/>,
                description: e.response.data.message
            })
        })
    },[])
    return (
        <div>
            {JSON.stringify(games)}
        </div>
    );
}

export default Games;