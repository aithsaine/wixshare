import React, { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { CogIcon, MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import api from "../tools/api";
import { search as actionSearch } from "../redux/actions/actionCreators";
import SuggestItem from "./suggestItem";
import { LoaderIcon } from "react-hot-toast";
import useSearchHandler from "../hooks/useSearchHandler";
export default function SearchModal() {
    const { isDarkMode } = useSelector((state: any) => state)
    const [visible, setVisible] = useState<boolean>(false);
    const { search } = useSelector((state: any) => state)
    const { changeHandler, searchQuery, processing, users } = useSearchHandler();









    return (
        <div className="card flex items-center  justify-content-center">

            <Button className=" text-white w-14 h-14 rounded-full" icon={<MagnifyingGlassCircleIcon className="text-sky-400" />} onClick={() => setVisible(true)} />

            <Dialog className={`shadow-2xl h-screen shadow-black ${isDarkMode ? "bg-slate-800 text-white" : " bg-slate-100 text-black"} p-4`} header={
                <div className="relative flex mb-4">
                    <input

                        defaultValue={search.searchquery}
                        onChange={changeHandler}
                        type="search"
                        className="relative m-0 block flex-auto rounded border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:text-white dark:placeholder:text-neutral-200 dark:autofill:shadow-autofill dark:focus:border-primary"
                        placeholder="Search"
                        aria-label="Search"
                        id="searchInput"
                        aria-describedby="button-addon2" />
                    <span
                        className="flex items-center whitespace-nowrap px-3 py-[0.25rem] text-surface dark:border-neutral-400 dark:text-white [&>svg]:h-5 [&>svg]:w-5"
                        id="button-addon2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </span>
                </div>
            } visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                <div>
                    {!processing ? users?.map((elem: any) =>
                        <div onClick={e => setVisible(false)} key={elem.id}>

                            <SuggestItem user={elem} />
                        </div>
                    ) : <LoaderIcon />}
                </div>

            </Dialog>
        </div>
    )
}

