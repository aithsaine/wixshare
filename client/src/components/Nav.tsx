// Nav.js
import React, { useEffect, useRef, useState } from 'react'
import SearchInput from "../components/searchInput";
import LightButton from '../components/lightButton';
import { useSelector, useDispatch } from 'react-redux';
import api from '../tools/api';
import { Link, useNavigate } from 'react-router-dom';
import { FEEDS, HOME } from '../routes/routes';

export default function Nav() {
    const { auth, friends, isDarkMode, messages } = useSelector((state: any) => state);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [image, setImage] = useState(`${process.env.REACT_APP_BACKEND_URI}/storage/profiles/${auth.picture}`)
    const dispatch = useDispatch()
    const [msgs_not_seen, SetMsgNotSeen] = useState(messages.filter((item: any) => item.seen_at == null) ?? 0);
    const navigate = useNavigate()



    useEffect(() => {
        SetMsgNotSeen(friends.reduce((previous: any, next: any) => previous + Number(next.msgs_not_seen), 0))
    }, [friends])



    window.Echo.channel("newMsgNotify." + auth.id).listen("MessageNotification",
        function (e: any) {
            SetMsgNotSeen(e.countMsg)
        })


    // useEffect(() => {
    //     const handleClickOutside = (event: any) => {
    //         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    //             setIsOpen(false);
    //         }
    //     };

    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const logout = async () => {
        const resp = await api.post("api/logout")
        if (resp.data.success) {
            navigate(HOME)
        }
    }

    return (
        <>
            <nav className={`border-bottom border-black ${isDarkMode ? "bg-black shadow-sky-800" : "bg-white"}  px-6 shadow-lg  py-2 fixed w-full z-50 `}>
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <img className="h-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="" />
                        <SearchInput />
                    </div>
                    <div className="relative flex justify-around w-2/5 items-center">
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
                        {/* Add the messages button */}
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
                                    <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" onClick={toggleDropdown}>
                                        <span className="sr-only">Open user menu</span>
                                        <img className="h-10 w-10 rounded-full object-cover" src={image} alt="Profile" />
                                    </button>
                                    {isOpen && (
                                        <ul ref={dropdownRef} className="absolute z-50 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 text-gray-800">
                                            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Profile</a></li>
                                            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Settings</a></li>
                                            <li><hr className="my-1" /></li>
                                            <li><button onClick={logout} className="block px-4 py-2 hover:bg-gray-100">Logout</button></li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
