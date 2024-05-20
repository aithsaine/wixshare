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
                    <Link to={`/account/${item.from}`} className="flex items-center font-mono py-3">
                        <img className="rounded-full object-cover h-6 w-6" src={`${process.env.REACT_APP_BACKEND_URI}/storage/profiles/${users.find((elem: any) => elem.id == item.from).picture}`} />
                        <div className={`leading-snug text-[12px]  ${isDarkMode ? "text-white" : "text-black"}  `}><span className='me-1'>{users.find((elem: any) => elem.id == item.from)?.first_name + " " + users.find((elem: any) => elem.id == item.from)?.last_name}</span> {content}</div>
                    </Link>
                    <hr />
                </div>
            })
        )
    )
}
