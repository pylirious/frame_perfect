import React, {useContext, useEffect, useState} from 'react';
import {WithId} from "mongodb";
import {Speedrun} from "../../types/Speedrun";
import {useRouter} from "next/router";
import axios, {AxiosResponse} from "axios";
import {SpeedrunId} from "../../types/Api";
import {XCircleIcon} from "@heroicons/react/24/outline";
import MessageContext from "../../components/context/MessageContext";

function Speedrun() {
    const [run, setRun] = useState<WithId<Speedrun>>();
    const router = useRouter()
    const {setMessage} = useContext(MessageContext);
    useEffect(() => {
        if (!router.isReady) return;
        axios.get(`/api/speedrun/${router.query.id}`).then((res: AxiosResponse<SpeedrunId>) => {
            setRun(res.data.speedRun)
        }).catch(e => {
            setMessage({
                title: "Error",
                icon: <XCircleIcon className={"w-8 h-8 text-red-500"}/>,
                description: e.response.data.message
            })
        })

    }, [router.isReady, router.query.id, setMessage])
    return (
        <div>{JSON.stringify(run)}</div>
    );
}

export default Speedrun;
