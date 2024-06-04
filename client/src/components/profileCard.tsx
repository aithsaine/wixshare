import React, { useEffect, useState } from 'react';
import { Image } from 'primereact/image';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import fakePicture from "../assets/imgs/profile.png"

const ProfileCard = ({ user, followStatus, following, Unfollowe }: any) => {
    const { auth, isDarkMode } = useSelector((state: any) => state)
    const [flwns, setFollowings] = useState(user?.following)
    const [flwrs, setFollowers] = useState(user?.followers)
    return (
        <div className="  h-screen hidden md:block ">
            <div className={`max-w-sm h-full ${isDarkMode ? "bg-gray-900 text-white" : "bg-white"}   rounded-lg overflow-hidden shadow-lg`}>
                <div className=" px-4 pb-6">
                    <div className="text-center my-4">
                        <Image
                            style={{ borderRadius: "50%" }}
                            preview
                            className="h-32 w-32 rounded-full  mx-auto my-4"
                            src={user?.picture != null ? `${process.env.REACT_APP_BACKEND_URI}/storage/profiles/${user?.picture}` : fakePicture} alt="Profile"
                        />
                        <div className="py-2">
                            <h3 className={`font-bold text-2xl ${isDarkMode ? "text-white" : "text-gray-800"}   mb-1`}>{user?.first_name} {user?.last_name}</h3>
                            <div className={`inline-flex  ${isDarkMode ? " text-gray-500" : "text-gray-800"} items-center`}>
                                <svg
                                    className={`h-5 w-5  ${isDarkMode ? " text-gray-400" : "text-gray-800"} mr-1`}
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                >
                                    <path d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                                </svg>
                                New York, NY
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-4">
                        <div className={`flex justify-between gap-2 items-center   ${isDarkMode ? " text-gray-400" : "text-gray-800"} mb-4`}>

                            <div className='flex flex-col items-center'>
                                <span>

                                    <strong className="text-black dark:text-white"></strong> Followers
                                </span>
                                <span>{flwrs}</span>

                            </div>
                            <div className='flex flex-col items-center'>
                                <span>

                                    <strong className={`${isDarkMode ? " text-white" : "text-black"}`}></strong> Following
                                </span>
                                <span>{flwns}</span>

                            </div>
                        </div>

                    </div>
                    {auth?.id !== user?.id && <div className="flex gap-2 px-2">

                        {
                            followStatus == "followed" ? <button
                                onClick={Unfollowe}
                                className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2"                            >Fllowing</button>
                                : <button
                                    onClick={following}
                                    className={`flex-1 rounded-full  bg-blue-600 ${isDarkMode ? "hover:bg-blue-900 bg-blue-800" : ""} text-white antialiased font-bold hover:bg-blue-800 px-4 py-2`}                                >Fllow</button>
                        }


                        < Link to={`/chat?userid=${user?.id}`}
                            className={`flex-1 rounded-full border-2  ${isDarkMode ? "border-gray-700 font-semibold text-white" : "border-gray-400 text-black"}  px-4 py-2`}>
                            Message
                        </Link>
                    </div>}
                </div>

                {/* Card end */}
            </div>
        </div >
    );
};

export default ProfileCard;
