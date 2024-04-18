import { useEffect, useState } from "react";
import { PaperAirplaneIcon, XCircleIcon } from "@heroicons/react/24/solid";
import InputEmoji from "react-input-emoji";
import CommentItem from "./commentItem";
import api from "../tools/api";
import { useSelector } from "react-redux";
export default function Comment({ user_id, post_id, setLoad, commentsCnt, setCommentsCnt }: any) {
    const [comments, setComments] = useState<any>([]);
    const [newComment, setNewComment] = useState<string>("")
    const { isDarkMode } = useSelector((state: any) => state)

    useEffect(() => {
        const getComments = async () => {
            const response = await api.get(`/api/comments/${post_id}/`)
            if (response.data.status == "success") {
                setComments(response.data.comments)
            }

        }
        getComments()

        console.log(comments)

    }, [])

    const saveComment = async () => {
        const resp = await api.post("/api/comment/store", {
            post_id, user_id, content: newComment
        })
        if (resp.data.status === "success") {
            setComments([resp.data.comment, ...comments])
            setCommentsCnt(commentsCnt + 1)
            setNewComment("")
        }
    }
    return (
        <div className="fixed  overflow-hidden z-10 inset-0 ">
            <div className="flex  items-center justify-center min-h-screen ">
                <div className="fixed inset-0 transition-opacity overflow-hidden" >
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className={`${isDarkMode ? "text-white bg-slate-900" : "bg-white text-black"}    rounded-lg  shadow-xl transform transition-all max-w-lg w-full`}>
                    <button onClick={e => setLoad(false)}><XCircleIcon className={"w-6"} /></button>
                    <div style={{ minHeight: "300px", maxHeight: "300px" }} className={"flex w-full   overflow-y-auto"}>
                        <div className="w-full ">
                            <div className="flex px-4 " >

                                <InputEmoji
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
                                {comments && comments.map((comment: any) => <CommentItem filename={comment.picture} user_name={comment.user_name} user_id={comment.user_id} date={comment.date} content={comment.content} />)}
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </div>


    )

}
