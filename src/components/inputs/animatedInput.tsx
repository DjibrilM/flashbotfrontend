import React, { useState } from "react";
import { GrView, } from 'react-icons/gr'
import { BiHide } from 'react-icons/bi';

interface Props {
    label: string,
    type: string,
    value: string,
    onChange: Function,
    valid: boolean,
    touched: boolean,
    errorMessage: string
}

const AnimatedInput: React.FC<Props> = ({ label, type, value, onChange, errorMessage, touched, valid }) => {
    const [focused, setFocused] = useState<boolean>(false);
    const [hidePassword, setHidePassword] = useState<boolean>(true);


    const onFocus = () => {
        setFocused(true)
    }

    const onBlur = () => {
        if (value.length < 1) {
            setFocused(false)
        }
    }

    const showPassword = () => {
        setHidePassword(!hidePassword);
    }

    const passwordTypeToggle = () => {
        if (hidePassword) {
            return 'password'
        } else {
            return "text";
        }
    }

    return <>
        <div className="flex gap-3">
            <div style={!valid && touched ? { borderWidth: "0.1px", borderColor: focused ? "red" : "red" } : { borderWidth: "0.1px", borderColor: focused ? "#311248" : "#13121233" }} className="w-full  flex items-center  h-[50px] relative rounded-md">
                <p style={focused ? { bottom: "38px", color: !valid && touched ? "red" : "#311248", transform: " scale(0.7)" } : { bottom: "15px", color: !valid && touched ? "red" : "#311248", }} className="absolute text-[#131212ba] text-sm duration-200 ml-3 px-3 bg-[#fff]">{label}</p>
                <input
                    onChange={(e) => onChange(e.target.value)}
                    defaultValue={value}
                    type={type !== 'password' ? type : passwordTypeToggle()}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    className="w-full border-none  p-3 h-full outline-none bg-transparent" />
            </div>
            {type === 'password' &&
                <button type="button" onClick={showPassword} className="bg-transparent rounded-md border-[#13121233] flex items-center justify-center active:bg-gray-100 border w-[100px]">
                    {hidePassword ? <GrView /> : <i className=" text-lg"><BiHide /></i>}
                </button>}
        </div>
        <p style={!valid && touched ? { opacity: 1 } : { opacity: 0 }} className="text-[10px] mt-1 text-red-400">{errorMessage}</p>
    </>
        ;
};

export default AnimatedInput;
