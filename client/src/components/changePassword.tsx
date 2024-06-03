import { TextField } from '@mui/material';
import React, { useState } from 'react'
import InputError from './InputError';
import { useDispatch, useSelector } from 'react-redux';
import api from '../tools/api';
import { updateProfile } from '../redux/actions/actionCreators';
import { toast } from 'sonner';

import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, Theme, useTheme } from '@mui/material/styles';
export default function ChangePassword() {
    const outerTheme = useTheme();
    const { isDarkMode } = useSelector((state: any) => state)
    const dispatch = useDispatch()
    const [allowUpdate, setAllowUpdate] = useState(false)
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [repeateNewPassword, setRepeatingPassword] = useState("")
    const customTheme = (outerTheme: Theme) =>

        createTheme({
            palette: {
                mode: isDarkMode ? 'dark' : 'light',
            },
            components: {
                MuiTextField: {
                    styleOverrides: {
                        root: {
                            '--TextField-brandBorderColor': '#E0E3E7',
                            '--TextField-brandBorderHoverColor': '#B2BAC2',
                            '--TextField-brandBorderFocusedColor': '#6F7E8C',
                            '& label.Mui-focused': {
                                color: 'var(--TextField-brandBorderFocusedColor)',
                            },
                        },
                    },
                },
                MuiOutlinedInput: {
                    styleOverrides: {
                        notchedOutline: {
                            borderColor: 'var(--TextField-brandBorderColor)',
                        },
                        root: {
                            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                                borderColor: 'var(--TextField-brandBorderHoverColor)',
                            },
                            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                                borderColor: 'var(--TextField-brandBorderFocusedColor)',
                            },
                        },
                    },
                },
                MuiFilledInput: {
                    styleOverrides: {
                        root: {
                            '&::before, &::after': {
                                borderBottom: '2px solid var(--TextField-brandBorderColor)',
                            },
                            '&:hover:not(.Mui-disabled, .Mui-error):before': {
                                borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
                            },
                            '&.Mui-focused:after': {
                                borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
                            },
                        },
                    },
                },
                MuiInput: {
                    styleOverrides: {
                        root: {
                            '&::before': {
                                borderBottom: '2px solid var(--TextField-brandBorderColor)',
                            },
                            '&:hover:not(.Mui-disabled, .Mui-error):before': {
                                borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
                            },
                            '&.Mui-focused:after': {
                                borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
                            },
                        },
                    },
                },
            },
        });

    const changePasswordHandler = async () => {
        const changePromise = api.patch("api/profile/password/change", {
            new_password: newPassword,
            current_password: currentPassword,
            new_password_confirmation: repeateNewPassword
        });

        toast.promise(changePromise, {
            loading: "please wait...",
            success: (response) => {
                if (response?.data.success)
                    return response?.data.message
            },
            error: (error) => {
                if (error?.response?.data?.msg) {
                    return error.response.data.msg;
                }
                return "fill all inputs"
            }

        })
    }

    return (
        <div className="flex  min-h-screen  justify-center w-full  ">
            <div className="w-1/2 space-y-3 mt-10">
                <div className={`flex    flex-col w-80 `}>
                    <ThemeProvider theme={customTheme(outerTheme)}>

                        <TextField id="standard-basic"
                            type='password'
                            className='w-full '
                            value={currentPassword}
                            onChange={e => {
                                setCurrentPassword(e.target.value)
                                setAllowUpdate(true)
                            }}

                            label="Current Password"
                            variant="standard" />
                    </ThemeProvider>
                    <InputError message={""} className="mt-2" />

                </div>
                <div className="flex   flex-col w-80">

                    <ThemeProvider theme={customTheme(outerTheme)}>
                        <TextField id="standard-basic"
                            value={newPassword}
                            className='w-full'
                            type='password'

                            onChange={e => {
                                setNewPassword(e.target.value)
                                setAllowUpdate(true)
                            }}
                            label="New Password"
                            variant="standard" />
                    </ThemeProvider>
                    <InputError message={""} className="mt-2" />
                </div>
                <div className="flex   flex-col w-80">

                    <ThemeProvider theme={customTheme(outerTheme)}>
                        <TextField id="standard-basic"
                            value={repeateNewPassword}
                            type='password'
                            className='w-full'

                            onChange={e => {
                                setRepeatingPassword(e.target.value)
                                setAllowUpdate(true)
                            }}
                            label="Repeate New Password"
                            variant="standard" />
                    </ThemeProvider>
                    <InputError message={""} className="mt-2" />
                </div>
                <div className="flex   flex-col w-80">
                    <button onClick={changePasswordHandler} className={`w-full flex-1 ${allowUpdate ? "bg-blue-600 dark:bg-blue-800 text-white cursor-pointer hover:bg-blue-800 dark:hover:bg-blue-900" : ""} rounded-full bg-gray-600 cursor-not-allowed text-gray-400  antialiased font-bold  px-4 py-2`}                        >Update</button>
                </div>
            </div >
        </div>
    )
}
