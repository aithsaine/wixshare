import React from 'react';
import "../assets/styles/loading.css"
import { useSelector } from 'react-redux';
import Loader from "react-js-loader";

function Loading() {
    const { isDarkMode } = useSelector((state: any) => state)

    return (
        <div className={`w-full flex items-center justify-center min-h-screen ${isDarkMode ? "bg-black" : "bg-white"}`}>

            <Loader type="box-rectangular" bgColor={"green"} color={"green"} size={50} />

        </div>

    );
}

export default Loading;