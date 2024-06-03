import React, { useEffect, useState } from 'react'
import { Editor } from "primereact/editor";
import api from '../tools/api';
import { useDispatch, useSelector } from 'react-redux';
import { addAuthDescription } from '../redux/actions/actionCreators';
import { toast } from 'sonner';

export default function SettingDescription() {
    const { auth } = useSelector((state: any) => state)
    const [allowUpdate, setAllowUpdate] = useState(false)
    const [description, setDescription] = useState(auth.description)
    useEffect(() => {
        if (description == null) {
            setAllowUpdate(false)
        }
    }, [description])
    const dispatch = useDispatch()
    const update = async () => {
        try {
            const resp = await api.patch("api/profile/description", { description })
            if (resp?.data.success) {
                dispatch(addAuthDescription(resp?.data.description))
                toast.success("The description has been Added!")
            }

        } catch (error: any) {
            console.log(error)
            toast.error(error?.response.data.description[0] ?? "Somethink wrong")
        }
    }
    return (
        <section className={`flex w-full flex-col  p-10 space-y-6 `}>

            <div className='w-full'>

                <Editor
                    headerTemplate={
                        <span className="ql-formats">
                            <button className="ql-bold" aria-label="Bold"></button>
                            <button className="ql-italic" aria-label="Italic"></button>
                            <button className="ql-underline" aria-label="Underline"></button>
                        </span>
                    } value={description} onTextChange={(e: any) => {
                        setDescription(e.htmlValue)
                        setAllowUpdate(true)
                    }} style={{ height: '320px' }} />
            </div>
            <div>
                <button onClick={update} className={`flex-1 ${allowUpdate ? "bg-blue-600 dark:bg-blue-800 text-white cursor-pointer hover:bg-blue-800 dark:hover:bg-blue-900" : "cursor-not-allowed"} rounded-full bg-gray-600  text-gray-400  antialiased font-bold  px-4 py-2`}                        >Update</button>
            </div>
        </section>)
}
