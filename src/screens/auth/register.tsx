
import logo from '../../assets/logoBlack.svg';
import { AuthForm } from '../../components/forms/auth';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authenticationAtom } from '../../../recoil/atoms/authentication';
import { useAuth } from '../../hooks/useAuth';
import { createRipples } from 'react-ripples';
import { useFetchProfile } from '../../hooks/useFetchProfile';
import { TbMoodKid } from 'react-icons/tb';
import { BiImageAdd } from 'react-icons/bi'
import { IoChevronBackOutline } from 'react-icons/io5'
import { useState } from 'react';
import { useLocalStorage } from '../../hooks/localStorage';
import resgisterImage from '../../assets/add-contact.png';
import { useNavigate } from 'react-router-dom';
import video from '../../assets/register.mp4'



interface FormData {
    email: string,
    password: string,
    valid?: boolean
}


const RippleButton = createRipples({
    color: "#ffffff1c",
    during: 600,
    className: "rounded-md "
})

const FinishButtonRipple = createRipples({
    color: "#ffffff1c",
    during: 600,
    className: "rounded-md w-full mr-3 "
})

const Register = () => {
    const [__, setAuthState] = useRecoilState(authenticationAtom);

    const { loading, sendRequest, errorMessage } = useAuth();
    const { response, setSelected, selectedProfileIndex } = useFetchProfile();
    const [openProfile, setOpenProfile] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>();
    const { setItem } = useLocalStorage()
    const navigate = useNavigate();

    const openAvatarSelector = async (formData: FormData) => {
        setFormData(formData);
        setOpenProfile(true);
    }

    const submitForm = async () => {
        const userAvatarUrl: string = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response![selectedProfileIndex].id}.png`
        const newUser = {
            email: formData?.email,
            password: formData?.password,
            profileImage: userAvatarUrl,
        };

        try {
            const request = await sendRequest(newUser);
            setAuthState({
                userProfileImage: request.userProfile,
                isLoggedIn: true,
                email: request.email
            });
            setItem({
                token: request.authToken
            }, "auth");

            //navigate after registering 
            navigate('/');
        } catch (error) {
            setOpenProfile(false);
        }

    }

    return <main className="w-full flex min-h-screen sm:p-3  bg-[#131d2f] ">
        <section className='m-auto overflow-hidden relative max-w-[900px]  pb-10 w-full min-h-screen sm:min-h-[600px] shadow-lg bg-white sm:rounded-md'>
            <div style={{ transform: !openProfile ? " " : "translateX(-900px)" }} className="w-full sm:flex h-full px-2 sm:px-0  absolute duration-200 ">
                <div className=" w-[300px] h-full overflow-hidden  sm:block hidden relative bg-gray-200 ">
                    <div className="w-full flex gap-5  justify-center">
                        <div className="h-[200px]  p-2 flex rounded-b-full w-[50px] bg-gray-300">
                            <div className="w-full h-[35px] self-end rounded-full bg-slate-400"></div>
                        </div>

                        <div className="h-[300px] flex p-2 items-center justify-center relative  w-[100px]  bg-gray-300 rounded-b-full">
                            <img className=' rotate-[-90deg] absolute w-24 mb-10' src={logo} alt="" />
                            <div className="w-full h-[85px] bg-slate-400 rounded-full self-end"></div>
                        </div>

                        <div className="h-[400px] w-[50px] justify-between flex-col bg-gray-300 mt-5 flex rounded-full p-2">
                            <div className="w-full h-[35px] self-start rounded-full bg-slate-400"></div>
                            <div className="w-full h-[35px] self-end rounded-full bg-slate-400"></div>
                        </div>
                    </div>

                    <div className=" absolute bottom-0 left-0 w-full bg-gray-300 border-t border-[#00000020] h-32 p-4">
                        <p className=' text-center text-sm leading-7 text-slate-600'>For sending messages and interacting with the chatbot, you will need to provide your openai api-key </p>
                    </div>
                </div>





                <div className=" sm:hidden ">
                    <div className="w-full flex gap-10  justify-center">
                        <div className="h-[150px]  p-2 flex rounded-b-full w-[50px] bg-gray-300">
                            <div className="w-full h-[35px] self-end rounded-full bg-slate-400"></div>
                        </div>

                        <div className="h-[200px] flex p-2 items-center justify-center relative  w-[80px]  bg-gray-300 rounded-b-full">
                            <img className=' rotate-[-90deg] absolute w-24 mb-10' src={logo} alt="" />
                            <div className="w-full h-[60px] bg-slate-400 rounded-full self-end"></div>
                        </div>

                        <div className="h-[200px] w-[50px] justify-between flex-col bg-gray-300 mt-5 flex rounded-full p-2">
                            <div className="w-full h-[35px] self-start rounded-full bg-slate-400"></div>
                            <div className="w-full h-[35px] self-end rounded-full bg-slate-400"></div>
                        </div>
                    </div>

                   
                </div>

                
                <div className="sm:ml-16 sm:mt-32 bg-white">
                    <AuthForm
                        type='register'
                        loading={loading}
                        key={"register"}
                        submitButtonLabel='Next'
                        onSubmit={openAvatarSelector}
                    />

                    <div className="max-w-[400px] m-auto mt-4">
                        <p className='text-sm flex gap-1'>Already have an account <span><Link className='text-blue-500' to="/login" >login</Link></span></p>
                    </div>
                    <div className="max-w-[400px] m-auto mt-2">
                        {errorMessage && <p className='text-sm bg-red-200 line-clamp-1 border-red-300 border-2 p-3 text-red-500'>{errorMessage}</p>}
                    </div>
                </div>
            </div>

            {/* ///select avatar section */}
            <div style={{ transform: !openProfile ? "translateX(900px)" : "" }} className="w-full duration-200 h-full absolute">
                <div className="flex pt-3">
                    <div className="w-full px-3 h-[5.5rem] border-b py-5 flex gap-2 ">
                        <div className="w-20 h-20 relative bottom-5 border rounded-md  items-center flex justify-center">
                            {selectedProfileIndex >= 0 && (<img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response![selectedProfileIndex].id}.png`} className='w-14' />)}
                            {selectedProfileIndex < 0 && <BiImageAdd />}
                        </div>
                        <h4 className='flex gap-2 '>Pick Your Avatar <span className='mt-1'><TbMoodKid /></span> </h4>
                    </div>
                </div>

                <div className="w-[98%] h-[calc(100vh-190px)] sm:h-[450px]   pb-20 profile-list p-2 mt-1 flex gap-8 justify-center sm:gap-2 flex-wrap sm:justify-between pt-4 overflow-auto">
                    {response?.map((profile: any, index: number) => {
                        return (
                            <div
                                key={index}
                                style={profile.selected ? { borderColor: "#047aed" } : {}}
                                onClick={() => setSelected(index)}
                                className='w-20 h-20 bg-gray-200 border-2  border-gray-300 rounded-md cursor-pointer'>
                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${profile.id}.png`}
                                    className='w-full object-cover'
                                />
                            </div>
                        )
                    })}
                </div>

                <div className="w-[98.0%] px-4 py-3 flex gap-5 absolute backdrop-blur-md bg-[#ffffff25]  h-24 pt-3 border-t  bottom-2 ">
                    <RippleButton>
                        <button
                            onClick={() => setOpenProfile(false)}
                            className='w-[9.5rem] outline-none border-none disabled:bg-gray-400 disabled:cursor-not-allowed py-4 cursor-pointer text-white flex items-center justify-center  bg-[#131d2f]'>
                            <IoChevronBackOutline className="mr-1" />
                            Previous
                        </button>
                    </RippleButton>

                    <FinishButtonRipple>
                        <button
                            onClick={() => submitForm()}
                            disabled={formData?.valid && selectedProfileIndex >= 0 ? false : true}
                            className='w-full outline-none disabled:bg-gray-400 disabled:text-gray-600  border-none   disabled:cursor-not-allowed py-4 cursor-pointer text-white flex items-center justify-center  bg-[#131d2f]'>
                            {loading ? <div className="loader">Loading...</div> : <>Finish</>}
                        </button>
                    </FinishButtonRipple>
                </div>
            </div>
        </section>

    </main >;
};

export default Register;
