import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import '../index.css'
import { Toaster } from 'react-hot-toast'
import api, { csrf } from '../tools/api'
import { useDispatch, useSelector } from 'react-redux'
import { FEEDS, LOGIN, SERVERERROR } from '../routes/routes'
import Loading from '../components/loading'
import { spawn } from 'child_process'
export default function GuestLayout() {
    const { auth } = useSelector((state: any) => state)

    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    async function getUser() {
        try {
            const resp = await api.get("api/user")
            if (resp.status === 200) {
                navigate(FEEDS)

            }
            setLoading(false)

        } catch (error: any) {
            if (error.response.data.message == "Unauthenticated.") {
                setLoading(false)
                return navigate(LOGIN)
            }
            setLoading(false)
            return navigate(SERVERERROR)

        }
    }
    useEffect(() => {
        !auth ? getUser() : navigate(FEEDS)
        if (!localStorage.getItem("light_mode"))
            window.localStorage.setItem("light_mode", "dark")


    }, [])




    return (
        loading ? <Loading /> :
            <div className=' bg-gradient-to-tr from-sky-50 overflow-hidden to-gray-300 '>
                <Outlet />
                <Toaster position="bottom-right" />
            </div>

    )

}
