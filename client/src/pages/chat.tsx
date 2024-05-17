import LeftSideBoxChat from '../components/LeftSideBoxChat';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react'
import InputEmoji from "react-input-emoji";
import { useDispatch, useSelector } from 'react-redux';
import api from '../tools/api';
import { addNewFriends, addNewMessages, appendNewMessage, markMessagesSeen, setUserId } from '../redux/actions/actionCreators';
import UserItem from '../components/UserItem';
import RightSideBoxChat from '../components/RightSideBoxChat';
// import { echo } from '../tools/echo';


export default function Chat() {
    const specificStateSelector = (state: any) => ({
        auth: state.auth,
        friends: state.friends,
        isDarkMode: state.isDarkMode,
        messages: state.messages,
        selectedUserId: state.selectedUserId
    });
    const { auth, friends, isDarkMode, messages, selectedUserId } = useSelector(specificStateSelector)
    const [newMsg, setNewMsg] = useState("")
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const dispatch = useDispatch()
    const [accessMskSeen, setAccessMskSeen] = useState(true)

    if (urlParams.get("userid") !== null) {
        dispatch(setUserId(urlParams.get("userid")))
    }
    const [hasNotSeenMsgs, setHasNotSeenMsgs] = useState(selectedUserId ? messages.filter((msg: any) => msg.sender_id == selectedUserId).filter((msg: any) => msg.seen_at !== null).length > 0 : false)
    const markSeen = async () => {
        setAccessMskSeen(false)
        const resp = await api.post(`api/chat/${auth?.id}/${selectedUserId}/markseen`)
        if (resp.data.success) {
            dispatch(addNewMessages(resp.data.messages))
        }
        setAccessMskSeen(true)
    }

    useEffect(() => {
        markSeen()
    }, [selectedUserId])





    friends.map((element: any) => {

        window.Echo.channel("UserStatus." + element.id).listen("UpdateUserStatus", function (e: any) {
            dispatch(addNewFriends(friends.map((item: any) => {

                if (item.id == e.user.id) {
                    return { ...item, status: e.user.status }
                }
                return item
            })))
        });
    })

    const chatHandler = () => {
        setButtonDisabled(true)
        api.post("api/chat", {
            receiver_id: selectedUserId,
            message: newMsg
        }).then((resp: any) => {
            dispatch(appendNewMessage(resp.data))
            setNewMsg("")
            setButtonDisabled(false)
        }).catch((err: any) => setButtonDisabled(false))
    }
    return (
        <section className='p-4 flex space-x-4 fixed w-full   h-[575px]  '>
            <div className={`md:w-1/3  rounded-xl overflow-y-auto ${isDarkMode ? "bg-slate-900" : "bg-gray-200"}`}>
                {friends.map((item: any) => {
                    return <div className={`p-1 ${selectedUserId == item.id ? "bg-green-300" : ""}`}>
                        <UserItem setHasNotSeenMsgs={setHasNotSeenMsgs} status={item.status} user={item} />
                        <hr className={`opacity-20 ${isDarkMode ? 'text-white' : "divide-neutral-950"}`} />
                    </div>
                })}
            </div>
            {selectedUserId && <div className={`md:w-2/3 w-full relative rounded-xl overflow-y-auto ${isDarkMode ? "bg-slate-900" : "bg-gray-200"}`}>
                <div className="flex flex-col   absolute bottom-0 p-6 w-full " >
                    {messages && messages.sort((a: any, b: any) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)).filter((elem: any) => elem.receiver_id == selectedUserId || elem.sender_id == selectedUserId).map(
                        (item: any) => {
                            if (item.receiver_id == selectedUserId) {
                                return <RightSideBoxChat message={item} />
                            }
                            return <LeftSideBoxChat message={item} />
                        }
                    )}
                    <div className='flex'>

                        <InputEmoji
                            cleanOnEnter={true}
                            value={newMsg}
                            borderColor="black"
                            onChange={setNewMsg}
                            placeholder="Type your comment here..."
                            shouldReturn={true} // Add this prop
                            keepOpened={true}
                            shouldConvertEmojiToImage={false} // Add this prop
                        />
                        <button
                            onClick={chatHandler} disabled={buttonDisabled}>

                            <PaperAirplaneIcon className="w-6  " title="send" />
                        </button>
                    </div>
                </div >
            </div>}
        </section>

    )
}
