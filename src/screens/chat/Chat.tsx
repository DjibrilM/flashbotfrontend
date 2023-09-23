import SideNavigation from "../../components/navigation/SideNavigation";
import MainHeader from "../../components/header/MainHeader";
import { Outlet } from "react-router";
import { useParams } from 'react-router-dom';
import { AiFillApi } from 'react-icons/ai'
import MobileSideMenu from '../../components/navigation/MobileSideMenu';
import { useLocalStorage } from "../../hooks/localStorage";
import BottomSnackMessage from "../../components/popup/bottomSnackMessage";

import { createRipples } from 'react-ripples'
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const RippleButton = createRipples({
    color: "#ffffff0b",
    during: 600,
    className: "w-full mt-5 rounded-md "
})


export const Chat = () => {
    const param = useParams();
    const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(true);
    const [mobileSideMenuOpen, SetMobileSideMenuOpen] = useState<boolean>(false);
    const [apikey, setApikey] = useState<string>('');
    const { setItem, getItem } = useLocalStorage();
    const [showScanBar, setShowSnackBar] = useState<boolean>(false);

    const saveAPikey = (e: FormEvent) => {
        e.preventDefault();
        setItem(apikey, 'api-key');
        setShowSnackBar(true);

        const timeout = setTimeout(() => {
            setShowSnackBar(false);
            clearTimeout(timeout);
        }, 1000);
    }

    useEffect(() => {
        setApikey(getItem('api-key'));
    }, [])

    return <main className="bg-[#131d2f] flex flex-col     h-screen  w-full" >
        <MainHeader openMobileMenu={() => SetMobileSideMenuOpen(true)} openDesktopMenu={() => setSideMenuOpen(!sideMenuOpen)} />
        <section style={{ gap: sideMenuOpen ? "30px" : "" }} className="flex h-full  custom-md:mx-5 ">
            <SideNavigation isOpen={sideMenuOpen} />
            <MobileSideMenu IsOpen={mobileSideMenuOpen} onClose={() => SetMobileSideMenuOpen(false)} />
            <section className="rounded-md w-full  h-[calc(100vh-10px)]  flex flex-col">
                <Outlet />
                {!param.id &&
                    <>
                        <div className="sm:max-w-[500px] sm:w-full bg-white mt-32 mx-2 sm:mx-auto py-4  px-4 rounded-lg  ">
                            <div className=" w-full flex justify-center pt-5">
                                <AiFillApi className=" text-center text-4xl text-slate-600" />
                            </div>
                            <h1 className=" text-center  mb-5 text-2xl font-bold text-slate-600">Your api-key</h1>
                            <p className=" text-center text-slate-600">Your api-key is safe and is only stored in your local storage</p>
                            <form onSubmit={saveAPikey} action="">
                                <input defaultValue={apikey} pattern="^[A-Za-z][A-Za-z0-9!@#$%^&* ]*$" minLength={4} onChange={(e: ChangeEvent<HTMLInputElement>) => setApikey(e.target.value)} formNoValidate required type="text" className="rounded-md invalid:border-red-500 outline-slate-500 mt-5 w-full py-2 px-2 border border-slate-300" />

                                <RippleButton>
                                    <button className=" w-full py-3 text-slate-100 bg-slate-800">Save api-key</button>
                                </RippleButton>
                            </form>
                        </div>
                    </>
                }
            </section>
        </section>
        {showScanBar && <BottomSnackMessage message="key saved" />}
    </main>;
};


