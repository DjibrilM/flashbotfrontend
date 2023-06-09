import { FiMenu } from 'react-icons/fi'
import logo from '../../assets/logo.png'
import React from 'react';
import { createRipples } from 'react-ripples';


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
})

const MainHeader: React.FC<Props> = ({ openDesktopMenu, openMobileMenu }) => {
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
            <img src={logo} className='w-32' alt="" />
        </div>
    </header>;
};

export default MainHeader;
