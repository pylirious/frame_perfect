import {Fragment, useEffect, useState} from 'react'
import {Disclosure, Menu, Popover, Transition} from '@headlessui/react'
import {Bars3Icon, BellIcon, XMarkIcon} from '@heroicons/react/24/outline'
import {EyeIcon, PlusIcon} from '@heroicons/react/20/solid'
import {signIn, useSession} from "next-auth/react";
import CreationModal from "./CreationModal";
import Link from "next/link";
import {useRouter} from "next/router";
import axios from "axios";
import {classNames} from "../utils";
import {Notification} from "@prisma/client";
import Image from "next/image";

const userNavigation = [{name: 'Your Profile', href: '/profile'}, {name: 'Settings', href: '#'}, {
    name: 'Sign out', href: '/logout'
},]


export default function Navbar() {
    const router = useRouter()
    const navigation = [{name: 'Home', href: '/', current: router.pathname === "/"}, {
        name: 'Records', href: '/speedruns', current: router.pathname.startsWith("/speedruns")
    }, {
        name: 'Games', href: '/games', current: router.pathname.startsWith("/games")
    },]

    const {data: session} = useSession()
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    useEffect(() => {
        if (session?.user) axios.get('/api/notification').then(res => {
            setNotifications(res.data.notifications)
        })
    }, [router.pathname, router.isReady])

    return <div>
        <CreationModal open={open} setOpen={setOpen}/>
        <Disclosure as="nav" className="bg-gray-800">
            {({open}) => <>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="-ml-2 mr-2 flex items-center md:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button
                                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true"/> :
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-shrink-0 items-center">
                                <img
                                    className="block h-8 w-auto lg:hidden"
                                    src="/logo.png"
                                    alt="Your Company"
                                />
                                <img
                                    className="hidden h-8 w-auto lg:block"
                                    src="/logo.png"
                                    alt="Your Company"
                                />
                            </div>
                            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                                {navigation.map((item) => <Link
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium')}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Link>)}
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <button
                                    type="button"
                                    onClick={() => setOpen(true)}
                                    className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true"/>
                                    <span>New Speedrun</span>
                                </button>
                            </div>
                            <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                                <Popover className="relative">
                                    {({open}) => <>
                                        <Popover.Button
                                            className={classNames(open ? 'text-gray-900' : 'text-gray-500', 'group inline-flex items-center rounded-md text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2')}
                                        >
                                                        <span
                                                            className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                                        >
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon className="h-6 w-6 pt-1" aria-hidden="true"/>
                                                            {notifications.some(e => !e.read) &&
                                                                <svg className="mr-1.5 h-2 w-2 text-red-500 absolute"
                                                                     fill="currentColor" viewBox="0 0 8 8">
                                                                    <circle
                                                                        cx={4} cy={4} r={3}/>
                                                                </svg>}
                                        </span>

                                        </Popover.Button>

                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="opacity-0 translate-y-1"
                                            enterTo="opacity-100 translate-y-0"
                                            leave="transition ease-in duration-150"
                                            leaveFrom="opacity-100 translate-y-0"
                                            leaveTo="opacity-0 translate-y-1"
                                        >
                                            <Popover.Panel
                                                className="absolute left-1/2 z-10 mt-3 w-screen max-w-xs -translate-x-1/2 transform px-2 sm:px-0">
                                                <div
                                                    className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                                    <div
                                                        className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                                        {notifications.length ? notifications.map((item) => <div
                                                            key={item.id}
                                                            className="-m-3 block rounded-md p-3 transition duration-150 ease-in-out hover:bg-gray-50 flex flex-row justify-between"
                                                        >
                                                            <div>

                                                                <p className={classNames(item.read && "line-through", "text-base font-medium text-gray-900")}>{item.title}</p>
                                                                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                                            </div>
                                                            <div>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        axios.post(`/api/notification/read`, {id: item.id}).then(res => {
                                                                            setNotifications(res.data.notifications)
                                                                        })
                                                                    }}
                                                                    className="flex flex-row p-1 text-gray-800 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                                                >
                                                                    {!item.read && (<><EyeIcon className="h-6 w-6"
                                                                                               aria-hidden="true"/>
                                                                        <span className="ml-1">Mark as read</span></>)}
                                                                </button>
                                                            </div>
                                                        </div>) : <p
                                                            className="-m-3 block rounded-md p-3 transition duration-150 ease-in-out hover:bg-gray-50"
                                                        >
                                                            <p className="text-base font-medium text-gray-900">No
                                                                notification</p>
                                                            <p className="mt-1 text-sm text-gray-500">Check back later
                                                                for new Notifications</p>
                                                        </p>}
                                                    </div>
                                                </div>
                                            </Popover.Panel>
                                        </Transition>
                                    </>}
                                </Popover>


                                {/* Profile dropdown */}
                                {session && session.user ? <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button
                                            className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="sr-only">Open user menu</span>
                                            <img className="h-8 w-8 rounded-full"
                                                 src={session.user.image || "user.png"}
                                                 alt=""/>
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items
                                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {userNavigation.map((item) => <Menu.Item key={item.name}>
                                                {({active}) => <Link
                                                    href={item.href}
                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    {item.name}
                                                </Link>}
                                            </Menu.Item>)}
                                        </Menu.Items>
                                    </Transition>
                                </Menu> : <button
                                    onClick={() => signIn()}
                                    className={'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'}
                                >
                                    {"Login"}
                                </button>}
                            </div>
                        </div>
                    </div>
                </div>

                <Disclosure.Panel className="md:hidden">
                    <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                        {navigation.map((item) => <Disclosure.Button
                            key={item.name}
                            as={Link}
                            href={item.href}
                            className={classNames(item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium')}
                            aria-current={item.current ? 'page' : undefined}
                        >
                            {item.name}
                        </Disclosure.Button>)}
                    </div>
                    {session && session.user ? <div className="border-t border-gray-700 pt-4 pb-3">
                        <div className="flex items-center px-5 sm:px-6">
                            <div className="flex-shrink-0">
                                <img className="h-10 w-10 rounded-full"
                                     src={session.user.image || "user.png"} alt=""/>
                            </div>
                            <div className="ml-3">
                                <div className="text-base font-medium text-white">{session.user.name}</div>
                                <div
                                    className="text-sm font-medium text-gray-400">{session.user.email}</div>
                            </div>
                            <button
                                type="button"
                                className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                <span className="sr-only">View notifications</span>
                                <BellIcon className="h-6 w-6" aria-hidden="true"/>
                            </button>
                        </div>
                        <div className="mt-3 space-y-1 px-2 sm:px-3">
                            {userNavigation.map((item) => <Disclosure.Button
                                key={item.name}
                                as={Link}
                                href={item.href}
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                            >
                                {item.name}
                            </Disclosure.Button>)}
                        </div>
                    </div> : <Disclosure.Button
                        key={"login"}
                        as="button"
                        className={'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'}
                        onClick={() => signIn()}
                    >
                        {"Login"}
                    </Disclosure.Button>}
                </Disclosure.Panel>
            </>}
        </Disclosure>
    </div>
}
