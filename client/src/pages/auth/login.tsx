import React, { useState } from 'react'
import { Button, TextField } from '@mui/material';
import InputError from '../../components/InputError';
import { Link, useNavigate } from 'react-router-dom';
import { FEEDS, REGISETR, UPLOADPROFILEPICTURE } from '../../routes/routes';
import Lottie from 'react-lottie';
import animationdata from "../../assets/lottiefiles/phone.json";
import Bars from 'react-loading-icons/dist/esm/components/bars';
import api from '../../tools/api';

export default function Login() {
    const [email, setEmail] = useState<String>("")
    const [password, setPassword] = useState<String>("")
    const [errors, setErrors] = useState<any>()
    const [wait, setWait] = useState(false)
    const navigate = useNavigate()


    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationdata,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    const submit = async (e: any) => {
        e.preventDefault()
        try {
            setWait(true);
            const resp = await api.post("api/login", {
                email, password
            })
            if (resp.data.success) {
                setWait(false);
                if (resp.data.user_picture == "profile.png") {
                    console.log(resp.data)
                    return navigate(UPLOADPROFILEPICTURE)
                }
                return navigate(FEEDS)
            }

        } catch (error: any) {
            // setErrors(error.response.data)
            setWait(false);

        }

    }

    return (
        <main className="md:flex flex-start md:items-center  min-h-screen  ">


            <form className="md:w-1/2 flex items-center justify-center min-h-screen  m-4 " onSubmit={submit}>

                <div className="dark:text-white p-6 shadow-2xl w-full shadow-black rounded-3xl m-6">
                    <div className=" m-6 text-center">
                        <span className=" text-4xl   font-primary text-center bg-gradient-to-l from-orange-500 to-yellow-500 text-transparent bg-clip-text font-bold">Login</span>
                    </div>
                    <div className="flex flex-col">
                        <TextField id="standard-basic"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            label="Email"
                            variant="standard" />
                        <InputError message={errors?.email && errors.email[0]} className="mt-2" />

                    </div>
                    <div className="flex flex-col">
                        <TextField
                            id="standard-basic"
                            type="password"
                            label="Password"
                            variant="standard"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />{" "}
                        <InputError message={errors?.password && errors.password[0]} className="mt-2" />

                    </div>

                    <div className="flex flex-col mt-4">
                        <Button
                            style={{ height: "25px" }}
                            variant="contained"
                            color="success"
                            type='submit'
                        >
                            {wait ? <Bars width={15} height={29} /> : "Login"}
                        </Button>{" "}

                    </div>
                    <div className="flex flex-col text-black  m-2 mt-4">
                        <Link
                            to={REGISETR}
                        >
                            I dont have an account <u>register</u>
                        </Link>

                        {/* <Link
                            to={""}
                        >
                            Forgot your password?
                        </Link> */}

                    </div>
                </div>
            </form>
            <div className="md:w-1/2 hidden md:flex ml-0  mr-0">
                {/* Render the Lottie component */}
                <Lottie
                    options={defaultOptions}
                />
                {/* <img src={image} alt="" width={650} /> */}
            </div>
        </main>
    )
}
