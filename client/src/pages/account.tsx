import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import api from '../tools/api'
import Loading from '../components/loading'
import Post from '../components/post'
import { Button, ButtonGroup } from "@nextui-org/react";

import { Image } from 'primereact/image';
import ProfileCard from '../components/profileCard'


export default function Account() {
    const { id } = useParams()
    const { isDarkMode, auth } = useSelector((state: any) => state)
    const [user, setUser] = useState<any>()
    const [posts, setPosts] = useState([])
    const [where, setWhere] = useState("about")

    const [followStatus, setFollowStatus] = useState("")
    const following = async (e: any) => {
        e.preventDefault();
        try {

            setFollowStatus("followed")
            await api.post("api/follow/store", { user_id: user?.id })
        } catch (err) {
            setFollowStatus("")
        }
    }
    const Unfollowe = async (e: any) => {
        e.preventDefault();
        try {

            setFollowStatus("")
            await api.delete(`api/follow/${user?.id}/delete`)
        } catch (err) {
            setFollowStatus("followed")
        }
    }

    useEffect(() => {

        const getUser = async () => {

            const resp = await api.get(`api/getuser/${id}`)
            setUser(resp.data.user)
            setPosts(resp.data.posts)
            setFollowStatus(resp.data.user?.FollowStatus)
        }
        getUser()
    }, [id])


    if (!user) {
        return <Loading />
    }

    return (user &&
        < main className={`${isDarkMode ? "bg-black text-white" : ""} min-h-screen md:px-28 mt-6`
        }>
            <div className={`${isDarkMode ? "bg-black text-white" : " text-black"} shadow-md rounded-xl relative py-16 overflow-hidden`}>

                <div className='w-full  flex justify-start relative    items-start ms-4'>
                    <ProfileCard user={user} />
                    <div className='w-full justify-start '>

                        <div className=" mx-4 rounded-2xl border bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% h-36 relative ">


                        </div>
                        <ButtonGroup className='mx-4'>
                            <Button onClick={(e: any) => setWhere("about")} className={"hover:border-b-4 rounded-2xl hover:border-indigo-500"}>About</Button>
                            <Button onClick={(e: any) => setWhere("posts")} className={"hover:border-b-4 rounded-2xl hover:border-indigo-500"}>Posts</Button>
                            <Button onClick={(e: any) => setWhere("")} className={"hover:border-b-4 rounded-2xl hover:border-indigo-500"}>Three</Button>
                        </ButtonGroup>
                        {
                            where && where == "posts" ?
                                <section className=' flex w-full items-center justify-start'>
                                    <div className='w-full space-y-10 min-h-screen ms-6'>
                                        {posts.map(item => <Post post={item} />)}
                                    </div>
                                </section> : ""
                        }
                    </div>
                </div>
                {/* Header */}
                <div className=" px-4 py-2 text-start">
                    {/* User Avatar */}
                    {/* User Name */}
                </div>
                {/* Body */}

            </div>

        </main >

    )
}
