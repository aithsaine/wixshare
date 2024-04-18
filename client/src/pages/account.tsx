import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import api from '../tools/api'
import Loading from '../components/loading'
import Post from '../components/post'



export default function Account() {
    const { id } = useParams()
    const { isDarkMode, auth } = useSelector((state: any) => state)
    const [user, setUser] = useState<any>()
    const [posts, setPosts] = useState([])

    const [followStatus, setFollowStatus] = useState("")
    const following = async (e: any) => {
        e.preventDefault();
        try {

            setFollowStatus("followed")
            await api.post("api/follow/store", { user_id: user.id })
        } catch (err) {
            setFollowStatus("")
        }
    }
    const Unfollowe = async (e: any) => {
        e.preventDefault();
        try {

            setFollowStatus("")
            await api.delete(`api/follow/${user.id}/delete`)
        } catch (err) {
            setFollowStatus("followed")
        }
    }

    useEffect(() => {
        const getUser = async () => {

            const resp = await api.get(`api/getuser/${id}`)
            setUser(resp.data.user)
            setPosts(resp.data.posts)
            setFollowStatus(resp.data.user.FollowStatus)
        }
        getUser()
    }, [])


    if (!user) {
        return <Loading />
    }

    return (user &&
        < main className={`${isDarkMode ? "bg-black text-white" : ""} min-h-screen`
        }>
            <div className={`${isDarkMode ? "bg-black text-white" : "bg-white text-black"} shadow-md rounded-lg py-16 overflow-hidden`}>
                {/* Header */}
                <div className=" px-4 py-2 text-center">
                    {/* User Avatar */}
                    <img className="w-32 h-32 rounded-full object-cover mx-auto mb-4" src={`${process.env.REACT_APP_BACKEND_URI}/storage/profiles/${user.picture}`} alt="User Avatar" />
                    {/* User Name */}
                    <h2 className="text-xl font-semibold">{user?.first_name} {user?.last_name}</h2>
                    {/* Job Title */}
                    <p className="text-sm ">Software Engineer</p>
                </div>
                {/* Body */}
                <div className="p-4 text-center">
                    {/* Description */}
                    <p className=" mb-4">Passionate about building innovative software solutions.</p>
                    {/* Follower Count */}
                    <div className="flex justify-center mb-4">
                        <div className="flex flex-col  justify-center mr-6">
                            <span className="">Followers</span>
                            <span className=" font-semibold">{user?.followers}</span>
                        </div>
                        <div className="mr-6 flex flex-col  justify-center">
                            <span className="">Following</span>
                            <span className=" font-semibold">{user?.following}</span>
                        </div>
                        <div className='flex flex-col  justify-center'>
                            <span className="">Posts</span>
                            <span className="font-semibold">{user?.posts}</span>
                        </div>
                    </div>
                    {/* Buttons */}
                    <div className="flex space-x-4 justify-center">
                        {/* Follow Button */}
                        {auth.id != user.id && (
                            followStatus == "followed" ? <button
                                onClick={Unfollowe}
                                className=" text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-xs py-1 px-4  text-center "  >Fllowing</button>
                                : <button
                                    onClick={following}
                                    className=" text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-xs py-1 px-4  text-center "  >Fllow</button>
                        )


                        }
                        {auth.id != user?.id &&

                            < Link to={`/chat?userid=${user?.id}`}
                                className=" text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-xs py-1 px-4  text-center "   >Message</Link>
                        }
                    </div>
                </div>
            </div>
            <section className=' flex w-full'>
                <aside className='sticky top-0 w-1/4 mx-2  border-4 rounded-xl'>
                </aside>
                <div className='w-2/3 space-y-10 min-h-screen ms-6'>
                    {posts.map(item => <Post post={item} />)}
                </div>
            </section>
        </main >)
}
