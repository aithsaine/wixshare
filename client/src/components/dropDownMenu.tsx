import { BookmarkIcon, ClipboardDocumentListIcon, TrashIcon } from '@heroicons/react/24/solid'
import React from 'react'

export default function DropDownMenu({ post }: any) {
    return (
        <div className='flex  flex-col  p-0'>
            <ul className='p-0'>
                <li className='text-xs py-1 cursor-pointer hover:text-black hover:bg-gray-200 font-bold space-x-2  flex my-3'><TrashIcon className='w-6 h-6 p-1 me-1  bg-red-600 rounded-xl text-white' /> delete</li>
                <li className='text-xs py-1 cursor-pointer hover:text-black hover:bg-gray-200 font-bold space-x-2 flex my-3'><ClipboardDocumentListIcon className='w-6 me-1  p-1 h-6 rounded-xl bg-sky-700 text-white' /> copy link</li>
                <li className='text-xs py-1 cursor-pointer hover:text-black hover:bg-gray-200 font-bold space-x-2 flex my-3'><BookmarkIcon className='w-6 h-6 me-1  bg-black p-1 rounded-xl text-white' /> save </li>
            </ul>


        </div >
    )
}
