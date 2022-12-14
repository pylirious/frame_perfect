import React, {useEffect, useState} from 'react';
import {WithId} from "mongodb";
import {Game} from "../types/Game";

function Games() {
    const [games, setGames] = useState<WithId<Game>[]>([]);
    useEffect(()=>{
        fetch("/api/games").then(r=>r.json().then(res=>{
            setGames(res)
        }))
    },[])
    return (
        <div>
            {JSON.stringify(games)}
        </div>
    );
}

export default Games;
