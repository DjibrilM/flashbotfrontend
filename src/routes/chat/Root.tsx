import SideNavigation from "../../components/navigation/SideNavigation";
import MainHeader from "../../components/header/MainHeader";
import { Outlet } from "react-router";
import { useParams } from 'react-router-dom';
import chatVector from '../../assets/live-chat.png';

import { createRipples } from 'react-ripples'

const RippleButton = createRipples({
    color: "#ffffff0b",
    during: 600,
    className: "w-[200px] rounded-md "
})


export const Root = () => {
    const param = useParams();

    return <main className="bg-[#131d2f] flex flex-col   min-h-screen h-full w-full" >
        <MainHeader />
        <section className="flex">
            <SideNavigation />

            <section className="mx-5 rounded-md w-full h-full">
                <Outlet />
                {!param.id &&
                    <>
                        <div className="max-w-[500px] bg-white m-auto  h-[300px] rounded-lg ">
                            <img className="w-32 pt-10 m-auto" src={chatVector} alt="" />
                            <h1 className="bg-red text-center mt-3  text-gray-700">No chat selected yet 🤖</h1>
                        </div>
                        <p className="max-w-[500px] m-auto mt-10 w-full text-center text-gray-300 ">
                            This application is in experimental mode, and we only give 10 messages per account
                        </p>
                        <p className="text-white text-center text-sm mt-5">
                            Please feel free to leave your feedback
                        </p>
                        <div className="w-full flex justify-center mt-4">
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


