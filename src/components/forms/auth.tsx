import AnimatedInput from "../inputs/animatedInput"
import { validateEmail } from "../../helpers/validation"
import { validatePassword } from "../../helpers/validation"
import React, { useState } from "react"
import { createRipples } from 'react-ripples'
import { Link } from "react-router-dom"

const RippleButton = createRipples({
    color: "#ffffff1c",
    during: 600,
    className: "w-full rounded-md "
})

interface Props {
    onSubmit: Function,
    submitButtonLabel: string
}

interface InputType {
    type: string,
    label: string,
    value: string,
    errorMessage: string
    touched: boolean
}


const formInitialValue: InputType[] = [
    {
        type: "email",
        label: "Email",
        value: "",
        errorMessage: "Invalid Email",
        touched: false
    },
    {
        type: "password",
        label: "Password",
        errorMessage: "strong password, with symbols digits and uppercase characters ",
        value: "",
        touched: false
    }
];


export const AuthForm: React.FC<Props> = ({ submitButtonLabel, onSubmit }) => {
    const [form, setForm] = useState<InputType[]>(formInitialValue);

    const onInputChange = (index: number, value: string) => {
        const previousValue = form;
        previousValue[index].value = value;
        previousValue[index].touched = value ? true : false;
        setForm([...previousValue]);
    }

    const emailValidation = validateEmail(form[0].value);
    const passwordValidation = validatePassword(form[1].value);

    return <form className="mt-10">
        {form.map((el, index) => {
            return <div className="max-w-[400px] mt-2 m-auto">
                <AnimatedInput valid={el.type === "email" ? emailValidation : passwordValidation} errorMessage={el.errorMessage} touched={el.touched} value={el.value} label={el.label} type={el.type} onChange={(value: string) => onInputChange(index, value)} />
            </div>
        })}

        <div className="max-w-[400px] relative bottom-4 text-sm  mt-2 m-auto">
            <Link to="/forgotten-password" className=" text-blue-600"> <p>Forgotten password ? </p> </Link>
        </div>

        <div className="max-w-[400px] m-auto mt-5">
            <RippleButton>
                <button type="submit" onClick={(e) => {
                    e.preventDefault();
                    onSubmit({ email: form[0].value, password: form[1].value, valid: emailValidation && passwordValidation ? true : false })
                }} disabled={emailValidation && passwordValidation ? false : true} className='w-full disabled:bg-gray-300 disabled:cursor-not-allowed py-4 cursor-pointer text-white  bg-[#131d2f]'>{submitButtonLabel}</button>
            </RippleButton>
        </div>

    </form>
}