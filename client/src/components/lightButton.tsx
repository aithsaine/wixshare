import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLightMode } from '../redux/actions/actionCreators';

const LightButton = () => {
    const { isDarkMode } = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const toggleMode = () => {
        isDarkMode ? localStorage.setItem("light_mode", "light") : localStorage.setItem("light_mode", "dark")
        dispatch(toggleLightMode(!isDarkMode));

    };

    return (
        <motion.button
            className={`flex items-center px-2 py-2 mx-2 rounded-full border ${isDarkMode ? 'bg-gray-800 text-white border-gray-800' : 'bg-gray-200 text-gray-800 border-gray-200'
                }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
                x: isDarkMode ? [0, 10] : [0, -10], // Move to right for dark mode and left for light mode
            }}
            transition={{
                type: 'spring',
                stiffness: 200,
            }}
            onClick={toggleMode}
        >
            {isDarkMode ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
        </motion.button>

    );
};

export default LightButton
