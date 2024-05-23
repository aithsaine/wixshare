import { LockClosedIcon, UserIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { useSelector } from 'react-redux'
import UpdateInformations from '../components/UpdateInformations'

export default function Settings() {
    const { isDarkMode, auth } = useSelector((state: any) => state)
    return (
        <section className='p-4 flex space-x-4 mt-2 fixed w-full   h-[575px]  '>
            <div className="w-1/4">

                <div className={`relative  rounded-xl flex flex-col ${isDarkMode ? "text-white  bg-slate-700 " : ""} h-full shadow-md w-full rounded-xl bg-clip-border`}>
                    <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
                        <div role="button"
                            className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                            <UserIcon className='w-4 h-4 me-1' /> Profile Informations
                        </div>
                        <div role="button"
                            className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                            <LockClosedIcon className='w-4 h-4 me-1' /> Securite
                        </div>
                        <div role="button"
                            className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                            Settings
                        </div>
                    </nav>
                </div>
            </div>
            <div className={`w-3/4 ${isDarkMode ? "text-white  bg-gradient-to-tr from-slate-700 via-slate-400 to-slate-300" : "text-black bg-gradient-to-r from-gray-400 via-gray-300 to-gray-50 "}  rounded-xl`}>
                <UpdateInformations user={auth} />
            </div>
        </section>
    )
}
