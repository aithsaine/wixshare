import React, { useEffect, useState } from 'react'
import api from '../tools/api'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function NotificationFrom({ user_id, content }: any) {
    const { isDarkMode } = useSelector((state: any) => state)
    const navigate = useNavigate()
    const [user, setUser] = useState<any>()
    useEffect(() => {
        const getUser = async () => {
            console.log(user_id)
            const resp = await api.get(`api/notification/user/${user_id}`)
            setUser(resp?.data.user)
        }
        getUser()
    }, [])
    return (
        user && (

            <div>
                <div onClick={(e: any) => navigate(`/account/${user_id}`)} className="flex items-end py-3">
                    <img className="rounded-full object-cover h-6 w-6" src={`${process.env.REACT_APP_BACKEND_URI}/storage/profiles/${user?.picture}`} />
                    <div className={`leading-snug text-[12px]  ${isDarkMode ? "text-white" : "font-bold"}  `}><span>{user?.first_name + " " + user?.last_name + " " + content}</span></div>
                </div>
                <hr />
            </div>
        )
    )
}
