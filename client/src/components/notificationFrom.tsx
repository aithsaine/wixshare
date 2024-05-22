import React, { useEffect, useState } from 'react'
import api from '../tools/api'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Skeleton } from 'primereact/skeleton'

export default function NotificationFrom({ content }: any) {
    const { isDarkMode, notifications } = useSelector((state: any) => state)
    const [iswaiting, setWaiting] = useState(true)
    const navigate = useNavigate()
    const [users, setUsers] = useState<any>()
    useEffect(() => {
        const getUsers = async () => {
            const resp = await api.post(`api/notification/users`, { users: notifications.map((item: any) => item.from) })
            setWaiting(false)
            setUsers(resp?.data.users)
        }
        getUsers()
    }, [])
    return (
        !iswaiting ?

            notifications.sort((a: any, b: any) => (b.id > a.id) ? 1 : ((a.id > b.id) ? -1 : 0)).map((item: any) => {


                return <div className=''>
                    <Link to={`/account/${item.from_id}`} className=' flex justify-between items-center' >
                        <div className={`flex items-center font-mono ps-1 py-3 my-1 ${isDarkMode ? " bg-slate-500" : " bg-sky-200"} text-black rounded-xl w-full`}>
                            <img className="rounded-full object-cover h-8 w-8" src={`${process.env.REACT_APP_BACKEND_URI}/storage/profiles/${item.user_picture}`} />
                            <div className={`leading-snug text-[12px] text-black"}  `}><span className='m-1 font-bold'>{item.sender_name}</span> {item.type == "new_follower" ? " started following you" : item.type == "new_comment" ? "commented on your post" : "reacted on your post"}</div>
                            <span className='text-[10px] ms-4'>{item.time}</span>
                        </div>
                        <div className='w-2 h-2 bg-green-900 rounded-full ms-1 '></div>
                    </Link>
                </div>
            }) :
            Array.from({ length: notifications.length }, (_, idx) => (
                <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="mr-2 h-8 w-8 rounded-full bg-gray-100"></span>
                        <span className="h-4 w-40 rounded-lg bg-gray-100"></span>
                    </div>
                    <span className="h-4 w-14 rounded-lg bg-gray-100"></span>
                </div>
            ))



    )
}
