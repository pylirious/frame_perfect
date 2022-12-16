import React from 'react';
import {useSession} from "next-auth/react";
import Head from "next/head";

function Profile() {
    const {data: session} = useSession(), user = session?.user;
    return (<>
        <Head>
            <title>Profil</title>
        </Head>
        <div className={"m-5 bg-white shadow px-4 py-5 sm:rounded-lg sm:px-10 sm:m-20 flex flex-col"}>
            <div
                className="px-4 py-5 sm:px-6 flex flex-row max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                <h2 id="applicant-information-title"
                    className="text-2xl font-medium leading-6 text-gray-900">Profil</h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Persönliche Informationen </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Name</dt>
                        <dd className="mt-1 text-sm text-gray-900">{user?.name}</dd>
                    </div>
                    <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">E-Mail Adresse</dt>
                        <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
                    </div>

                </dl>
            </div>
        </div>
    </>)

}

export default Profile;