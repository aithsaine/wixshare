import React, { useEffect, useState } from 'react'
import api from '../tools/api'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function NotificationFrom({ content }: any) {
    const { isDarkMode, notifications } = useSelector((state: any) => state)
    const navigate = useNavigate()
    const [users, setUsers] = useState<any>()
    useEffect(() => {
        const getUsers = async () => {
            const resp = await api.post(`api/notification/users`, { users: notifications.map((item: any) => item.from) })
            setUsers(resp?.data.users)
            console.log(resp?.data.users)
        }
        getUsers()
    }, [])
    return (
        users && (
            notifications.map((item: any) => {


                return <div className=''>
                    <Link to={`/account/${item.from_id}`} className=' flex justify-between items-center' >
                        <div className={`flex items-center font-mono ps-1 py-3 my-1 ${isDarkMode ? " bg-slate-500" : " bg-sky-200"} text-black rounded-xl w-full`}>
                            <img className="rounded-full object-cover h-8 w-8" src={`${process.env.REACT_APP_BACKEND_URI}/storage/profiles/${item.user_picture}`} />
                            <div className={`leading-snug text-[12px] text-black"}  `}><span className='m-1 font-bold'>{item.sender_name}</span> {item.type == "new_follower" ? " followed you" : item.type == "new_comment" ? "commented on your post" : "reacted on your post"}</div>
                            <span className='text-[10px] ms-4'>{item.time}</span>
                        </div>
                        <div className='w-2 h-2 bg-green-900 rounded-full ms-1 '></div>
                    </Link>
                </div>
            })
        )
    )
}
