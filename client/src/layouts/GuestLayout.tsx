import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import '../index.css'
import { Toaster } from 'react-hot-toast'
import api, { csrf } from '../tools/api'
import { useDispatch, useSelector } from 'react-redux'
import { FEEDS } from '../routes/routes'
import Loading from '../components/loading'
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

        } catch (error) {
            setLoading(false)

        }
    }
    useEffect(() => {
        !auth ? getUser() : navigate(FEEDS)
        if (!localStorage.getItem("light_mode"))
            window.localStorage.setItem("light_mode", "dark")


    }, [])




    return (
        loading ? <Loading /> :
            <div>
                <Outlet />
                <Toaster position="bottom-right" />
            </div>

    )

}
