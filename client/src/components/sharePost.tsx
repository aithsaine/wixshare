import { PaperAirplaneIcon, PaperClipIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import api from '../tools/api'
import { useDispatch, useSelector } from 'react-redux'
import { appendNewPost } from '../redux/actions/actionCreators'
import { Toaster, toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

export default function SharePost() {
    const specificStateSelector = (state: any) => ({
        auth: state.auth,
        isDarkMode: state.isDarkMode,
    });
    const navigate = useNavigate()
    const { auth, isDarkMode } = useSelector(specificStateSelector)
    const dispatch = useDispatch()
    const [postFiles, setpostFiles] = useState<any>()
    const [title, setTitle] = useState<string>("")
    const [user_id, setUserId] = useState(auth?.id)
    const [uploadProgress, setUploadProgress] = useState(0);
    const [selecedFiles, setSelectedFiles] = useState<any>([]);
    const handlDelete = (file: any) => {
        setSelectedFiles(selecedFiles.filter((item: any) => item !== file))

    }
    useEffect(() => {
        const ar: any[] = []
        for (let i = 0; i < postFiles?.length; i++) {
            ar[i] = postFiles[i]
        }
        setSelectedFiles(ar)
    }, [postFiles])
    const submit = async (e: any) => {
        e.preventDefault();
        const savePromise = api.post("api/post/store", { postFiles: selecedFiles, title, user_id }, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                const total = progressEvent.total ?? 1;
                const progress = Math.round((progressEvent.loaded / total) * 100);
                postFiles && setUploadProgress(progress);
            }
        });
        toast.promise(
            savePromise,
            {
                loading: 'Posting ...',
                success: (response) => {
                    if (response?.data.success) {
                        setTitle("")
                        dispatch(appendNewPost(response?.data.post))
                        setSelectedFiles([])
                        setUploadProgress(0)
                        setpostFiles(null)



                        return 'Your Post shared with success';
                    }
                },
                error: (error) => {
                    if (error?.response?.data?.cover?.[0]) {
                        return error.response.data.cover[0];
                    }
                    return 'Failed to share your post';
                },
            }
        );

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
            <textarea name="" id="mytextarea" value={title} onChange={e => setTitle(e.target.value)} placeholder={`What's on your mind, ${auth?.first_name?.toUpperCase()}?`} className={`w-full mt-2 rounded-xl ${isDarkMode ? 'bg-gray-800' : "bg-gray-200"}    text-md border-none  resize-none`} rows={2}></textarea>
            <form onSubmit={submit} encType="multipart/form-data" className="w-full space-y-2">
                <input type="file" multiple onChange={(e: any) => {
                    setpostFiles(e.currentTarget.files ?? [])
                }
                } name="postFiles" className='hidden' id="post-file" />
                <div className='flex w-full  items-center justify-between'>
                    <button type='button' onClick={() => {
                        document?.getElementById("post-file")?.click()
                    }} className='text-md  font-bold  text-sky-600 p-4'>
                        File <PaperClipIcon className='w-6 h-6 inline-block mx-1 ' />
                    </button >
                    <button type={"submit"} className='text-md  font-bold  text-sky-600 p-4'>Send<PaperAirplaneIcon className='w-6 h-6 inline-block mx-1 text-sky-600' /></button>
                </div>
            </form>
            <div className="mt-4 flex  justify-start gap-4">
                {selecedFiles && selecedFiles.map((file: any, index: number) => (
                    <div key={index} className="flex mb-4  relative">
                        <img src={URL.createObjectURL(file)} alt={file.name} className="w-12 h-12 object-cover rounded-md" />
                        <button className="absolute -top-3 -right-3  bg-red-500 text-white rounded-full px-2" onClick={() => handlDelete(file)}>x</button>                </div>
                ))}

            </div>
        </div>
    )
}