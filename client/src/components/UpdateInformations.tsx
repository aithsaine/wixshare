import { TextField } from '@mui/material';
import React, { useState } from 'react'
import InputError from './InputError';

export default function UpdateInformations({ user }: any) {
    const [firstName, setfirstName] = useState(user?.first_name);
    const [lastName, setlastName] = useState(user?.last_name)
    return (
        <section className={"flex w-full p-6"}>
            <div className="flex w-1/2">
                <TextField id="standard-basic"
                    value={firstName}
                    onChange={e => setfirstName(e.target.value)}
                    label="First Name"
                    variant="standard" />
                <InputError message={""} className="mt-2" />

            </div>
            <div className="flex w-1/2">
                <TextField id="standard-basic"
                    value={lastName}
                    onChange={e => setfirstName(e.target.value)}
                    label="Last Name"
                    variant="standard" />
                <InputError message={""} className="mt-2" />
            </div>
        </section>
    )
}
