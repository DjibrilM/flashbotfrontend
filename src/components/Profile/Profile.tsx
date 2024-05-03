import { BiSolidTrash } from 'react-icons/bi';
import { MdOutlineClose } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import { authenticationAtom } from '../../../recoil/atoms/authentication';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { scalPopupAnimate, scalPopupInitial } from '../../framermotion/animationVariant';
import axios from 'axios';
import { useLocalStorage } from '../../hooks/localStorage';
import { useNavigate } from 'react-router-dom';
import AlertPopUp from '../popup/AlertPopUp';
import ErrorPopup from '../popup/ErrorPopup';



interface Props {
    opened: boolean,
    closeFn: Function
}

const Profile: React.FC<Props> = ({ opened, closeFn }) => {
    const [userprofile, setUserProfile] = useRecoilState(authenticationAtom);
    const [password, setPassword] = useState<string>("");
    const [showPasswordInput, setShowPasswordInput] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const { getItem, clearItem } = useLocalStorage();
    const [deleteAccountLoading, setDeleteAccountLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [showErrorPopup, setShowErrorPopup] = useState<boolean>(false);


    const logout = () => {
        setUserProfile({
            isLoggedIn: false,
            userProfileImage: "",
            email: ""
        });

        clearItem("auth");
        navigate({ pathname: "/login" });
    }

    const deleteAccountSubmition = (e: FormEvent) => {
        e.preventDefault();
        setShowAlert(true);
    }

    const confirmAccountDeletion = async () => {
        setDeleteAccountLoading(true)
        axios.post("http://localhost:3000/auth/deleteAccount",
            {
                password: password,
                email: userprofile.email
            },
            {
                withCredentials: true,
                headers: {
                    Authorization: "Bearer " + getItem("auth").token,
                }
            }).then(() => {
                logout()
                setDeleteAccountLoading(false);
            }).catch(() => {
                setDeleteAccountLoading(false);
                setShowAlert(false);
                setShowErrorPopup(true);
            })

    }

    const closePopup = () => {
        setShowPasswordInput(false);
        setPassword('');
        closeFn();
    }



    return (
        <>
            {opened && <div onClick={() => closePopup()} className="fixed z-50 top-0 left-0 backdrop-blur-sm bg-[#0000007b] w-full h-full"></div>}

            {opened && <motion.div transition={{ type: "spring", duration: 0.4 }} animate={scalPopupAnimate} initial={scalPopupInitial} className="fixed z-[51] top-0 left-0 w-full flex items-center justify-center">
                <div className="max-w-[550px] sm:rounded-md  p-4  w-full h-screen sm:h-auto sm:m-5 bg-white">
                    <div className="w-full relative h-[200px] flex items-end justify-center bg-slate-200 rounded-md">
                        <button onClick={() => closeFn()} className="w-8 bg-transparent h-8 absolute flex items-center justify-center cursor-pointer top-5 right-6 rounded-full  border-slate-400 border">
                            <MdOutlineClose className=" text-slate-500" />
                        </button>
                        <div className=" w-[150px] h-[150px] bottom-[-30px] border border-slate-300 relative bg-slate-50 rounded-md ">
                            <img className=' w-full h-full object-cover' src={userprofile.userProfileImage} alt="" />
                        </div>
                    </div>

                    <div className=" mt-16">
                        <div className="w-full">
                            <Link to={'/update-password'}>
                                <button className='w-full flex items-center justify-center gap-2 h-14 text-sm text-red-100 rounded-md bg-slate-500 mt-10'>
                                    update password
                                    <RiLockPasswordLine />
                                </button>
                            </Link>
                        </div>

                        {showPasswordInput &&
                            <div className="w-full border-t pt-5 mt-10">
                                <p className=' mb-1 text-sm text-slate-600'>Password required</p>
                                <div className="w-full flex gap-4">
                                    <form className='flex w-full gap-3' onSubmit={deleteAccountSubmition}>
                                        <input defaultValue={password} pattern="^[A-Za-z][A-Za-z0-9!@#$%^&* ]*$" required onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} type="password" className=' w-full h-10 border border-slate-400 px-4 text-sm outline-slate-600 rounded' placeholder='password' />
                                        <button className="bg-red-500 active:bg-red-600 px-5 text-slate-100 rounded-md">continue</button>
                                    </form>
                                </div>
                            </div>
                        }

                        {!showPasswordInput &&
                            <div className="w-full">
                                <button onClick={() => setShowPasswordInput(true)} className='w-full flex items-center justify-center gap-2 h-14 text-sm text-red-100 rounded-md bg-red-500 mt-5'>
                                    Delete my account
                                    <BiSolidTrash />
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </motion.div>
            }

            <ErrorPopup errorMessage='failed to delete account' open={showErrorPopup} close={() => setShowErrorPopup(false)} />
            <AlertPopUp open={showAlert} close={() => setShowAlert(false)} Loading={deleteAccountLoading} title='Delete account' description='Your account will be deleted' action={() => confirmAccountDeletion()} />
        </>
    )
}

export default Profile
