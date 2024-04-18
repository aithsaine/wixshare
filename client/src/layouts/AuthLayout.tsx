import React, { useEffect, useState } from 'react'
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { LOGIN } from '../routes/routes';
import { Outlet, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import api, { csrf } from '../tools/api';
import { Add_authenticate, addNewFriends, addNewMessages, addSuggestFriend } from '../redux/actions/actionCreators';
import Loading from '../components/loading';
import Nav from '../components/Nav';
export default function Authenticated() {

    const { auth, isDarkMode } = useSelector((state: any) => state)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(auth === null)

    async function getUser() {
        csrf()
        try {
            const resp = await api.get("api/user")
            dispatch(Add_authenticate(resp.data.auth))
            dispatch(addSuggestFriend(resp.data.suggests))
            dispatch(addNewMessages(resp.data.messages))
            dispatch(addNewFriends(resp.data.friends))
            setLoading(false)
            console.log(resp.data.data)
        } catch (error) {
            return navigate(LOGIN)
        }
    }
    useEffect(() => {
        getUser()
        if (!localStorage.getItem("light_mode"))
            window.localStorage.setItem("light_mode", "dark")
    }, [])
    return (
        (loading) ? <Loading /> : <main className={`relative w-full ${isDarkMode ? "bg-black text-white" : "bg-white"} mb-0 no-scrollbar`}>
            <Nav />
            <Toaster position="bottom-right" />
            <div className='py-14 min-h-screen'>
                <Outlet />
            </div>
        </main >

    )
}
