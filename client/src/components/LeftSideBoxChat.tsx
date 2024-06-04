import React from 'react'
import { useSelector } from 'react-redux';
import clsx from "clsx"
import fakePicture from "../assets/imgs/profile.png"
export default function LeftSideBoxChat({ message, sender_picture }: any) {
    const specificStateSelector = (state: any) => ({
        isDarkMode: state.isDarkMode,
    });
    const { isDarkMode } = useSelector(specificStateSelector);

    return (
        <div className="col-start-1 col-end-9 p-1">
            <div className="relative flex flex-row group">
                <div className={clsx(message.message_deleted_at ? '' : 'lg:pr-12', `py-2 ms-6 pl-3 pr-3 text-xs ${isDarkMode ? "text-white bg-black" : "bg-white text-gray-600"} rounded-md lg:text-sm`)}>
                    <div className="break-all whitespace-pre-wrap">{message.message}</div>
                </div>
                <div className={`absolute top-0 w-4 h-4  ${isDarkMode ? " bg-black" : "bg-white "} rounded-bl-full left-4`}></div>
                <img src={sender_picture !== null ? `${process.env.REACT_APP_BACKEND_URI}/storage/profiles/${sender_picture}` : fakePicture} className='w-6 h-6 rounded-full absolute top-0  rounded-br-full -left-4' alt="" />

            </div>
        </div>)
}
