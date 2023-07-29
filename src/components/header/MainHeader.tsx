import { FiMenu } from 'react-icons/fi'
import logo from '../../assets/logo.svg'
import React from 'react';
import { useRecoilValue } from 'recoil';
import { authenticationAtom } from '../../../recoil/atoms/authentication';
import { createRipples } from 'react-ripples';
import AlertPopUp from '../popup/AlertPopUp';
import { Link } from 'react-router-dom';


interface Props {
    openDesktopMenu: Function,
    openMobileMenu: Function
}

const RippleButton = createRipples({
    color: "#ffffff25",
    during: 600,
    className: "rounded-full "
})

const AddButtonRipple = createRipples({
    color: "#ffffff25",
    during: 600,
    className: "rounded-full w-12 h-12 flex items-center justify-center mr-5"
});

const MainHeader: React.FC<Props> = ({ openDesktopMenu, openMobileMenu }) => {
    const { userProfileImage } = useRecoilValue(authenticationAtom);

    return <header className="h-16  items-center z-0 bg-[#ffffff0b] mb-3 flex justify-between">
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
                <img src={logo} className='w-32 cursor-pointer' alt="" />
            </Link>
        </div>

        <div className="cursor-pointer">
            <div className="w-10 mr-4 border-2 p-1 border-slate-300  h-10 rounded-full bg-gray-200">
                <img src={userProfileImage} alt="" />
            </div>
        </div>
    </header>;
};

export default MainHeader;
