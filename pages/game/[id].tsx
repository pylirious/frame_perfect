import React, {useState} from 'react';
import {useRouter} from "next/router";
import {Game} from "../../models/Game";
import {minify} from "next/dist/build/swc";
import {CalendarIcon, ClockIcon, MapPinIcon, UsersIcon} from '@heroicons/react/24/outline';
import {Speedrun} from "../../models/Speedrun";

function

GameView() {
    const router = useRouter()
    const {id} = router.query;
    const [game, setGame] = useState<Game | undefined>({
        id: "minecraft",
        name: "Minecraft",
        image: "https://www.minecraft.net/content/dam/games/minecraft/logos/logo-minecraft.svg"
    });
    const [records, setRecords] = useState<Speedrun[] | undefined>([{
        game: {
            id: "minecraft",
            name: "Minecraft",
            image: "https://www.minecraft.net/content/dam/games/minecraft/logos/logo-minecraft.svg"
        }, time: 143646234, id: "tesdlfk", name: "Felix"
    }, {
        game: {
            id: "minecraft",
            name: "Minecraft",
            image: "https://www.minecraft.net/content/dam/games/minecraft/logos/logo-minecraft.svg"
        }, time: 143646234, id: "tesdlfk", name: "Felix"
    }]);

    return (
        game ?
            <div className="bg-gray-700">
                <div className="p-20">
                    <div className="border-b rounded-md border-blue-500 bg-blue-400 px-4 py-5 sm:px-6">
                        <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                            <div className="ml-4 mt-2">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">{game.name}</h3>
                            </div>
                            <div className="ml-4 mt-2 flex-shrink-0">
                                <button
                                    type="button"
                                    className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >New Speedrun
                                </button>
                            </div>
                        </div>
                        <div className="mt-5">
                            <div className="overflow-hidden bg-white shadow sm:rounded-md">
                                <ul role="list" className="divide-y divide-gray-200">
                                    {records?.map((position) => (
                                        <li key={position.id}>
                                            <a href="#" className="block hover:bg-gray-50">
                                                <div className="px-4 py-4 sm:px-6">
                                                    <div className="flex items-center justify-between">
                                                        <p className="truncate text-sm font-medium text-indigo-600">{position.name}</p>
                                                        <div className="ml-2 flex flex-shrink-0">
                                                            <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                                {position.game.name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 sm:flex sm:justify-between">
                                                        <div className="sm:flex">
                                                            <p className="flex items-center text-sm text-gray-500">
                                                                <ClockIcon
                                                                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                                                    aria-hidden="true"/>
                                                                {position.time}
                                                            </p>
                                                            <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                                                <MapPinIcon
                                                                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                                                    aria-hidden="true"/>
                                                                {position.id}
                                                            </p>
                                                        </div>

                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div> :

            <div role="status" className="max-w-sm animate-pulse">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                <span className="sr-only">Loading...</span>
            </div>

    );
}

export default GameView;
