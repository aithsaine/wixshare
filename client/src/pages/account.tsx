import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import api from '../tools/api'
import Loading from '../components/loading'
import Post from '../components/post'
import { Button, ButtonGroup } from "@nextui-org/react";
import { Tooltip } from 'primereact/tooltip';

import { Image } from 'primereact/image';
import ProfileCard from '../components/profileCard'
import { CameraIcon, DevicePhoneMobileIcon, EnvelopeIcon } from '@heroicons/react/24/solid'


export default function Account() {
    const { id } = useParams()
    const { isDarkMode, auth } = useSelector((state: any) => state)
    const [user, setUser] = useState<any>()
    const [posts, setPosts] = useState([])
    const [where, setWhere] = useState("about")
    const navigate = useNavigate()
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
            try {


                const resp = await api.get(`api/getuser/${id}`)
                setUser(resp.data.user)
                setPosts(resp.data.posts)
                setFollowStatus(resp.data.user?.FollowStatus)

            } catch (error: any) {
                navigate("/404")
            }
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
                    <ProfileCard user={user} followStatus={followStatus} following={following} Unfollowe={Unfollowe} />
                    <div className='w-full justify-start '>

                        <div className=" mx-4 rounded-2xl border bg-gradient-to-r flex items-center justify-center from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% h-36 relative ">

                            <Tooltip target=".custom-target-icon" mouseTrack mouseTrackLeft={10} />
                            <CameraIcon data-pr-tooltip="Upload Cover Picture" className='w-6 h-6 hover:text-sky-600 custom-target-icon cursor-pointer' />


                        </div>

                        <ButtonGroup className='mx-4'>
                            <Button onClick={(e: any) => setWhere("about")} className={`hover:border-b-4 rounded-2xl border-indigo-500 ${where === "about" ? "border-b-4 " : ""}`}>About</Button>
                            <Button onClick={(e: any) => setWhere("posts")} className={`hover:border-b-4 rounded-2xl border-indigo-500 ${where === "posts" ? "border-b-4 " : ""}`}>Posts</Button>
                            <Button onClick={(e: any) => setWhere("")} className={`hover:border-b-4 rounded-2xl border-indigo-500 ${where === "" ? "border-b-4 " : ""}`}>Three</Button>
                        </ButtonGroup>
                        {
                            where &&

                            <section className=' flex w-full items-center justify-start'>
                                {/* display informations */}
                                {
                                    where == "about" ?
                                        <div className='w-full py-4 space-y-10 min-h-screen ms-6'>

                                            <h2 className={` text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}  `}>Introduction:</h2>
                                            <ul className={`w-full space-y-1  ${isDarkMode ? " text-gray-400" : "text-gray-500"}  list-inside `}>
                                                <li>
                                                    <div className="flex items-center justify-start">

                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam error recusandae ut vero illum eum odit sequi eligendi ipsa officiis possimus fuga quae, nulla ipsum earum laudantium assumenda ex ratione nam vitae corrupti id exercitationem sunt quas? Inventore ab exercitationem tempora totam a earum nesciunt. Atque dolore ea delectus blanditiis.
                                                    </div>
                                                </li>


                                            </ul>

                                            <h2 className={` text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}  `}>Contact Informations:</h2>
                                            <ul className={`w-full space-y-1  ${isDarkMode ? " text-gray-400" : "text-gray-500"}  list-inside `}>
                                                <li>
                                                    <div className="flex items-center justify-start">

                                                        <DevicePhoneMobileIcon className='w-4 h-4' />
                                                        : +212 636 732 23
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="flex items-center justify-start">

                                                        <EnvelopeIcon className='w-4 h-4' />:<Link to={`mailto:${user.email}`}>  {user.email}</Link>
                                                    </div>
                                                </li>

                                            </ul>

                                        </div>
                                        : ""
                                }
                                {/* display posts */}
                                {where == "posts" ?
                                    <div className='w-full space-y-10 min-h-screen ms-6'>
                                        {posts.map(item => <Post post={item} />)}
                                    </div> : ""
                                }


                            </section>
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
