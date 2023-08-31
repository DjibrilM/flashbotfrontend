import AnimatedInput from "../../components/inputs/animatedInput";
import { createRipples } from "react-ripples";
import { validatePassword } from "../../helpers/validation";
import { useState } from "react";
import { BsShieldLock } from 'react-icons/bs';
import { RotatingLines } from "react-loader-spinner";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { authenticationAtom } from "../../../recoil/atoms/authentication";
import { useLocalStorage } from "../../hooks/localStorage";
import { CgChevronLeft } from 'react-icons/cg'
import { useNavigate } from "react-router";


const RippleButton = createRipples({
    color: "#ffffff1c",
    during: 600,
    className: "w-full rounded-md "
})

interface InputType {
    type: string,
    label: string,
    value: string,
    errorMessage: string
    touched: boolean
}


const formInitialValue: InputType[] = [
    {
        type: "password",
        label: "password",
        value: "",
        errorMessage: "Invalid password",
        touched: false
    },
];

const restPasswordForm: InputType[] = [
    {
        type: "password",
        label: "password",
        value: "",
        errorMessage: "Invalid password",
        touched: false
    },
];


const ResetPassword = () => {
    const [form, setForm] = useState<InputType[]>([...formInitialValue]);
    const [restPassewordForm, setResetPassword] = useState<InputType[]>([...restPasswordForm]);
    const userInfo = useRecoilValue(authenticationAtom);
    const { getItem } = useLocalStorage();
    const [confirmationLoading, setConfirmationLoading] = useState<boolean>(false);
    const [updatePasswordLoading, setUpdatePasswordLoading] = useState<boolean>(false);
    const passwordValidation = validatePassword(form[0].value);
    const newPasswordValidation = validatePassword(restPassewordForm[0].value);
    const [navigate, setNavigate] = useState<boolean>(false);
    const navigation = useNavigate();
    const [error, setError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<boolean>(false);
    // const confirmInputsRef= useRef<HTMLElement[]>();

    const onInputChange = (index: number, value: string) => {
        const previousValue = form;
        previousValue[index].value = value;
        previousValue[index].touched = value.length > 0 ? true : false;
        setForm([...previousValue]);
    }

    const onUpdateInputChange = (index: number, value: string) => {
        const previousValue = restPassewordForm;
        previousValue[index].value = value;
        previousValue[index].touched = value ? true : false;
        setResetPassword([...previousValue]);
    }




    const verifyPreviousPassword = async () => {
        setConfirmationLoading(true);
        setError('');
        setSuccessMessage(false);

        try {
            await axios.post('http://localhost:3000/auth/requestPasswordUpdate', {
                password: form[0].value,
                email: userInfo.email
            }, {
                withCredentials: true,
                headers: {
                    Authorization: "Bearer " + getItem("auth").token,
                }
            })

            setTimeout(() => {
                setConfirmationLoading(false);
                setNavigate(true);
            }, 2000);
        } catch (error: any) {
            const returnedError = error.response?.data?.message || '🔔 something went wrong';
            if (typeof returnedError === 'object') {
                setError(returnedError[0])
            } else {
                setError(returnedError);
            }
            setConfirmationLoading(false)
        }
    };


    const updatePassword = async () => {
        setUpdatePasswordLoading(true);
        setSuccessMessage(false);
        setError('');

        try {
            await axios.post('http://localhost:3000/auth/updatePassword', {
                previousPassword: form[0].value,
                newPassword: restPassewordForm[0].value,
                email: userInfo.email
            }, {
                withCredentials: true,
                headers: {
                    Authorization: "Bearer " + getItem("auth").token,
                }
            })

            const timeout = setTimeout(() => {
                setUpdatePasswordLoading(false);
                setNavigate(false);
                setSuccessMessage(true);
                clearTimeout(timeout);
            }, 2000);

            onInputChange(0, "");


        } catch (error: any) {
            const returnedError = error.response?.data?.message || '🔔 something went wrong';
            if (typeof returnedError === 'object') {
                setError(returnedError[0])
            } else {
                setError(returnedError);
            }
            setUpdatePasswordLoading(false)
        }
    }
    return <main className="w-full min-h-screen sm:pt-14 bg-[#131d2f] ">
        <section className='m-auto max-w-[900px] p-2 pb-10 w-full min-h-screen sm:min-h-[500px] flex justify-center bg-white sm:rounded-md overflow-hidden relative'>

            <button onClick={() => {
                if (navigate) {
                    setNavigate(false)
                } else {
                    navigation('../');
                }
            }} className="w-10 absolute left-5 top-4  bg-transparent cursor-pointer h-10 border flex items-center justify-center rounded-lg">
                <CgChevronLeft />
            </button>

            <div style={!navigate ? {} : { transform: "translateX(-1000px)", position: "absolute" }} className=" duration-500 max-w-[400px] w-full mt-8">
                <div className=" m-auto mt-5">
                    <div className=" w-full flex items-center justify-center">
                        <BsShieldLock className=" text-5xl text-slate-400 text-center" />
                    </div>

                    <p className='text-center text-slate-500 text-sm my-8'>Please Confirm Your password 👷‍♀️</p>
                    <div className="max-w-[700px]">
                        <form className="">
                            {form.map((el, index) =>
                                <div key={'confirmation'} className="sm:max-w-[700px]  sm:w-full mt-2 mx-4 sm:m-auto">
                                    <AnimatedInput
                                        valid={passwordValidation}
                                        errorMessage={el.errorMessage}
                                        touched={el.touched}
                                        value={el.value} label={el.label}
                                        type={el.type}
                                        onChange={(value: string) => onInputChange(index, value)} />
                                </div>
                            )}
                        </form>
                    </div>

                    <div className="h-5"></div>

                    <div className="mx-4 sm:mx-0">
                        <RippleButton>
                            <button type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    verifyPreviousPassword()
                                }} disabled={passwordValidation ? false : true} className='w-full flex justify-center disabled:bg-gray-300 disabled:cursor-not-allowed py-4 cursor-pointer text-white  bg-[#131d2f]'>
                                {confirmationLoading ? <RotatingLines strokeColor=" #ffff" width="23" /> : <span>Confirm</span>}
                            </button>

                        </RippleButton>
                    </div>
                </div>
            </div>




            <div style={!navigate ? { transform: "translateX(1000px)", position: "absolute" } : {}} className="duration-500 p-5">
                <div className="max-w-[400px] m-auto mt-5">

                    <div className="mt-10  gap-4">
                        <p className=" text-sm mb-8 text-center font-bold">Enter New Password </p>
                        <p className=" text-sm text-center mb-5 leading-6 text-slate-600">This action can not be undo! By clicking the update button your current password will be updated </p>
                        {restPassewordForm.map((el, index) =>
                            <div key={'update'} className="max-w-[700px]  w-full mt-2 m-auto">
                                <AnimatedInput
                                    valid={newPasswordValidation}
                                    errorMessage={el.errorMessage} touched={el.touched}
                                    value={el.value}
                                    label={el.label}
                                    type={el.type}
                                    onChange={(value: string) => onUpdateInputChange(index, value)} />
                            </div>
                        )}
                    </div>

                    <div className="h-5"></div>

                    <RippleButton>
                        <button type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                updatePassword();
                            }} disabled={newPasswordValidation ? false : true} className='w-full flex justify-center disabled:bg-gray-300 disabled:cursor-not-allowed py-4 cursor-pointer text-white  bg-[#131d2f]'>
                            {updatePasswordLoading ? <RotatingLines strokeColor=" #ffff" width="23" /> : <span className=" text-sm">Change Password</span>}
                        </button>
                    </RippleButton>
                </div>
            </div>

            {error && <div className="max-w-[400px] absolute bottom-20 p-4 w-full mt-4 text-sm text-red-800 border-red-400 border bg-red-100 ">{error}</div>}
            {successMessage && <div className="text-sm bottom-20 bg-green-200 border-green-500 absolute mt-4 max-w-[400px] flex items-center  w-full p-4  border ">Password Updated <span className=" text-2xl left-[38%] mb-4 absolute">🎉</span> </div>}
        </section>
    </main>;
};

export default ResetPassword;
