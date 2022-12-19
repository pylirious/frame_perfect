import React, {useEffect, useState} from 'react';
import {User} from "@prisma/client";
import axios, {AxiosResponse} from "axios";
import {UsersApi} from "../../types/Api";
import {Combobox} from "@headlessui/react";
import {WithId} from "mongodb";
import {Game} from "../../types/Game";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/20/solid";
import {classNames} from "../../utils";
import {XCircleIcon} from "@heroicons/react/24/outline";

function Notifications() {
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User>();
    const [query, setQuery] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const filteredUsers =
        query === ''
            ? users
            : users.filter((user) => {
                return user.name?.toLowerCase().includes(query.toLowerCase())
            })

    useEffect(() => {
        axios.get("/api/users").then((res: AxiosResponse<UsersApi>) => {
            if (!res.data.users) return;
            setUsers(res.data.users)
        })
    }, [])
    return (
        <div>
            <div className="mt-2">
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="title"
                               className="block text-sm font-medium text-gray-700">Title</label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={title}
                                onInput={event => setTitle(event.currentTarget.value)}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="description"
                               className="block text-sm font-medium text-gray-700">Description</label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="description"
                                id="description"
                                value={description}
                                onInput={event => setDescription(event.currentTarget.value)}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-4">
                        <div className="mt-1">
                            <Combobox as="div" value={user} onChange={setUser}>
                                <Combobox.Label
                                    className="block text-sm font-medium text-gray-700">User</Combobox.Label>
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

                                    {filteredUsers.length > 0 && (
                                        <Combobox.Options
                                            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {filteredUsers.map((person) => (
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
                            </Combobox>
                        </div>
                    </div>

                </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                        if (!user)
                            return console.log("no user");
                        axios.post("/api/notification/create", {
                            userId: user.id,
                            title,
                            description
                        }).then((r) => {
                            console.log(r.data);
                            /*setMessage({
                                description: r.data.message,
                                icon: <CheckCircleIcon className={"w-8 h-8 text-green-500"}/>,
                                title: "Success"
                            })*/
                        }).catch(e => {
                            console.log(e);
                            /*setMessage({
                                description: e.response.data.message,
                                icon: <XCircleIcon className={"w-8 h-8 text-red-500"}/>,
                                title: "Error"
                            })*/
                        })
                    }}
                >
                    Create
                </button>
            </div>
        </div>
    )
        ;
}

export default Notifications;