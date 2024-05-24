import { TextField } from '@mui/material';
import React, { useState } from 'react'
import InputError from './InputError';
import { useDispatch, useSelector } from 'react-redux';
import api from '../tools/api';
import { updateProfile } from '../redux/actions/actionCreators';
import { toast } from 'sonner';
export default function UpdateInformations({ user }: any) {
    const [firstName, setfirstName] = useState(user?.first_name);
    const { isDarkMode } = useSelector((state: any) => state)
    const [birthday, setBirthday] = useState(user?.birthday)
    const [lastName, setlastName] = useState(user?.last_name)
    const [picture, setPicture] = useState(user?.picture)
    const dispatch = useDispatch()
    const [allowUpdate, setAllowUpdate] = useState(false)
    const handleFileChange = (e: any) => {
        const file = e.target.files[0];

        setPicture(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Update the image preview if the element exists
                const previewImage = document.getElementById("previewImage") as HTMLImageElement | null;
                if (previewImage) {
                    previewImage.src = reader.result as string;
                }
            };

            reader.readAsDataURL(file);
        }
    };


    const Update = async () => {
        const formdata: FormData = new FormData()
        formdata.append("first_name", firstName)
        formdata.append("last_name", lastName)
        formdata.append("picture", picture)
        formdata.append("birthday", birthday)
        formdata.append("_method", "patch")
        try {
            if (allowUpdate) {
                const resp = await api.post("api/profile", formdata, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }


                })
                if (resp?.data.success) {
                    dispatch(updateProfile(resp?.data.user))
                    toast.success("your informations updated with success")
                }
            }

        } catch (e) {
            toast.error("something went wrong repeat later")
        }
    }
    return (
        <section className={`flex w-full flex-col  p-10 space-y-6 `}>
            <div>
                <div className="relative rounded-full w-32 h-32">
                    <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} />
                    <img id="previewImage" className="w-full h-full rounded-full object-cover" src={`${process.env.REACT_APP_BACKEND_URI}/storage/profiles/${user?.picture}`} alt="" />
                    <div onClick={() => document.getElementById("fileInput")?.click()} className={`absolute inset-0 flex justify-center rounded-full items-center border ${isDarkMode ? "border-white bg-white" : "border-black"}  bg-opacity-10 hover:bg-white cursor-pointer`}>
                        <img className="w-10 opacity-10" src="https://www.svgrepo.com/show/33565/upload.svg" alt="Upload" />
                    </div>
                </div>
            </div>
            <div className="flex w-full space-x-2 ">

                <div className={`flex w-1/2 flex-col `}>
                    <TextField id="standard-basic"
                        className='w-full'
                        value={firstName}
                        onChange={e => {
                            setfirstName(e.target.value)
                            setAllowUpdate(true)
                        }}
                        label="First Name"
                        variant="standard" />
                    <InputError message={""} className="mt-2" />

                </div>
                <div className="flex w-1/2">
                    <TextField id="standard-basic"
                        value={lastName}
                        className='w-full'

                        onChange={e => {
                            setlastName(e.target.value)
                            setAllowUpdate(true)
                        }}
                        label="Last Name"
                        variant="standard" />
                    <InputError message={""} className="mt-2" />
                </div>
            </div>

            <div className="flex w-full  space-x-2">

                <div className='md:w-1/2'>
                    <TextField
                        id="birthday-input"
                        type="date"
                        className='w-full'
                        value={birthday}
                        onChange={e => {
                            setBirthday(e.target.value)
                            setAllowUpdate(true)
                        }}
                        label="Birthday"
                        variant="standard"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <InputError message={""} className="mt-2" />



                </div>
                <div className="w-1/2">
                </div>
            </div>
            <div>
                <button onClick={Update} className={`flex-1 ${allowUpdate ? "bg-blue-600 dark:bg-blue-800 text-white cursor-pointer hover:bg-blue-800 dark:hover:bg-blue-900" : ""} rounded-full bg-gray-600 cursor-not-allowed text-gray-400  antialiased font-bold  px-4 py-2`}                        >Update</button>
            </div>
        </section >
    )
}
