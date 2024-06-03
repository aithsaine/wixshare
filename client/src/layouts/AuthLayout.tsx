import React, { useEffect, useState } from 'react'
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { LOGIN, SERVERERROR } from '../routes/routes';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import api, { csrf } from '../tools/api';
import { Add_authenticate, addNewFriends, addNewMessages, addNotifications, addSuggestFriend, appendNewFriend, appendNewMessage, insertNotification, logOut, setUserId } from '../redux/actions/actionCreators';
import Loading from '../components/loading';
import Nav from '../components/Nav';
import { Toaster } from 'sonner';
export default function Authenticated() {
    const location = useLocation();

    const specificStateSelector = (state: any) => ({
        auth: state.auth,
        isDarkMode: state.isDarkMode,
        selectedUserId: state.selectedUser
    });
    const { auth, isDarkMode, selectedUserId } = useSelector(specificStateSelector)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(auth === null)
    const [accessMskSeen, setAccessMskSeen] = useState(true)
    async function getUser() {
        try {
            const resp = await api.get("api/user")

            dispatch(addNewFriends(resp.data.friends))
            dispatch(Add_authenticate(resp.data.auth))
            dispatch(addSuggestFriend(resp.data.suggests))
            dispatch(addNewMessages(resp.data.messages))
            dispatch(addNotifications(resp.data.notifications))
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

    window.Echo.channel("notifyUser." + auth?.id).listen("Notify", function (e: any) {
        if (auth.id == e.notification.to)
            dispatch(insertNotification(e.notification))
    })

    const markSeen = async () => {
        try {

            setAccessMskSeen(false)
            const resp = await api.post(`api/chat/${auth?.id}/${selectedUserId}/markseen`)
            if (resp.data.success) {
                dispatch(addNewMessages(resp.data.messages))
            }
            setAccessMskSeen(true)
        } catch (error: any) {
            console.log(error)
        }
    }
    window.Echo.channel("messageWith." + auth?.id).listen("SendMessage", function (e: any) {
        dispatch(appendNewMessage(e.message))
        dispatch(appendNewFriend(e.friend))
        if (selectedUserId !== e.message.sender_id && location.pathname == "/chat") {

            markSeen()
        }
    })
    useEffect(() => {
        !auth && getUser()
        if (!localStorage.getItem("light_mode"))
            window.localStorage.setItem("light_mode", "dark")
    }, [])

    return (
        (loading) ? <Loading /> : <main className={`relative w-full ${isDarkMode ? "bg-black text-white" : "bg-white"} mb-0 no-scrollbar font-mono`}>
            <Nav />

            <Toaster richColors theme={isDarkMode ? "dark" : "light"} position="bottom-right" />
            <div className='py-14 min-h-screen'>
                <Outlet />
            </div>
        </main >

    )
}
