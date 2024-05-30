import { ChatBubbleBottomCenterTextIcon, PencilSquareIcon, PresentationChartBarIcon, UserGroupIcon, UserIcon, VideoCameraIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import api, { csrf } from '../tools/api'
import { Link } from 'react-router-dom'
import SharePost from '../components/sharePost'
import ContentLoader from "react-content-loader";
import SuggestItem from '../components/suggestItem'
import Post from '../components/post'
import { appendMultiplePosts } from '../redux/actions/actionCreators'
import { SETTINGS } from '../routes/routes'


export default function Feeds() {
    const specificStateSelector = (state: any) => ({
        auth: state.auth,
        posts: state.posts,
        isDarkMode: state.isDarkMode,
        suggestions: state.suggestions,
        page: state.page,
        newPost: state.newPost
    });

    const { auth, posts, page, isDarkMode, suggestions, newPost } = useSelector(specificStateSelector)
    const [pers, setPers] = useState(0)
    const dispatch = useDispatch()

    const getPosts = async () => {
        const response = await api.get(`api/posts/index?page=${page}`)
        if (response.data.success) {
            if (posts.length < response.data.length) {
                dispatch(appendMultiplePosts((response.data.posts)))
                setPers(0)
            }
        }
    }


    window.addEventListener("scroll", (item) => {

        var h: any = document.documentElement,
            b: any = document.body,
            st: any = 'scrollTop',
            sh: any = 'scrollHeight';
        let val = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
        setPers(Math.floor(val))

    })
    useEffect(() => {
        getPosts()
    }, [])
    useEffect(() => {
        if (pers === 90)
            getPosts()
    }, [pers]);
    const items = [
        {
            key: 1,
            title: "profile",
            path: `/account/${auth?.id}`,
            icon: UserIcon

        },
        {
            key: 3,
            title: "Analytics",
            path: "/",
            icon: PresentationChartBarIcon
        }
        ,
        {
            key: 4,
            title: "Friends",
            path: "/",
            icon: UserGroupIcon
        },
        {
            key: 5,
            title: "Chat",
            path: "/chat",
            icon: ChatBubbleBottomCenterTextIcon
        },
        {
            key: 6,
            title: "Settings",
            path: SETTINGS,
            icon: PencilSquareIcon
        }

    ]



    return (
        <div className="mt-0 relative flex p-1">
            <div className="hidden mt-20 min-h-screen  lg:block bg-inherit m-0  w-1/4 me-6  sm:rounded-lg">
                <div className='fixed flex flex-col p-2 overflow-hidden '>
                    {items.map((item) => {
                        return <Link to={item.path} key={item.key} className={`text-sm m-2 ${isDarkMode ? "text-white" : "text-black"}  font-bold`}>{<item.icon className='w-6 h-6 inline-block mx-2 text-sky-600' />}{item.title.toLocaleUpperCase()}</Link >

                    })}
                </div>

            </div>
            <div className="  p-2  flex flex-col items-start min-h-screen md:w-2/3 lg:w-3/6 w-full   overflow-hidden sm:rounded-lg ">
                <h1 className='p-2 mb-2 mt-14 font-bold text-sky-800 text-xl'>Bonjour {auth?.gender == "male" ? "Mr" : "Mss"} {auth?.first_name} {auth?.last_name}</h1 >

                <SharePost />

                <div className='w-full'>
                    {newPost && <Post post={newPost} />}
                    {posts.map((elem: any) => { return <Post post={elem} /> })}
                </div>

                <ContentLoader
                    speed={2}
                    className={" w-3/4"}
                    viewBox="0 0 400 160"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="48" y="8" rx="18" ry="10" width="88" height="30" />
                    <rect x="48" y="26" rx="3" ry="3" width="52" height="10" />
                    <rect x="0" y="56" rx="3" ry="3" width="410" height="15" />
                    <rect x="0" y="72" rx="3" ry="3" width="380" height="15" />
                    <rect x="0" y="88" rx="3" ry="3" width="178" height="15" />
                </ContentLoader>    <ContentLoader
                    speed={4}
                    className={"lg:w-3/4 w-full"}
                    viewBox="0 0 400 160"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="48" y="8" rx="18" ry="10" width="88" height="15" />
                    <rect x="48" y="26" rx="3" ry="3" width="52" height="10" />
                    <rect x="0" y="56" rx="3" ry="3" width="410" height="15" />
                    <rect x="0" y="72" rx="3" ry="3" width="380" height="15" />
                    <rect x="0" y="88" rx="3" ry="3" width="178" height="15" />
                    <circle cx="20" cy="20" r="20" />
                </ContentLoader>


            </div>

            <div
                className=" md:block   hidden bg-sk-600 p-4 md:w-1/3  lg:w-1/3 text-center bg-inherit fixed right-0  top-20 min-h-screen   overflow-hidden  sm:rounded-lg">
                <fieldset className={` rounded-xl p-4 items-center w-full  border-2 ${isDarkMode ? "bg-b" : "bg-white"}  `}>
                    <legend><UserGroupIcon className='w-10 text-sky-600 inline-block ' /> <span className='font-bold'>Suggest Friends</span></legend>
                    {suggestions.map((elem: any) => <SuggestItem user={elem} />)}

                </fieldset>

            </div>
        </div >)
}
