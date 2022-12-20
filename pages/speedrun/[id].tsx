import React, {Fragment, useContext, useEffect, useRef, useState} from 'react';
import {SpeedRunWithUserGameAndApproval} from "../../types/Speedrun";
import {useRouter} from "next/router";
import axios, {AxiosResponse} from "axios";
import {SpeedrunId} from "../../types/Api";
import {
    CheckCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    XCircleIcon
} from "@heroicons/react/24/outline";
import MessageContext from "../../components/context/MessageContext";
import {Game} from "@prisma/client";
import ms from "ms";
import {useSession} from "next-auth/react";
import {Dialog, Transition} from '@headlessui/react'
import {classNames} from "../../utils";
import Head from "next/head";

function Speedrun() {
    const [run, setRun] = useState<SpeedRunWithUserGameAndApproval>();
    const [game, setGame] = useState<Game>();
    const router = useRouter()
    const {setMessage} = useContext(MessageContext);
    const {data: session} = useSession();
    useEffect(() => {
        if (!router.isReady) return;
        axios.get(`/api/speedrun/${router.query.id}`).then((res: AxiosResponse<SpeedrunId>) => {
            setRun(res.data.speedRun)
            setGame(res.data.speedRun?.game)
        }).catch(e => {
            setMessage({
                title: "Error",
                icon: <XCircleIcon className={"w-8 h-8 text-red-500"}/>,
                description: e.response.data.message
            })
        })

    }, [router.isReady, router.query.id, setMessage])
    const [open, setOpen] = useState(false);
    const cancelButtonRef = useRef(null)

    return (
        run ? <>
            <Head>
                <title>{run.name} - {run.game.name}</title>
            </Head>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel
                                    className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                    <div className="sm:flex sm:items-start">
                                        <div
                                            className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ExclamationTriangleIcon className="h-6 w-6 text-red-600"
                                                                     aria-hidden="true"/>
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3"
                                                          className="text-lg font-medium leading-6 text-gray-900">
                                                Delete Speed-Run
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Are you sure you want to delete that speed-run? You will have to
                                                    re-submit it. This is irreversible.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => {
                                                axios.delete(`/api/speedrun/${run.id}`).then(res => {
                                                    setMessage({
                                                        description: res.data.message,
                                                        icon: <InformationCircleIcon
                                                            className={"w-8 h-8 text-blue-500"}/>,
                                                        title: "Information"
                                                    })
                                                    setOpen(false)
                                                    router.back()
                                                })
                                            }}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                                            onClick={() => {
                                                setOpen(false)
                                            }}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <div className="m-5 bg-white shadow px-4 py-24 sm:rounded-lg sm:p-10 sm:m-20">
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
                            <dt className="text-sm font-medium text-gray-500">Verification</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {run.Approval.length ? "Verified" : "Unverified"}
                            </dd>
                        </div>
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Video of the run</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <iframe width="560" height="315"
                                        src={`https://www.youtube.com/embed/${run?.link.split('=')[1]}`}
                                        title="YouTube video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen></iframe>
                            </dd>
                        </div>
                    </dl>
                    <div className={"flex flex-row"}>
                        {session && (session.user.role === "Moderator" || session.user.id === run.userId) && <div>
                            <button
                                type="button"
                                onClick={() => {
                                    setOpen(true)
                                }}
                                className="relative inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >Delete run
                            </button>
                        </div>}
                        {session && session.user.role === "Moderator" && <div>
                            <button
                                type="button"
                                disabled={run.Approval.length !== 0}
                                onClick={() => {
                                    axios.post(`/api/approval/create`, {
                                        speedRunId: run.id,
                                        approvedById: session.user.id,
                                    }).then(res => {
                                        axios.post("/api/notification/create", {
                                            userId: run.userId,
                                            title: "Run verified",
                                            description: `Your run for ${run.game.name} was verified!`
                                        }).then(() =>
                                            setMessage({
                                                description: res.data.message,
                                                icon: <CheckCircleIcon className={"w-8 h-8 text-green-500"}/>,
                                                title: "Success"
                                            }))
                                        router.reload()
                                    })
                                }}
                                className={classNames(run.Approval.length !== 0 ? "ml-5 cursor-not-allowed relative inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" : "ml-5 relative inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2")}
                            >Verify Run
                            </button>
                        </div>}
                    </div>
                </div>
            </div>
        </> : <div></div>
    );
}

export default Speedrun;
