import React from 'react'
import { useSelector } from 'react-redux';
import clsx from 'clsx';

export default function RightSideBoxChat({ message }: any) {
    const specificStateSelector = (state: any) => ({
        auth: state.auth,
    });
    const { auth } = useSelector(specificStateSelector);

    return (
        <div className="col-start-6 col-end-13 p-1">
            <div className="relative flex flex-row-reverse group">
                <div className={clsx(message.message_deleted_at ? '' : 'lg:pr-20', `px-3 py-2 text-xs text-black  bg-[#bbf7d0] rounded-md lg:text-sm`)}>


                    {/* Chat Body */}
                    <div className="break-all whitespace-pre-wrap">{message.message}</div>



                </div>



                <div className={`absolute top-0 w-4 h-4  bg-[#bbf7d0]  rounded-br-full -right-2`}></div>
            </div>
        </div >)
}
