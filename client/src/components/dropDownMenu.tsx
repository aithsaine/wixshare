import { BookmarkIcon, ClipboardDocumentListIcon, TrashIcon } from '@heroicons/react/24/solid'
import React from 'react'
import api from '../tools/api'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost } from '../redux/actions/actionCreators'

export default function DropDownMenu({ post }: any) {
    const { auth } = useSelector((state: any) => state)

    const dispatch = useDispatch()
    const deleting = async (e: any) => {


        const uploadPromise = api.delete(`api/post/${post.id}/delete`);

        toast.promise(
            uploadPromise,
            {
                loading: 'deleting this post...',
                success: (response) => {
                    if (response?.data.success) {
                        dispatch(deletePost(post.id))
                        return 'Your post has been deleted';
                    }
                },
                error: (error) => {

                    return 'Failed to deleting this post';
                },
            }
        );
    };


    return (
        <div className='flex  flex-col  p-0'>
            <ul className='p-0'>
                {auth.id == post.user_id && <li onClick={deleting} className='text-xs py-1 cursor-pointer hover:text-black hover:bg-gray-200 font-bold space-x-2  flex my-3'><TrashIcon className='w-6 h-6 p-1 me-1  bg-red-600 rounded-xl text-white' /> delete</li>
                }                <li className='text-xs py-1 cursor-pointer hover:text-black hover:bg-gray-200 font-bold space-x-2 flex my-3'><ClipboardDocumentListIcon className='w-6 me-1  p-1 h-6 rounded-xl bg-sky-700 text-white' /> copy link</li>
                <li className='text-xs py-1 cursor-pointer hover:text-black hover:bg-gray-200 font-bold space-x-2 flex my-3'><BookmarkIcon className='w-6 h-6 me-1  bg-black p-1 rounded-xl text-white' /> save </li>
            </ul>


        </div >
    )
}
