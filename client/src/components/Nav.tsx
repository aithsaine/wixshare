// Nav.js
import React, { useEffect, useRef, useState } from 'react'
import SearchInput from "../components/searchInput";
import LightButton from '../components/lightButton';
import { useSelector, useDispatch } from 'react-redux';
import api from '../tools/api';
import { Link, useNavigate } from 'react-router-dom';
import { FEEDS, HOME } from '../routes/routes';
import { logOut } from '../redux/actions/actionCreators';
import { Button } from '@mui/base';
import NotificationFrom from './notificationFrom';
import logo from "../assets/imgs/logo.png"
import { ArrowLeftStartOnRectangleIcon, Cog6ToothIcon, UserCircleIcon } from '@heroicons/react/24/solid';

export default function Nav() {
    const { auth, friends, isDarkMode, messages, notifications } = useSelector((state: any) => state);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dropdownRef2 = useRef(null);
    const [image, setImage] = useState(`${process.env.REACT_APP_BACKEND_URI}/storage/profiles/${auth?.picture}`)
    const dispatch = useDispatch()
    const [msgs_not_seen, SetMsgNotSeen] = useState(messages.filter((item: any) => item.seen_at == null).length ?? 0);
    const navigate = useNavigate()
    const [isOppenNotifications, setIsOpenNotifications] = useState(false)
    const [notifications_not_seen, setNotificationsNotSeen] = useState(0)
    useEffect(() => {
        setImage(`${process.env.REACT_APP_BACKEND_URI}/storage/profiles/${auth?.picture}`)
    }, [auth])

    useEffect(() => {
        SetMsgNotSeen(messages.filter((item: any) => item.seen_at == null).filter((item: any) => item.receiver_id == auth?.id).length)
    }, [messages])

    useEffect(() => {
        notifications && setNotificationsNotSeen(notifications.filter((item: any) => item.seen == 0).length)
    }, [notifications])


    window.Echo.channel("newMsgNotify." + auth?.id).listen("MessageNotification",
        function (e: any) {
            SetMsgNotSeen(e.countMsg)
        })


    useEffect(() => {
        const handleClickOutside = (event: any) => {

            let em: any = dropdownRef.current;
            let em2: any = dropdownRef2.current;
            if (em) {

                if (!em.contains(event.target)) {
                    setIsOpen(false);

                }
            }
            if (em2) {

                if (!em2.contains(event.target)) {
                    setIsOpenNotifications(false);

                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);




    const logout = async () => {
        const resp = await api.post("api/logout")
        if (resp.data.success) {
            dispatch(logOut())
            navigate(HOME)
        }
    }

    return (
        <>
            <nav className={`border-bottom border-black ${isDarkMode ? "bg-black shadow-sky-800" : "bg-white"}  px-6 shadow-lg   py-2 fixed w-full z-50 `}>
                <div className="flex justify-between items-center">
                    <div className="flex   space-x-2">
                        <img className="h-8" src={logo} alt="" />
                        <SearchInput />
                    </div>
                    <div className="relative flex justify-around w-2/5 items-start" >
                        <div className="relative group">
                            <div className="group-hover:bg-gray-3  00 cursor-pointer p-2 group-hover:rounded-lg transition-all ease-in-out duration-300">
                                <Link to={FEEDS}> <img className="md:h-8 h-6 cursor-pointer" src="https://img.icons8.com/external-kmg-design-flat-kmg-design/32/000000/external-home-ui-essential-kmg-design-flat-kmg-design.png" /></Link>
                            </div>
                            <div className="absolute group-hover:border-b-2 group-hover:cursor-pointer mt-2 border-blue-500 w-full transition-all duration-100 ease-in-out "></div>
                        </div>

                        <div className="relative group">
                            <div className="group-hover:bg-gray-3  00 cursor-pointer p-2 group-hover:rounded-lg transition-all ease-in-out duration-300">
                                <img className="md:h-8 h-6 cursor-pointer" src="https://img.icons8.com/external-bearicons-outline-color-bearicons/64/000000/external-watch-call-to-action-bearicons-outline-color-bearicons.png" />
                            </div>
                            <div className="absolute group-hover:border-b-2 group-hover:cursor-pointer mt-2 border-blue-500 w-full transition-all duration-100 ease-in-out "></div>
                        </div>
                        {/*  Notifications Icon */}
                        <div className="relative group">
                            <div className="group-hover:bg-gray-3  00 cursor-pointer p-2 group-hover:rounded-lg transition-all ease-in-out duration-300">
                                <Button className='' onClick={e => setIsOpenNotifications(!isOppenNotifications)}>   <img className="md:h-8 h-6 cursor-pointer" src="https://img.icons8.com/external-kmg-design-flat-kmg-design/32/external-notification-user-interface-kmg-design-flat-kmg-design.png" alt="external-notification-user-interface-kmg-design-flat-kmg-design" />

                                </Button>
                            </div>
                            {notifications_not_seen > 0 && <span className="absolute top-2 end-0 inline-flex items-center py-0.5 px-1.5 rounded-lg text-xs font-medium transform -translate-y-1/2 translate-x-1/2 bg-red-500  text-white">{notifications_not_seen}</span>
                            }
                            {isOppenNotifications &&

                                <div ref={dropdownRef2} className={`absolute z-50 p-2  shadow-sm shadow-slate-500  mt-2 ${isDarkMode ? "bg-slate-800 text-white  shadow-white" : "bg-white text-gray-800"} w-96 h-96 overflow-y-auto    rounded-md shadow-sm py-1`}>
                                    <div className='flex  flex-col  '>

                                        <h1 className='text-center text-2xl'>Notifications:</h1>
                                        <NotificationFrom content={" started following you"} />

                                    </div >
                                </div>
                            }
                            <div className="absolute group-hover:border-b-2 group-hover:cursor-pointer mt-2 border-blue-500 w-full transition-all duration-100 ease-in-out "></div>
                        </div>


                        {/*  messages Icon */}
                        <div className="relative group">
                            <div className="group-hover:bg-gray-3  00 cursor-pointer p-2 group-hover:rounded-lg transition-all ease-in-out duration-300">
                                <Link to='/chat'>   <img className="md:h-8 h-6 cursor-pointer" src="https://img.icons8.com/fluency/48/speech-bubble-with-dots--v1.png" /></Link>
                            </div>
                            <div className="absolute group-hover:border-b-2 group-hover:cursor-pointer mt-2 border-blue-500 w-full transition-all duration-100 ease-in-out "></div>
                            {msgs_not_seen > 0 && <span className="absolute top-2 end-0 inline-flex items-center py-0.5 px-1.5 rounded-lg text-xs font-medium transform -translate-y-1/2 translate-x-1/2 bg-red-500  text-white">{msgs_not_seen}</span>
                            }                        </div>


                    </div>
                    <LightButton />
                    <div className="flex justify-evenly ">
                        <div className="">
                            <div className="ml-4 flex items-center md:ml-6">
                                <div className="relative">
                                    <span className="flex text-sm cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" onClick={e => setIsOpen(!isOpen)}>
                                        <span className="sr-only">Open user menu</span>
                                        <img className="h-10 w-10 rounded-full object-cover" src={image} alt="Profile" />
                                    </span>
                                    {isOpen && (
                                        <ul ref={dropdownRef} className={`absolute z-50 right-0 mt-2 ${isDarkMode ? "bg-slate-800 text-white  shadow-white" : "bg-white text-gray-800"} w-48  border  rounded-md shadow-sm py-1`}>
                                            <li><Link to={`/account/${auth.id}`} className={`flex space-x-2 w-full px-4 py-2 ${isDarkMode ? "hover:bg-slate-700 text-white" : "hover:bg-gray-100"} `}><UserCircleIcon className='w-6 h-6' />{auth.first_name.toUpperCase()}</Link></li>
                                            <li><Link to="/settings" className={`flex space-x-2 w-full px-4 py-2 ${isDarkMode ? "hover:bg-slate-700 text-white" : "hover:bg-gray-100"} `}><Cog6ToothIcon className='w-6 h-6' /> Settings</Link></li>
                                            <li><hr className="my-1" /></li>
                                            <li><button onClick={logout} className={`flex space-x-2 w-full text-start px-4 py-2 ${isDarkMode ? "hover:bg-slate-700 text-white" : "hover:bg-gray-100"} `}><ArrowLeftStartOnRectangleIcon className='w-6 h-6' /> Logout</button></li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav >
        </>
    );
}
