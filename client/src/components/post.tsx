
import { HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/24/solid"
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { EllipsisHorizontalIcon, ChatBubbleBottomCenterTextIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from "react-redux";
import api from "../tools/api";
import { Link } from "react-router-dom";
import VideoPlayer from "./videoPlayer";
import Comment from "./comment";
import { ImageList, ImageListItem } from "@mui/material";
import { Image } from "primereact/image";
import DropDownMenu from "./dropDownMenu";
import fakePicture from "../assets/imgs/profile.png"

export default function Post({ post }: any) {
    const reference = useRef(null)
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const specificStateSelector = (state: any) => ({
        auth: state.auth,
        isDarkMode: state.isDarkMode,
    });
    const { auth, isDarkMode } = useSelector(specificStateSelector)
    const [lks, setLikes] = useState(post?.likes ?? 0)
    const [dsl, setDislikes] = useState(post?.dislikes ?? 0)
    const [reactType, setReactType] = useState(post?.reaction)
    const [commentsCnt, setCommentsCnt] = useState(post?.commentsCount ?? 0)
    useEffect(() => {
        const handleClickOutside = (event: any) => {

            let em: any = reference.current;
            if (em) {

                if (!em.contains(event.target)) {
                    setIsOpenMenu(false);

                }
            }

        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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


    // edit post
    const [load, setLoad] = useState(false)

    const videoExtensions = ["mp4", "mkv"]
    const imageExtensions = ["jpg", "png", "webp"]
    const numberOfFiles = post?.files.length
    const [cols, setCols] = useState<number>(1)
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
    return (
        post && (

            <div key={post?.id} style={{ minHeight: "20px" }}
                className={`w-full my-4 p-2 relative flex  flex-col items-start mt-4 rounded-xl ${isDarkMode ? "bg-slate-900 text-white sd shadow-whide" : "text-black bg-white shadow-md"} lg:w-3/4`}>
                <Link to={`/account/${post?.user_id}`} className="flex items-center">
                    <img className="rounded-full object-cover h-10 w-10" src={post?.user_picture != "" ? `${process.env.REACT_APP_BACKEND_URI}/storage/profiles/${post?.user_picture}` : fakePicture} />
                    <div className="ml-2 flex flex-col items-start">
                        <div className={`leading-snug text-sm ${isDarkMode ? "text-white" : ""}  font-bold`}>{post?.user_name?.toUpperCase()}</div>
                        <div className={`leading-snug text-xs ${isDarkMode ? "text-gray-400" : ""} `}>{post?.date}</div>
                    </div>
                </Link>

                <button onClick={(e: any) => setIsOpenMenu(!isOpenMenu)} className={"right-0 absolute "}><EllipsisHorizontalIcon className={"w-10 h-6 font-bold   inline-block cursor-pointer"} /></button>
                {isOpenMenu &&
                    <div ref={reference} className={`absolute right-0 top-8  z-50 p-0  shadow-sm shadow-slate-500  mt-0 ${isDarkMode ? "bg-slate-800 text-white  shadow-white" : "bg-white text-gray-800"} w-32 overflow-y-auto   rounded-md shadow-sm `}>
                        <DropDownMenu setIsOpenMenu={setIsOpenMenu} post={post} />
                    </div>
                }
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


                <div className={"m-4 flex items-center justify-between w-full"}>
                    <div>

                        <span className={"text-sm"}>{lks}</span>
                        <label title={"like"} onClick={e => submitHandler(e, "like")} htmlFor={"like"}><HandThumbUpIcon
                            className={`w-10 h-6 inline-block cursor-pointer transform transition duration-300 hover:scale-125 ${reactType == 'like' ? "text-green-800" : "text-green-100"}`} /></label>
                        <label title={"dislike"} onClick={e => submitHandler(e, "dislike")} htmlFor={"dislike"} ><HandThumbDownIcon
                            className={`w-10 h-6 inline-block cursor-pointer transform transition duration-300 hover:scale-125 ${reactType == "dislike" ? 'text-red-800' : "text-red-100"}`} /></label>
                        <span className={"text-sm"}>{dsl}</span>
                    </div>

                    <div className={"me-6 t text-sky-600"}>
                        <button className="flex space-x-2" onClick={e => setLoad(true)} title={"comments"}><span className={`${isDarkMode ? "text-white" : "text-black"} `}>{commentsCnt}</span><ChatBubbleBottomCenterTextIcon className={"bg-sk w-6"} /></button>  {/*"comments button"*/}
                        {load && (

                            <Comment setLoad={setLoad} commentsCnt={commentsCnt} setCommentsCnt={setCommentsCnt} user_id={auth?.id} post_id={post?.id} />
                        )}
                    </div>

                </div>

            </div >
        )
    )
    // 
}
