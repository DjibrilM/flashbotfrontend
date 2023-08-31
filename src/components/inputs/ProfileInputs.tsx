import React, { useState } from 'react';
import { TiPencil } from 'react-icons/ti';
import { createRipples } from 'react-ripples';
import { RiLockPasswordLine } from 'react-icons/ri'

const ButtonRipple = createRipples({
    color: "#ffffff38",
    during: 600,
    className: " w-[12rem] rounded-md"
});

interface Props {
    value: string
}

const ProfileInputs: React.FC<Props> = ({ value }) => {
    const [updatedValue, setUpdatedValue] = useState<string>(value);
    const [confirmation, setConfirmation] = useState<boolean>(false);

    return (
        !confirmation ? <>
            <div className=" w-full flex gap-5 mt-10">
                <input onChange={(e) => setUpdatedValue(e.target.value)} defaultValue={value} className=' border  outline-slate-400 text-slate-600 border-slate-300 h-[3rem] p-4 w-full rounded-md' type="text" />
                <ButtonRipple>
                    <button onClick={() => setConfirmation(true)} disabled={!(updatedValue !== value)} className='text-sm w-[12rem] disabled:bg-gray-200 disabled:text-slate-600  disabled:cursor-not-allowed flex gap-1 justify-center items-center  text-slate-50 bg-green-500 px-7 rounded-md '>
                        <TiPencil />
                        Update
                    </button>
                </ButtonRipple>
            </div>
        </>

            : <>
                <div className="flex gap-2">
                    <RiLockPasswordLine />
                    <p className=' mb-5 text-slate-500 text-sm'>Please Confirm Password</p>
                </div>

                <div className=" w-full flex gap-2 ">
                    <input className=' border  outline-slate-400 text-slate-600 border-slate-300 h-[3rem] p-4 w-full rounded-md' type="password" />
                    <ButtonRipple>
                        <button onClick={() => setConfirmation(true)} disabled={!(updatedValue !== value)} className='text-sm w-[12rem] disabled:bg-gray-200 disabled:text-slate-600  disabled:cursor-not-allowed flex gap-1 justify-center items-center  text-slate-50 bg-green-500 rounded-md '>
                            <TiPencil />
                            Confirm
                        </button>
                    </ButtonRipple>

                    <button onClick={() => {
                        setConfirmation(false)
                        setUpdatedValue(value);
                    }} disabled={!(updatedValue !== value)} className='text-sm p-3 disabled:bg-gray-200 disabled:text-slate-600  disabled:cursor-not-allowed  justify-center items-center  text-slate-50 bg-slate-500 rounded-md '>
                        cancel
                    </button>
                </div>
            </>)
}

export default ProfileInputs