import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {SessionProvider, SessionProviderProps} from "next-auth/react";
import Navbar from "../components/Navbar";
import MessageContext from "../components/context/MessageContext";
import {useState} from "react";
import {MessageType} from "../types/MessageType";
import Notification from "../components/Notification";

function MyApp({Component, pageProps: {session, ...pageProps},}: AppProps) {
    const [message, setMessage] = useState({} as MessageType);

    return (
        <SessionProvider session={session}>
            <MessageContext.Provider value={{message, setMessage}}>
                <Navbar/>
                <Component {...pageProps} />
                {message.title &&
                    <Notification message={message}/>}
            </MessageContext.Provider>
        </SessionProvider>)
}

export default MyApp
