import React, { useEffect, useState } from 'react';
import { Button } from "@mui/material";
import api from '../tools/api';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FEEDS } from '../routes/routes';
import toast from 'react-hot-toast';
import { updateProfile } from '../redux/actions/actionCreators';

function FileUpload() {
    const { auth } = useSelector((state: any) => state)
    const [first_name, setFirstName] = useState<String>()
    const [last_name, setLastName] = useState<String>()
    const [email, setEmail] = useState<String>()
    const [picture, setPicture] = useState<any>()
    const { isDarkMode } = useSelector((state: any) => state)
    const navigate = useNavigate()
    const _method = "patch"


    useEffect(() => {
        setFirstName(auth.first_name)
        setLastName(auth.last_name)
        setEmail(auth.email)

    }, [auth])







    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        console.log(file)

        if (file) {
            setPicture(file);
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
    const dispatch = useDispatch()
    const uploadFile = async (e: any) => {
        e.preventDefault();
        try {

            const resp = await api.post("api/profile/picture/update", { first_name, _method, last_name, picture }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (resp?.data.success) {
                dispatch(updateProfile(resp?.data.user))
                toast.success("Your profile Picture has been Added!");
                navigate(FEEDS)
            }
        } catch (error) {
            console.log(error)
        }

    };

    const skipUpload = () => {
        // Implement skipping the upload
        console.log("Skipping file upload");
    };

    return (

        <div className={`min-h-screen flex flex-col justify-center items-center ${isDarkMode ? "bg-black" : "bg-gray-100"} `}>

            <div className=" p-8 rounded-md ">
                <div className="flex justify-center mb-8">
                    <div className="relative rounded-full w-32 h-32">
                        <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} />
                        <img id="previewImage" className="w-full h-full rounded-full object-cover" src="" alt="" />
                        <div onClick={() => document.getElementById("fileInput")?.click()} className={`absolute inset-0 flex justify-center rounded-full items-center border ${isDarkMode ? "border-white bg-white" : "border-black"}  bg-opacity-10 hover:bg-white cursor-pointer`}>
                            <img className="w-10 opacity-30" src="https://www.svgrepo.com/show/33565/upload.svg" alt="Upload" />
                        </div>
                    </div>
                </div>
                <Button variant="contained" color="primary" className='mr-10 w-20 ' onClick={uploadFile}>save</Button>
                <Link to={FEEDS}> <Button variant="outlined" color="primary" className="ml-10 w-30">
                    Skip</Button>
                </Link>
            </div>
            <ul>

                <li className='text-xs'>select your profile picture then click on save !!</li>
                <li className='text-xs'>Click Skip for Ignore !!</li>
            </ul>
        </div>

    );
}

export default FileUpload;