import React from 'react';
import {useRouter} from "next/router";
import {signout} from "next-auth/core/routes";
import {signOut} from "next-auth/react";

function Logout() {
    const router = useRouter()
    signOut().then(() => router.back())
}

export default Logout;

