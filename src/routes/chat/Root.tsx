import SideNavigation from "../../components/navigation/SideNavigation";
import MainHeader from "../../components/header/MainHeader";
import { Outlet } from "react-router";
import { useParams } from 'react-router-dom';
import chatVector from '../../assets/live-chat.png';
import MobileSideMenu from '../../components/navigation/MobileSideMenu';

import { createRipples } from 'react-ripples'
import { useState } from "react";

const RippleButton = createRipples({
    color: "#ffffff0b",
    during: 600,
    className: "w-[200px] rounded-md "
})

const WhiteRippleButton = createRipples({
    color: "#ffffff64",
    during: 600,
    className: "w-[200px]  rounded-md "
})



export const Root = () => {
    const param = useParams();
    const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(true);
    const [mobileSideMenuOpen, SetMobileSideMenuOpen] = useState<boolean>(false);

    return <main className="bg-[#131d2f] flex flex-col   h-screen  w-full" >
        <MainHeader openMobileMenu={() => SetMobileSideMenuOpen(true)} openDesktopMenu={() => setSideMenuOpen(!sideMenuOpen)} />
        <section style={{ gap: sideMenuOpen ? "30px" : "" }} className="flex h-full  mx-5 ">
            <SideNavigation isOpen={sideMenuOpen} />
            <MobileSideMenu IsOpen={mobileSideMenuOpen} onClose={() => SetMobileSideMenuOpen(false)} />
            <section className="rounded-md w-full h-[calc(100vh-90px)] justify-between gap-4 flex flex-col">
                <Outlet />
                {!param.id &&
                    <>
                        <div className="max-w-[500px] w-full bg-white m-auto  h-[300px] rounded-lg  ">
                            <img className="w-32 pt-10 m-auto" src={chatVector} alt="" />
                            <h1 className="bg-red text-center  mt-3  text-gray-700">No chat selected yet <span className="text-3xl">🤖</span> </h1>

                            <div className="flex justify-center">
                                <WhiteRippleButton>
                                    <button onClick={() => SetMobileSideMenuOpen(true)} className="px-7 custom-md:hidden font-bold text-white mt-5 rounded-md text-sm bg-blue-500 py-3 m-auto">
                                        select chat
                                    </button>
                                </WhiteRippleButton>
                            </div>

                        </div>
                        <p className="max-w-[500px] custom-md:block hidden  m-auto mt-10 w-full text-center text-gray-300 ">
                            This application is in experimental mode, and we only give 10 messages per account
                        </p>
                        <p className="text-white custom-md:block hidden  text-center text-sm mt-5">
                            Please feel free to leave your feedback
                        </p>
                        <div className="w-full custom-md:flex hidden justify-center mt-4">
                            <RippleButton >
                                <div className="bg-[#ffffff0b] max-w-[] w-full rounded-md overflow-hidden">
                                    <button className="w-full text-sm h-[3rem] font-bold text-white  active:shadow-lg  bg-[##ffffff19]">
                                        contact us
                                    </button>
                                </div>
                            </RippleButton>
                        </div>
                    </>
                }
            </section>
        </section>
    </main>;
};


