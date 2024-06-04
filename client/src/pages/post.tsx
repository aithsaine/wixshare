import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useNavigation, useNavigationType, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loading from '../components/loading'

import api from '../tools/api'
import Post from '../components/post'
import Comment from '../components/comment'

import CommentItem from '../components/commentItem'
import { HandThumbDownIcon, HandThumbUpIcon, PaperAirplaneIcon, XCircleIcon } from '@heroicons/react/24/solid'
import InputEmojiWithRef from 'react-input-emoji'
import { ImageList, ImageListItem } from '@mui/material'
import VideoPlayer from '../components/videoPlayer'
import { Image } from 'primereact/image'
import fakePicture from "../assets/imgs/profile.png"

export default function PostDetails() {
    const navigate = useNavigate();
    const { id } = useParams()
    const [post, setPost] = useState<any>()
    const [load, setLoad] = useState(true)
    const [comments, setComments] = useState<any>()
    const [newComment, setNewComment] = useState<string>("")
    const { isDarkMode, auth } = useSelector((state: any) => state)
    const [itemCmt, setItemCmt] = useState<any>(null);
    const [lks, setLikes] = useState(0)
    const [dsl, setDislikes] = useState(0)
    const [reactType, setReactType] = useState(post?.reaction)
    const [cols, setCols] = useState<number>(1)

    const saveComment = async () => {
        setItemCmt(<CommentItem filename={auth?.picture} user_name={`${auth?.first_name} ${auth?.last_name}`} date={"Shareing your comment ..."} user_id={auth.user_id} content={newComment} />)
        const resp = await api.post("/api/comment/store", {
            post_id: post?.id, user_id: auth?.id, content: newComment
        })
        if (resp.data.status === "success") {
            setComments([resp.data.comment, ...comments])
            setItemCmt(null)
            setNewComment("")
        }
    }
    const getPost = async (PostId: any) => {
        try {
            const response = await api.get(`api/post/${PostId}/detail`)
            if (response?.data.success) {
                setPost(response?.data.post)
                setLikes(response?.data.post?.likes)
                setDislikes(response?.data.post?.dislikes)
                setComments(response?.data.comments)
                return setLoad(false)
            }
            return navigate(-1)

        } catch (e) {
            return navigate(-1)
        }

    }
    useEffect(() => {
        if (id !== null && id !== undefined) {
            getPost(id)



        }

    }, [id])



    const videoExtensions = ["mp4", "mkv"]
    const imageExtensions = ["jpg", "png", "webp"]
    const numberOfFiles = post?.files.length

    const submitHandler = async (e: any, type: String) => {
        e.preventDefault()
        if (reactType == "like") {
            if (type == "like") {

                setLikes(lks - 1)
                setReactType("none")
            }
            else {
                setLikes(lks - 1)
                setDislikes(dsl + 1)
                setReactType(type)
            }

        }
        else if (reactType == "dislike") {
            if (type == "dislike") {
                setDislikes(dsl - 1)
                setReactType("none")
            }
            else {
                setDislikes(dsl - 1)
                setLikes(lks + 1)
                setReactType(type)
            }
        }
        else {
            if (type == 'like') {
                setLikes(lks + 1)
            }
            else {
                setDislikes(dsl + 1)
            }
            setReactType(type)
        }
        const resp = await api.post("api/reaction/store", { type, user_id: auth?.id, post_id: post?.id })
        setLikes(resp?.data?.post?.likes)
        setDislikes(resp?.data?.post?.dislikes)
        setReactType(resp.data?.post?.reaction)


    }
    function countPicture(number: number) {

        switch (number) {
            case 2:
                return 2
            case 3:
                return 2
            case 4:
                return 2
            case 5:
                return 3
            case 6:
                return 3
            case 7:
                return 4
            case 8:
                return 4
            default:
                return 1

        }
    }
    useEffect(() => {
        setCols(countPicture(numberOfFiles))

    }, [])

    if (load) {
        return <Loading />
    }

    return (
        <section className='flex mt-6 flex-col md:flex-row h-screen items-start justify-center'>
            <div className="md:w-1/2 w-full">
                {
                    post && (

                        <div key={post?.id}
                            className={`w-full h-full my-4 p-2 relative flex  flex-col items-start mt-4 rounded-xl ${isDarkMode ? "bg-slate-900 text-white sd " : "text-black bg-white "} `}>
                            <Link to={`/account/${post?.user_id}`} className="flex items-center">
                                <img className="rounded-full object-cover h-10 w-10" src={post?.user_picture != "" ? `${process.env.REACT_APP_BACKEND_URI}/storage/profiles/${post?.user_picture}` : fakePicture} />
                                <div className="ml-2 flex flex-col items-start">
                                    <div className={`leading-snug text-sm ${isDarkMode ? "text-white" : ""}  font-bold`}>{post?.user_name?.toUpperCase()}</div>
                                    <div className={`leading-snug text-xs ${isDarkMode ? "text-gray-400" : ""} `}>{post?.date}</div>
                                </div>
                            </Link>


                            <p className={"m-4"}>{post?.title}</p>
                            {post?.files.length > 1 ?
                                <ImageList variant="masonry" cols={cols} gap={2}>
                                    {post?.files &&
                                        post?.files.map((item: any) => {
                                            const fileExt = item.split(".")?.slice(-1)
                                            return (
                                                <ImageListItem key={item}>

                                                    {fileExt && videoExtensions.includes(fileExt[0]) ?

                                                        < VideoPlayer file={`http://localhost:8000/storage/posts/${post?.id}/${item}`
                                                        } /> :
                                                        fileExt && imageExtensions.includes(fileExt[0]) ?
                                                            < Image preview

                                                                loading="lazy" className={`cursor-pointer w-full  border-2 `} src={`http://localhost:8000/storage/posts/${post?.id}/${item}`} /> : <></>
                                                    }                                    </ImageListItem>
                                            )

                                        })
                                    }
                                </ImageList>
                                :
                                post?.files &&
                                post?.files.map((item: any) => {
                                    const fileExt = item.split(".")?.slice(-1)
                                    return (
                                        <ImageListItem className="w-full" key={item}>

                                            {fileExt && videoExtensions.includes(fileExt[0]) ?

                                                < VideoPlayer file={`http://localhost:8000/storage/posts/${post?.id}/${item}`
                                                } /> :
                                                fileExt && imageExtensions.includes(fileExt[0]) ?
                                                    < Image preview

                                                        loading="lazy" className={` w-full cursor-pointe border-2 `} src={`http://localhost:8000/storage/posts/${post?.id}/${item}`} /> : <></>
                                            }                                    </ImageListItem>
                                    )

                                })
                            }


                            <div className={"m-4 flex  items-center justify-between w-full"}>
                                <div>

                                    <span className={"text-sm"}>{lks}</span>
                                    <label title={"like"} onClick={e => submitHandler(e, "like")} htmlFor={"like"}><HandThumbUpIcon
                                        className={`w-10 h-6 inline-block cursor-pointer transform transition duration-300 hover:scale-125 ${reactType == 'like' ? "text-green-800" : "text-green-100"}`} /></label>
                                    <label title={"dislike"} onClick={e => submitHandler(e, "dislike")} htmlFor={"dislike"} ><HandThumbDownIcon
                                        className={`w-10 h-6 inline-block cursor-pointer transform transition duration-300 hover:scale-125 ${reactType == "dislike" ? 'text-red-800' : "text-red-100"}`} /></label>
                                    <span className={"text-sm"}>{dsl}</span>
                                </div>



                            </div>

                        </div >
                    )
                }









            </div>
            <div className="md:w-1/2 w-full">
                {comments && (
                    <div className="w-full py-4 ">
                        <div className="flex mx-4 " >

                            <InputEmojiWithRef
                                cleanOnEnter={true}
                                value={newComment}
                                borderColor="black"
                                onChange={setNewComment}
                                placeholder="Type your comment here..."
                                shouldReturn={true} // Add this prop
                                keepOpened={true}
                                shouldConvertEmojiToImage={false} // Add this prop
                            />

                            <PaperAirplaneIcon onClick={saveComment} className="w-6 cursor-pointer " title="Save comment" />
                        </div >
                        <div className="flex flex-col p-2">
                            {itemCmt}
                            {comments.map((comment: any) => <CommentItem filename={comment.picture} user_name={comment.user_name} user_id={comment.user_id} date={comment.date} content={comment.content} />)
                            }
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
