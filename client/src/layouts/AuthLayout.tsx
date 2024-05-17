import React, { useEffect, useState } from 'react'
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { LOGIN } from '../routes/routes';
import { Outlet, useNavigate } from 'react-router-dom';
import api, { csrf } from '../tools/api';
import { Add_authenticate, addNewFriends, addNewMessages, addSuggestFriend, setUserId } from '../redux/actions/actionCreators';
import Loading from '../components/loading';
import Nav from '../components/Nav';
import { Toaster } from 'sonner';
import ScrollToTop from '../helpers/scrollToTop';
export default function Authenticated() {
    const specificStateSelector = (state: any) => ({
        auth: state.auth,
        isDarkMode: state.isDarkMode,
    });
    const { auth, isDarkMode } = useSelector(specificStateSelector)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(auth === null)

    async function getUser() {
        try {
            const resp = await api.get("api/user")
            dispatch(Add_authenticate(resp.data.auth))
            dispatch(addSuggestFriend(resp.data.suggests))
            dispatch(addNewMessages(resp.data.messages))
            dispatch(addNewFriends(resp.data.friends))
            setLoading(false)
        } catch (error) {
            return navigate(LOGIN)
        }
    }
    useEffect(() => {
        !auth && getUser()
        if (!localStorage.getItem("light_mode"))
            window.localStorage.setItem("light_mode", "dark")
    }, [])

    return (
        (loading) ? <Loading /> : <main className={`relative w-full ${isDarkMode ? "bg-black text-white" : "bg-white"} mb-0 no-scrollbar`}>
            <Nav />

            <Toaster theme={isDarkMode ? "dark" : "light"} position="bottom-right" />
            <div className='py-14 min-h-screen'>
                <Outlet />
            </div>
        </main >

    )
}
