import {Dispatch, Fragment, SetStateAction, useContext, useEffect, useRef, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {CheckCircleIcon, PlusCircleIcon, XCircleIcon} from '@heroicons/react/24/outline'
import axios from "axios";
import {WithId} from "mongodb";
import {Game} from "../types/Game";
import {classNames} from "../utils";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/20/solid";
import {Combobox} from '@headlessui/react'
import MessageContext from "./context/MessageContext";
import {useRouter} from "next/router";


interface PropTypes {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    game?: Game
}


export default function CreationModal(props: PropTypes) {
    const cancelButtonRef = useRef(null)
    const [games, setGames] = useState<Game[]>([]);
    const [time, setTime] = useState<number>();
    const [nickname, setNickname] = useState("");
    const [link, setLink] = useState("");
    const [query, setQuery] = useState('')
    const [game, setGame] = useState<Game | undefined>(props.game);

    const {setMessage} = useContext(MessageContext);
    const router = useRouter()
    const filteredGames =
        query === ''
            ? games
            : games.filter((game) => {
                return game.name.toLowerCase().includes(query.toLowerCase())
            })

    useEffect(() => {
        if (props.game) return;
        axios.get("/api/games").then(res => setGames(res.data.games))
    }, []);

    return (
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={props.setOpen}>
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
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
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
                                        className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <PlusCircleIcon className="h-12 w-12 text-green-600" aria-hidden="true"/>
                                    </div>
                                    <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">Create
                                            a new Speedrun</Dialog.Title>
                                        <div className="mt-2">
                                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                                <div className="sm:col-span-3">
                                                    <label htmlFor="name"
                                                           className="block text-sm font-medium text-gray-700">Nickname</label>
                                                    <div className="mt-1">
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            id="name"
                                                            autoComplete="nickname"
                                                            value={nickname}
                                                            onInput={event => setNickname(event.currentTarget.value)}
                                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label htmlFor="last-name"
                                                           className="block text-sm font-medium text-gray-700">
                                                        Time (in ms)
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            type="number"
                                                            name="time"
                                                            id="time"
                                                            value={time}
                                                            onInput={event => setTime(parseInt(event.currentTarget.value))}
                                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-4">
                                                    <div className="mt-1">
                                                        {props.game ?
                                                            <div>
                                                                <label htmlFor="street-address"
                                                                       className="block text-sm font-medium text-gray-700">Game</label>
                                                                <div className="mt-1">
                                                                    <input
                                                                        type="text"
                                                                        name="game"
                                                                        disabled={true}
                                                                        id="game"
                                                                        value={props.game.name}
                                                                        className="block bg-gray-100 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                                    />
                                                                </div>
                                                            </div>
                                                            :
                                                            <Combobox as="div" value={game} onChange={setGame}>
                                                                <Combobox.Label
                                                                    className="block text-sm font-medium text-gray-700">Game</Combobox.Label>
                                                                <div className="relative mt-1">
                                                                    <Combobox.Input
                                                                        className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                                                        onChange={(event) => setQuery(event.target.value)}
                                                                        displayValue={(game: WithId<Game>) => game?.name}
                                                                    />
                                                                    <Combobox.Button
                                                                        className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                                                        <ChevronUpDownIcon
                                                                            className="h-5 w-5 text-gray-400"
                                                                            aria-hidden="true"/>
                                                                    </Combobox.Button>

                                                                    {filteredGames.length > 0 && (
                                                                        <Combobox.Options
                                                                            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                                            {filteredGames.map((person) => (
                                                                                <Combobox.Option
                                                                                    key={person.id}
                                                                                    value={person}
                                                                                    className={({active}) =>
                                                                                        classNames(
                                                                                            'relative cursor-default select-none py-2 pl-3 pr-9',
                                                                                            active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    {({active, selected}) => (
                                                                                        <>
                                                                                        <span
                                                                                            className={classNames('block truncate', selected && 'font-semibold')}>{person.name}</span>

                                                                                            {selected && (
                                                                                                <span
                                                                                                    className={classNames(
                                                                                                        'absolute inset-y-0 right-0 flex items-center pr-4',
                                                                                                        active ? 'text-white' : 'text-indigo-600'
                                                                                                    )}
                                                                                                >
                        <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                      </span>
                                                                                            )}
                                                                                        </>
                                                                                    )}
                                                                                </Combobox.Option>
                                                                            ))}
                                                                        </Combobox.Options>
                                                                    )}
                                                                </div>
                                                            </Combobox>}
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-6">
                                                    <label htmlFor="street-address"
                                                           className="block text-sm font-medium text-gray-700">YouTube
                                                        Link</label>
                                                    <div className="mt-1">
                                                        <input
                                                            type="url"
                                                            name="link"
                                                            id="link"
                                                            onInput={event => setLink(event.currentTarget.value)}
                                                            value={link}
                                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        />
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => {
                                            axios.post("/api/speedrun/create", {
                                                game: game?.identifier,
                                                time: time,
                                                name: nickname,
                                                link: link,
                                            }).then((r) => {
                                                setMessage({description:r.data.message, icon: <CheckCircleIcon className={"w-8 h-8 text-green-500"}/>, title:"Success"})
                                            }).catch(e => {
                                                setMessage({description:e.response.data.message, icon: <XCircleIcon className={"w-8 h-8 text-red-500"}/>, title:"Error"})
                                            })
                                            props.setOpen(false)
                                        }}
                                    >
                                        Create
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                                        onClick={() => props.setOpen(false)}
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
    )
}
