import AnimatedInput from "../../components/inputs/animatedInput";
import { createRipples } from "react-ripples";
import { validateEmail } from "../../helpers/validation";
import { validatePassword } from "../../helpers/validation";
import { useState } from "react";

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
];


const ResetPassword = () => {
    const [form, setForm] = useState<InputType[]>(formInitialValue);

    const onInputChange = (index: number, value: string) => {
        const previousValue = form;
        previousValue[index].value = value;
        previousValue[index].touched = value ? true : false;
        setForm([...previousValue]);
    }
    const emailValidation = validateEmail(form[0].value);
    const [navigate, setNavigate] = useState<boolean>(false);

    return <main className="w-full min-h-screen sm:pt-14 bg-[#131d2f] ">
        <section className='m-auto max-w-[900px] p-2 pb-10 w-full min-h-screen sm:min-h-[500px] flex  items-center justify-center bg-white sm:rounded-md overflow-hidden relative'>
            <div style={!navigate ? {} : { transform: "translateX(-1000px)", position: "absolute" }} className=" duration-500">
                <h1 className='text-center mt-20 font-bold'>RESET PASSWORD</h1>
                <div className="max-w-[400px] m-auto mt-5">
                    <p className='text-center text-gray-900'>Please Enter the email used for creating your account</p>
                    <div className="mt-10">
                        <form action="">
                            {form.map((el, index) =>
                                <div className="max-w-[400px] mt-2 m-auto">
                                    <AnimatedInput
                                        valid={emailValidation}
                                        errorMessage={el.errorMessage} touched={el.touched}
                                        value={el.value} label={el.label}
                                        type={el.type}
                                        onChange={(value: string) => onInputChange(index, value)} />
                                </div>
                            )}
                        </form>
                    </div>

                    <div className="h-5"></div>
                    <RippleButton>
                        <button type="submit"
                            onClick={(e) => {
                                setNavigate(true);
                                e.preventDefault();
                                // setNavigate(true);
                            }} disabled={emailValidation ? false : true} className='w-full flex justify-center disabled:bg-gray-300 disabled:cursor-not-allowed py-4 cursor-pointer text-white  bg-[#131d2f]'>
                            <div className="loader">Loading...</div>

                        </button>
                    </RippleButton>
                </div>
            </div>


            <div style={!navigate ? { transform: "translateX(1000px)", position: "absolute" } : {}} className="duration-500 p-5">
       
                <div className="max-w-[400px] m-auto mt-5">
                  
                    <div className="mt-10 flex gap-4">
                        <div className="w-20 h-20 rounded-md border overflow-hidden border-blue-950">
                            <input type="text" className="h-full w-full border text-center bg-transparent outline-none" maxLength={1} />
                        </div>
                        <div className="w-20 h-20 rounded-md border border-blue-950"></div>
                        <div className="w-20 h-20 rounded-md border border-blue-950"></div>
                        <div className="w-20 h-20 rounded-md border border-blue-950"></div>
                    </div>

                    <div className="h-5"></div>

                    <RippleButton>
                        <button type="submit" onClick={(e) => {
                            setNavigate(false);
                            e.preventDefault();
                        }} disabled={emailValidation ? false : true} className='w-full flex justify-center disabled:bg-gray-300 disabled:cursor-not-allowed py-4 cursor-pointer text-white  bg-[#131d2f]'>
                            <div className="loader">Loading...</div>
                        </button>
                    </RippleButton>
                </div>
            </div>
        </section>
    </main>;
};

export default ResetPassword;
