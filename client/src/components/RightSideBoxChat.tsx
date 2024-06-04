import React from 'react'
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { LoaderIcon } from 'react-hot-toast';
import fakeProfile from "../assets/imgs/profile.png"
export default function RightSideBoxChat({ message, processing = false }: any) {
    const specificStateSelector = (state: any) => ({
        auth: state.auth,
    });
    const { auth } = useSelector(specificStateSelector);

    return (
        <>

            <div className="col-start-6 col-end-13 p-1">
                <div className="relative flex flex-row-reverse group">
                    <div className={clsx(message.message_deleted_at ? '' : 'lg:pr-20', `px-3 py-2 me-6 text-xs text-black  bg-[#bbf7d0] rounded-md lg:text-sm`)}>

                        {/* Chat Body */}
                        <div className="break-all whitespace-pre-wrap">{message.message}</div>
                        {processing && <span className='flex items-center text-xs text-gray-600'><LoaderIcon /> sending</span>}
                    </div>



                    <div className={`absolute top-0 w-4 h-4  bg-[#bbf7d0]  rounded-br-full right-4`}></div>
                    <img src={auth?.picture ? `${process.env.REACT_APP_BACKEND_URI}/storage/profiles/${auth?.picture}` : fakeProfile} className='w-6 h-6 rounded-full absolute top-0  rounded-br-full -right-4' alt="" />

                </div>
            </div >
        </>
    )
}
