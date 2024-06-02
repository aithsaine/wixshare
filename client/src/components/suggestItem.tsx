import { UserPlusIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { motion } from "framer-motion"
import api from '../tools/api'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import fakeUserProfile from "../assets/imgs/profile.png"

export default function SuggestItem({ user }: any) {
    const { isDarkMode } = useSelector((state: any) => state)
    const [followStatus, setFollowStatus] = useState(user?.FollowStatus)
    const [userPicture, setUserPicture] = useState<string>(user?.picture != "" ? `${process.env.REACT_APP_BACKEND_URI}/storage/profiles/${user?.picture}` : fakeUserProfile)
    const following = async (e: any) => {
        e.preventDefault();
        try {

            setFollowStatus("followed")
            await api.post("api/follow/store", { user_id: user?.id })
        } catch (err) {
        }
    }
    const Unfollowe = async (e: any) => {
        e.preventDefault();
        try {

            setFollowStatus("")
            await api.delete(`api/follow/${user?.id}/delete`)
        } catch (err) {
        }
    }


    return (
        <motion.div variants={
            { hidden: { opacity: 0 }, show: { opacity: 1 } }

        }
            hidden={false}
            animate="show"
            className="py-2 flex items-center  justify-between  cursor-pointer ">
            <Link to={`/account/${user?.id}`} className="flex items-start">
                <img className="rounded-full object-cover h-10 w-10" src={userPicture} />
                <div className="ml-2 flex flex-col items-start">
                    <div className={`leading-snug text-xs flex items-center flex-col ${isDarkMode ? "text-white" : "font-bold"}  `}>{user?.first_name?.toUpperCase() + ' ' + user?.last_name?.toUpperCase()} </div>
                </div>
            </Link>
            {
                followStatus == "followed" ? <button
                    onClick={Unfollowe}
                    className="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100"            >Fllowing</button>
                    : <button
                        onClick={following}
                        className="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100"                >Fllow</button>
            }
        </motion.div >
    )
}
