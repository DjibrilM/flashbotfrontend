import { useState } from 'react';
import logoBlack from '../../assets/logoBlack.png';
import { AuthForm } from '../../components/forms/auth';
import { Link } from 'react-router-dom';



const Login = () => {
    
    const onSubmitForm = (form: any) => {

    }

    return <main className="w-full min-h-screen sm:pt-14 bg-[#131d2f] ">
        <section className='m-auto max-w-[900px] p-2 pb-10 w-full min-h-screen sm:min-h-[500px] bg-white sm:rounded-md'>
            <img src={logoBlack} alt="" className='w-36 sm:w-52 pt-20 sm:pt-7 m-auto' />
            <p className='text-center mt-2 text-gray-700'>powered🔥 by ChatGpt</p>
            <AuthForm key="login" submitButtonLabel='Login' onSubmit={onSubmitForm}  />
            <div className="max-w-[400px] m-auto mt-4">
                <p className='text-sm flex gap-1'>Don't have an account yet <span><Link className='text-purple-400' to="/register" >Register</Link></span></p>
            </div>
        </section>
    </main>;
};

export default Login;
