import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function CommentItem({ filename, user_name, user_id, date, content }: any) {
    const { isDarkMode } = useSelector((state: any) => state)


    return (
        <div className={`flex  items-center mb-4`}>
            <img src={`${process.env.REACT_APP_BACKEND_URI}/storage/profiles/${filename}`} alt="Avatar" className="w-8 h-8 rounded-full mr-2 object-cover" />
            <div className=''>
                <Link to={`/account/${user_id}`} className="flex items-center ">
                    <span className={`${isDarkMode ? "text-white" : "text-black"} font-semibold  text-sm mr-1`}>{user_name}</span>
                    <span className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}   text-sm`}>{date}</span>
                </Link>
                <p className={`${isDarkMode ? 'text-white ' : 'text-gray-800'} text-sm`}>{content}</p>
            </div>
        </div>)
}
