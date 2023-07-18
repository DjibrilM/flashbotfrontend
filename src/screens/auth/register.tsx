
import logo from '../../assets/chatbot.png';
import { AuthForm } from '../../components/forms/auth';
import { Link, useNavigate } from 'react-router-dom';
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
import { Navigate } from 'react-router-dom';


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
    const [authState, setAuthState] = useRecoilState(authenticationAtom);

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
            console.log(request);
            setAuthState({
                userId: request.id,
                userProfileImage: request.userProfile,
                isLoggedIn: true
            });
            setItem({
                token: request.authToken
            }, "auth");


        } catch (error) {
            console.log(error);
            setOpenProfile(false);
        }

    }

    return <main className="w-full flex min-h-screen sm:pt-14 bg-[#131d2f] ">
        <section className='m-auto overflow-hidden relative max-w-[900px] p-2 pb-10 w-full min-h-screen sm:min-h-[600px] bg-white sm:rounded-md'>
            <div style={{ transform: !openProfile ? " " : "translateX(-900px)" }} className="w-full h-full absolute duration-200 pr-4">
                <img src={logo} className='w-16 m-auto mt-6' alt="" />
                <h1 className='text-center uppercase mt-3 text-gray-700 text-[18px] font-bold'>Register</h1>
                <AuthForm
                    loading={loading}
                    key={"register"}
                    submitButtonLabel='Next'
                    onSubmit={openAvatarSelector}
                />

                <div className="max-w-[400px] m-auto mt-4">
                    <p className='text-sm flex gap-1'>Already have an account <span><Link className='text-purple-400' to="/login" >login</Link></span></p>
                </div>
                <div className="max-w-[400px] m-auto mt-2">
                    {errorMessage && <p className='text-sm bg-red-200 line-clamp-1 border-red-300 border-2 p-3 text-red-500'>{errorMessage}</p>}
                </div>
            </div>

            {/* ///select avatar section */}
            <div style={{ transform: !openProfile ? "translateX(900px)" : "" }} className="w-full duration-200 h-full absolute">
                <div className="flex">
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

                <div className="w-[98.0%] py-3 flex gap-5 absolute backdrop-blur-md bg-[#ffffff25]  h-24 pt-3 border-t  bottom-2 ">
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
