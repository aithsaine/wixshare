import { WifiIcon } from '@heroicons/react/24/solid'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux'
import { setUserId } from '../redux/actions/actionCreators'

export default function UserItem({ user, status, setHasNotSeenMsgs }: any) {
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch()
    const specificStateSelector = (state: any) => ({
        isDarkMode: state.isDarkMode,
        messages: state.messages
    });

    const { messages, isDarkMode } = useSelector(specificStateSelector)
    const [msgs_not_seen, setMsgsNotSeen] = useState(messages.filter(((items: any) => items.sender_id == user.id)).filter((item: any) => item.seen_at === null).length ?? 0)
    useEffect(() => {
        setMsgsNotSeen(messages.filter(((items: any) => items.sender_id == user.id)).filter((item: any) => item.seen_at == null).length)
    }, [messages])

    return (
        <button
            className={` flex relative justify-start  w-full items-start   cursor-pointer m-2 `}

            onClick={e => {
                dispatch(setUserId(user.id))
                setHasNotSeenMsgs(messages.filter((msg: any) => msg.sender_id == user.id).filter((msg: any) => msg.seen_at !== null).length > 0)

            }}
        >
            <motion.img
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
                className="rounded-full object-cover h-10 w-10" src={`${process.env.REACT_APP_BACKEND_URI}/storage/profiles/${user.picture}`} />
            {msgs_not_seen > 0 && <span className="absolute  top-10 md:top-2 end-6 inline-flex items-center  py-0.5 px-2 rounded-full text-xs font-medium transform -translate-y-1/2 translate-x-1/2 bg-red-500  text-white">{msgs_not_seen}</span>}
            {status == "Online" ? <span className="absolute  md:hidden c end-6 md:bottom-2  inline-flex items-center  p-1 rounded-full text-xs font-medium transform -translate-y-1/2 translate-x-1/2 bg-green-600  text-white"></span> : <span className="absolute c end-6 md:bottom-2  md:hidden inline-flex items-center  p-1 rounded-full text-xs font-medium transform -translate-y-1/2 translate-x-1/2 bg-gray-400  text-white"></span>}

            {visible && <motion.div
                variants={{
                    hidden: {
                        x: 50,
                        opacity: 0
                    },
                    show: {
                        x: 0,
                        opacity: 1,
                        transition: {
                            duration: 0.5
                        }
                    }
                }}
                initial="hidden"
                animate={visible ? "show" : "hidden"}



                className={`leading-snug text-xs ms-12 w-full  flex items-start fixed z-50    ${isDarkMode ? "text-white" : "font-bold"}  `}><span>{user.first_name.toUpperCase() + " " + user.last_name.toUpperCase()}</span>
            </motion.div>}
            <div className="ml-2 flex flex-col justify-start  items-start md:block hidden">
                <div className={`leading-snug text-xs text-start   ${isDarkMode ? "text-white" : "font-bold"}  `}><span>{user.first_name.toUpperCase() + " " + user.last_name.toUpperCase()}</span></div>
                <div className="leading-snug text-xs dark:text-gray-400 ">{status == "Online" ? <span className='flex items-center text-green-600' ><WifiIcon className='w-3 h-3' /> {status}</span> : status}</div>
            </div>
        </button>)
}
