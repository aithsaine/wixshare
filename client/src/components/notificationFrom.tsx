import React, { useEffect, useState } from 'react'
import api from '../tools/api'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Skeleton } from 'primereact/skeleton'

export default function NotificationFrom({ content }: any) {
    const { isDarkMode, notifications } = useSelector((state: any) => state)
    const [NotificationPosts, setNotificationPosts] = useState<any>([]);
    const postsIds = notifications.filter((item: any) => item.type === "new_comment" || item.type === "new_reaction").map((item: any) => item.data_id);
    const [ntfs, setNtfs] = useState(notifications)
    const [type, setType] = useState("all")

    const [iswaiting, setWaiting] = useState(true)
    useEffect(() => {
        const getUsers = async () => {
            const resp = await api.post(`api/notification/users`, { users: notifications.map((item: any) => item.from), posts: Array.from(new Set(postsIds)) })
            setWaiting(false)
            setNotificationPosts(resp?.data.posts)
        }
        getUsers()
    }, [])
    useEffect(() => {

        if (type == "new_followers") {
            setNtfs(notifications.filter((item: any) => item.type == "new_follower"))
        }
        else if (type == "new_reaction") {
            setNtfs(notifications.filter((item: any) => item.type == "new_reaction"))
        }
        else if (type == "new_comment") {
            setNtfs(notifications.filter((item: any) => item.type == "new_comment"))
        }
        else {
            setNtfs(notifications)
        }

    }, [type])
    return (
        <>{

            !iswaiting ? (
                <div>
                    <div className='flex space-x-2'>

                        <button onClick={(e: any) => setType("all")} className={`hover:bg-sky-800 ${type == "all" ? "bg-sky-800 text-gray-300" : "bg-sky-500 text-gray-900"} px-2 py-1   text-xs rounded-2xl `}>all</button>
                        <button onClick={(e: any) => setType("new_followers")} className={`hover:bg-sky-800 ${type == "new_followers" ? "bg-sky-800 text-gray-300" : "bg-sky-500 text-gray-900"} px-2 py-1   text-xs rounded-2xl `}>new followers</button>
                        <button onClick={(e: any) => setType("new_reaction")} className={`hover:bg-sky-800 ${type == "new_reaction" ? "bg-sky-800 text-gray-300" : "bg-sky-500 text-gray-900"} px-2 py-1   text-xs rounded-2xl `}> reactions</button>
                        <button onClick={(e: any) => setType("new_comment")} className={`hover:bg-sky-800 ${type == "new_comment" ? "bg-sky-800 text-gray-300" : "bg-sky-500 text-gray-900"} px-2 py-1   text-xs rounded-2xl `}> comments</button>
                    </div>

                    {

                        ntfs.sort((a: any, b: any) => (b.id > a.id) ? 1 : ((a.id > b.id) ? -1 : 0)).map((item: any) => {


                            return <div className=''>

                                <Link to={`/account/${item.from_id}`} className=' flex  justify-between flex-col items-center' >
                                    <div className={` font-mono px-3 py-3 my-1 ${isDarkMode ? " bg-slate-500" : " bg-sky-50"} text-black rounded-xl w-full`}>

                                        <div className={`flex items-center justify-between w-full`}>
                                            <img className="rounded-full object-cover h-8 w-8" src={`${process.env.REACT_APP_BACKEND_URI}/storage/profiles/${item.user_picture}`} />
                                            <div className={`leading-snug text-[12px] text-black"}  `}><span className='m-1 font-bold'>{item.sender_name}</span> {(item.type == "new_follower" ? " started following you." : item.type == "new_comment" ? "commented on your post." : "reacted on your post.")}  <span className='text-[10px] ms-4'>{item.time}</span></div>

                                        </div>

                                        {NotificationPosts.length > 0 && item.data_id && (<div className='border p-4 rounded-xl flex justify-start m-2 text-xs border-black w-full ms-1 '>
                                            <img className='w-12 ' src={`http://localhost:8000/storage/posts/${item.data_id}/${NotificationPosts.find((elem: any) => elem.id == item.data_id).files[0]}`} alt="" />
                                            <div>
                                                {NotificationPosts.find((elem: any) => elem.id == item.data_id).title}
                                            </div>
                                        </div>)}
                                    </div>
                                </Link>
                            </div>
                        })
                    }

                </div>

            ) :
                Array.from({ length: notifications.length }, (_, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="mr-2 h-8 w-8 rounded-full bg-gray-100"></span>
                            <span className="h-4 w-40 rounded-lg bg-gray-100"></span>
                        </div>
                        <span className="h-4 w-14 rounded-lg bg-gray-100"></span>
                    </div>
                ))


        }
        </>

    )
}
