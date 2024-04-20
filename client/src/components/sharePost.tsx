import { PaperAirplaneIcon, PaperClipIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import api from '../tools/api'
import { useDispatch, useSelector } from 'react-redux'
import { appendNewPost } from '../redux/actions/actionCreators'
import { Toaster, toast } from 'sonner'

export default function SharePost() {
    const specificStateSelector = (state: any) => ({
        auth: state.auth,
        isDarkMode: state.isDarkMode,
    });
    const { auth, isDarkMode } = useSelector(specificStateSelector)
    const dispatch = useDispatch()
    const [postFile, setPostFile] = useState<any>()
    const [title, setTitle] = useState<string>("")
    const [user_id, setUserId] = useState(auth.id)
    const [uploadProgress, setUploadProgress] = useState(0);
    const submit = async (e: any) => {
        e.preventDefault();
        const resp = await api.post("api/post/store", { postFile, title, user_id }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                const total = progressEvent.total ?? 1;
                const progress = Math.round((progressEvent.loaded / total) * 100);
                postFile && setUploadProgress(progress);
            }
        }

        );
        if (resp.data.success) {
            setTitle("")
            console.log(resp.data.post)
            dispatch(appendNewPost(resp.data.post))
            toast.success(resp.data.message)
            setUploadProgress(0)
        }
    }
    return (
        <div className={` w-full px-4 flex  border-2 shadow-2xl flex-col items-center rounded-xl ${isDarkMode ? "bg-slate-900 " : "bg-white"}   lg:w-3/4`}>
            {/* <Toaster position="bottom-right" /> */}
            {uploadProgress > 0 && (
                <div className="relative w-full pt-1">
                    <div className="flex mb-2 items-center justify-between">
                        <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                                Uploading...
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-green-600">
                                {uploadProgress}%
                            </span>
                        </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                        <div
                            style={{ width: `${uploadProgress}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                        ></div>
                    </div>
                </div>
            )}
            <textarea name="" id="mytextarea" value={title} onChange={e => setTitle(e.target.value)} placeholder={`What's on your mind, ${auth.first_name?.toUpperCase()}?`} className={`w-full mt-2 rounded-xl ${isDarkMode ? 'bg-gray-800' : "bg-gray-200"}    text-md border-none  resize-none`} rows={2}></textarea>
            <form onSubmit={submit} encType="multipart/form-data" className="w-full space-y-2">
                <input type="file" onChange={e => setPostFile(e.target?.files ?? [0])} name="Postfile" className='hidden' id="post-file" />
                <div className='flex w-full  items-center justify-between'>
                    <button type='button' onClick={() => {
                        document?.getElementById("post-file")?.click()
                    }} className='text-md  font-bold  text-sky-600 p-4'>File <PaperClipIcon className='w-6 h-6 inline-block mx-1 ' />
                    </button >
                    <button type={"submit"} className='text-md  font-bold  text-sky-600 p-4'>Send<PaperAirplaneIcon className='w-6 h-6 inline-block mx-1 text-sky-600' /></button>
                </div>
            </form>

        </div>
    )
}
