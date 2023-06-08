
import logo from '../../assets/chatbot.png';
import { AuthForm } from '../../components/forms/auth';
import { Link } from 'react-router-dom';


const Register = () => {
    const onSubmitForm = (form: any) => {

    }

    return <main className="w-full min-h-screen sm:pt-14 bg-[#131d2f] ">
        <section className='m-auto max-w-[900px] p-2 pb-10 w-full min-h-screen sm:min-h-[500px] bg-white sm:rounded-md'>
            <img src={logo} className='w-16 m-auto mt-6' alt="" />
            <h1 className='text-center uppercase mt-3 text-gray-700 text-[18px] font-bold'>Register</h1>
            <AuthForm submitButtonLabel='Next' onSubmit={onSubmitForm} />
            <div className="max-w-[400px] m-auto mt-4">
                <p className='text-sm flex gap-1'>Already have an account <span><Link className='text-purple-400' to="/login" >login</Link></span></p>
            </div>
        </section>
    </main>;
};

export default Register;
