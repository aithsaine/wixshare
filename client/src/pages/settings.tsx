import { LockClosedIcon, UserIcon, IdentificationIcon, PhoneIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import UpdateInformations from '../components/UpdateInformations'
import SettingDescription from '../components/Description'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import ChangePassword from '../components/changePassword'

export default function Settings() {
    const { isDarkMode, auth } = useSelector((state: any) => state)
    const [where, setWhere] = useState("profile_info")
    return (
        <section className='p-4 flex space-x-4 mt-2 fixed w-full   h-[575px]  '>
            <div className="w-1/4">

                <div className={`relative  rounded-xl flex flex-col ${isDarkMode ? "text-white  bg-slate-700 " : ""} h-full shadow-md w-full rounded-xl bg-clip-border`}>
                    <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">

                        <div
                            onClick={e => setWhere("profile_info")}
                            className={`cursor-pointer text-sm m-2 ${isDarkMode ? "text-white" : "text-black"}  font-bold`}>{<UserIcon className='w-6 h-6 inline-block mx-2 text-sky-600' />}Profile Informations
                        </div >
                        <div
                            onClick={e => setWhere("securite")}
                            className={`cursor-pointer text-sm m-2 ${isDarkMode ? "text-white" : "text-black"}  font-bold`}>{<LockClosedIcon className='w-6 h-6 inline-block mx-2 text-sky-600' />}Change Password
                        </div >
                        <div
                            onClick={e => setWhere("intro")}
                            className={`cursor-pointer text-sm m-2 ${isDarkMode ? "text-white" : "text-black"}  font-bold`}>{<UserIcon className='w-6 h-6 inline-block mx-2 text-sky-600' />}Introduction
                        </div >


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
                            where == "securite" ? <ChangePassword /> : <span>Contact</span>)
                    )
                }

            </div>
        </section>
    )
}
