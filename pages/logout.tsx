import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import {signout} from "next-auth/core/routes";
import {signOut} from "next-auth/react";

function Logout() {
    const router = useRouter()
    useEffect(() => {
        if (!router.isReady) return;
        signOut().then(() => router.back())
    }, [router.isReady])
}

export default Logout;

