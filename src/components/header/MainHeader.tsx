import { FiMenu } from 'react-icons/fi'
import logo from '../../assets/logo.svg'
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { authenticationAtom } from '../../../recoil/atoms/authentication';
import { createRipples } from 'react-ripples';
import { Link } from 'react-router-dom';
import Profile from '../Profile/Profile';


interface Props {
    openDesktopMenu: Function,
    openMobileMenu: Function
}

const RippleButton = createRipples({
    color: "#ffffff25",
    during: 600,
    className: "rounded-full "
});


const MainHeader: React.FC<Props> = ({ openDesktopMenu, openMobileMenu }) => {
    const { userProfileImage } = useRecoilValue(authenticationAtom);
    const [profileOpened, setProfileOpened] = useState<boolean>(false);

    return <>
        <Profile opened={profileOpened} closeFn={() => setProfileOpened(false)} />
        <header className='h-16 border-b border-[#ffffff15]  items-center  fixed z-40 top-0 left-0 right-0 backdrop-blur-md bg-[#212c3b9c]  flex justify-between'>
            <div className="flex items-center gap-5 sm:px-4">
                <RippleButton>
                    <button onClick={() => openDesktopMenu()} className='p-2 bg-[#ffffff0b] custom-md:block hidden rounded-full'>
                        <FiMenu className="text-white cursor-pointer text-2xl" />
                    </button>
                </RippleButton>

                <RippleButton>
                    <button onClick={() => openMobileMenu()} className='p-2 bg-[#ffffff0b] custom-md:hidden  rounded-full'>
                        <FiMenu className="text-white cursor-pointer text-2xl" />
                    </button>
                </RippleButton>
                <Link to={'/'}>
                    <img src={logo} className='w-24 cursor-pointer' alt="" />
                </Link>
            </div>

            <div className="cursor-pointer" onClick={() => setProfileOpened(true)}>
                <div className="w-10 mr-4 border-2 p-1 border-slate-300  h-10 rounded-full bg-gray-200">
                    <img src={userProfileImage} alt="" />
                </div>
            </div>
        </header>

    </>
};

export default MainHeader;
