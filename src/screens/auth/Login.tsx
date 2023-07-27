import { useState } from 'react';
import logo from '../../assets/logoBlack.svg';
import { AuthForm } from '../../components/forms/auth';
import { Link } from 'react-router-dom';
import { authenticationAtom } from '../../../recoil/atoms/authentication';
import { useLocalStorage } from '../../hooks/localStorage';
import axios, { AxiosResponse } from 'axios';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';


interface LoginForm {
    email: string,
    password: string,
    valid: boolean
};

const Login = () => {
    const { setItem, } = useLocalStorage()
    const [errorMessage, setErrorMessage] = useState<string>();
    const [__, setAuthState] = useRecoilState(authenticationAtom);
    const navigate = useNavigate();


    const loginUser = async (form: LoginForm) => {
        try {
            const request: AxiosResponse = await axios.post("http://localhost:3000/auth/login",
                {
                    email: form.email,
                    password: form.password
                }, {
                withCredentials: true,
            });
            setErrorMessage("");
            setItem({ token: request.data.authToken }, "auth");
            setAuthState({
                isLoggedIn: true,
                userProfileImage: request.data.profileImage,
            });
            navigate({ pathname: "/", }, { replace: true });

        } catch (error: any) {
            setErrorMessage(error.response.data.message)
        }

    }

    return <main className="w-full min-h-screen sm:pt-14 bg-[#131d2f] ">
        <section className='m-auto max-w-[900px] p-2 pb-10 w-full min-h-screen sm:min-h-[550px] bg-white sm:rounded-md'>
            <img src={logo} alt="" className='w-36 sm:w-42 mb-10 pt-20 sm:pt-7 m-auto' />
            <p className='text-center mt-2 text-gray-700'>Powered🔥 By ChatGpt</p>
            <AuthForm loading={false} key="login" submitButtonLabel='Login' onSubmit={loginUser} />
            <div className="max-w-[400px] m-auto mt-4">
                <p className='text-sm flex gap-1 cursor-pointer'>Don't have an account yet <span><Link className='text-blue-500' to="/register" >Register</Link></span></p>
            </div>
            {errorMessage &&
                <div className="max-w-[400px] bg-red-300 border border-red-500 px-5 py-2 mt-2 m-auto">
                    <p className='text-red-600 text-sm'>{errorMessage}</p>
                </div>
            }
        </section>
    </main>;
};

export default Login;
