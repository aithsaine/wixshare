import React, { FormEventHandler, useState } from 'react'
import animationdata from "../../assets/lottiefiles/chat.json"
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import InputError from '../../components/InputError'
import Lottie from 'react-lottie'
import Bars from 'react-loading-icons/dist/esm/components/bars'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN } from '../../routes/routes'
import api, { csrf } from '../../tools/api'
import toast from 'react-hot-toast'




export default function Register() {

    const [wait, setWait] = useState(false)
    const [first_name, setFirstName] = useState<String>("")
    const [last_name, setLastName] = useState<String>("")
    const [gender, setGender] = useState<String>("")
    const [email, setEmail] = useState<String>("")
    const [password, setPassword] = useState<String>("")
    const [password_confirmation, setConfirmPassword] = useState<String>("")
    const [errors, setErrors] = useState<any>("")
    const navigate = useNavigate()

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        setWait(true);
        csrf()
        try {
            const resp = await api.post("api/register", { first_name, last_name, gender, email, password, password_confirmation })
            if (resp.data?.success) {
                navigate(LOGIN)

            }


            setWait(false)
        } catch (error: any) {
            setErrors(error.response.data)
            setWait(false)

        }

    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationdata,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <main className="md:flex flex-start m-0 min-h-screen  md:items-center w-full mt-6">
            {/* Style the container element that holds the Lottie component */}
            <div className="md:w-1/2 P-6 hidden md:flex ml-0  m-4" >
                {/* Render the Lottie component */}
                <Lottie
                    options={defaultOptions}
                />
            </div>


            <form onSubmit={submit} className="md:w-1/2 m-4 ">
                <div className="p-6 shadow-2xl m-6">

                    <div className="text-4xl  font-primary text-center bg-gradient-to-l from-orange-500 to-yellow-500 text-transparent bg-clip-text font-bold mt-6"><span className="">Register</span></div>
                    <div className="flex flex-col">
                        <TextField value={first_name} onChange={e => setFirstName(e.target.value)} id="standard-basic" name='first_name' label="First Name" variant="standard" />
                        <InputError message={errors?.first_name && errors.first_name[0]} className="mt-2" />

                    </div>
                    <div className="flex flex-col">
                        <TextField onChange={e => setLastName(e.target.value)} value={last_name} id="standard-basic" name='last_name' label="Last Name" variant="standard" />
                        <InputError message={errors?.last_name && errors.last_name[0]} className="mt-2" />

                    </div>
                    <div className="flex flex-col">
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                                value={gender}
                                onChange={e => setGender(e.target.value)}
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="gender"
                            >
                                <FormControlLabel value="male" control={<Radio size="small" />} label="Male" />
                                <FormControlLabel value="female" control={<Radio size="small" />} label="Female" />

                            </RadioGroup>
                        </FormControl>
                        <InputError message={errors?.gender && errors.gender[0]} className="mt-2" />

                    </div>

                    <div className="flex flex-col">
                        <TextField onChange={e => setEmail(e.target.value)} id="standard-basic" name='email' value={email} label="Email" variant="standard" />
                        <InputError message={errors?.email && errors.email[0]} className="mt-2" />

                    </div>
                    <div className="flex flex-col">
                        <TextField onChange={e => setPassword(e.target.value)} id="standard-basic" name='password' value={password} type="password" label="Password" variant="standard" />
                        <InputError message={errors?.password ? errors.password[0] : ""} className="mt-2" />

                    </div>

                    <div className="flex flex-col">
                        <TextField id="standard-basic" type="password" onChange={e => setConfirmPassword(e.target.value)} value={password_confirmation} name='password_confirmation' label="Confirm Password" variant="standard" />
                        <InputError message={errors?.password_confirmation ? errors.password_confirmation[0] : ""} className="mt-2" />

                    </div>
                    <div className="flex flex-col mt-4">

                        <Button style={{ height: "25px" }} type='submit' variant="contained" color="success">
                            {wait ? <Bars width={15} height={29} /> : "Register"}
                        </Button>
                        <Link to={LOGIN}>I already have an account <u>Log in</u></Link>
                    </div>

                </div>
            </form>
        </main>)
}
