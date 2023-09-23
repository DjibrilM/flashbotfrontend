import { BiSolidTrash } from 'react-icons/bi';
import { MdOutlineClose } from 'react-icons/md';
import { useRecoilValue } from 'recoil';
import { authenticationAtom } from '../../../recoil/atoms/authentication';
import React from 'react';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { scalPopupAnimate, scalPopupInitial } from '../../framermotion/animationVariant';

interface Props {
    opened: boolean,
    closeFn: Function
}

const Profile: React.FC<Props> = ({ opened, closeFn }) => {
    const { userProfileImage } = useRecoilValue(authenticationAtom);
    return (
        <>
            {opened && <div onClick={() => closeFn()} className="fixed z-50 top-0 left-0 backdrop-blur-sm bg-[#0000007b] w-full h-full"></div>}

            {opened && <motion.div transition={{ type: "spring", duration: 0.4 }} animate={scalPopupAnimate} initial={scalPopupInitial} className="fixed z-[52] top-0 left-0 w-full flex items-center justify-center">
                <div className="max-w-[550px] sm:rounded-md  p-4  w-full h-screen sm:h-auto sm:m-5 bg-white">
                    <div className="w-full relative h-[200px] flex items-end justify-center bg-slate-200 rounded-md">
                        <button onClick={() => closeFn()} className="w-8 bg-transparent h-8 absolute flex items-center justify-center cursor-pointer top-5 right-6 rounded-full  border-slate-400 border">
                            <MdOutlineClose className=" text-slate-500" />
                        </button>
                        <div className=" w-[150px] h-[150px] bottom-[-30px] border border-slate-300 relative bg-slate-50 rounded-md ">
                            <img className=' w-full h-full object-cover' src={userProfileImage} alt="" />
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

                        <div className="w-full">
                            <button className='w-full flex items-center justify-center gap-2 h-14 text-sm text-red-100 rounded-md bg-red-500 mt-5'>
                                Delete my account
                                <BiSolidTrash />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
            }
        </>
    )
}

export default Profile