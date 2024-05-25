import { LockClosedIcon, UserIcon, IdentificationIcon, PhoneIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import UpdateInformations from '../components/UpdateInformations'
import SettingDescription from '../components/Description'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'

export default function Settings() {
    const { isDarkMode, auth } = useSelector((state: any) => state)
    const [where, setWhere] = useState("profile_info")
    return (
        <section className='p-4 flex space-x-4 mt-2 fixed w-full   h-[575px]  '>
            <div className="w-1/4">

                <div className={`relative  rounded-xl flex flex-col ${isDarkMode ? "text-white  bg-slate-700 " : ""} h-full shadow-md w-full rounded-xl bg-clip-border`}>
                    <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
                        <div role="button"
                            onClick={e => setWhere("profile_info")}
                            className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                            <UserIcon className='w-4 h-4 me-1' /> Profile Informations
                        </div>
                        <div role="button"
                            onClick={e => setWhere("securite")}
                            className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                            <LockClosedIcon className='w-4 h-4 me-1' /> Securite
                        </div>
                        <div role="button"
                            onClick={e => setWhere("intro")}
                            className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                            <IdentificationIcon className='w-4 h-4 me-1' /> Introduction
                        </div>
                        <div role="button"
                            onClick={e => setWhere("contact")}
                            className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                            <PhoneIcon className='w-4 h-4 me-1' /> Contanct
                        </div>
                    </nav>
                </div>
            </div>
            <div className={`w-3/4 ${isDarkMode ? "text-white bg-slate-800" : "text-black bg-gray-50 "}  rounded-xl`}>
                <Breadcrumbs>
                    <BreadcrumbItem className='font-bold' onClick={e => setWhere("profile_info")}>Settings</BreadcrumbItem>
                    <BreadcrumbItem className='font-bold' >{where == "profile_info" ? "Profile Info" : (where == "intro" ? "Introduction" : (where == "securite" ? "Securite" : "Contact"))}</BreadcrumbItem>
                </Breadcrumbs>
                {
                    where &&
                        where == "profile_info" ? <UpdateInformations user={auth} /> : (
                        where == "intro" ? <SettingDescription /> : (
                            where == "securite" ? < span > securite</span> : <span>Contact</span>)
                    )
                }

            </div>
        </section>
    )
}
