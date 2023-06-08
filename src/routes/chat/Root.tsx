import SideNavigation from "../../components/navigation/SideNavigation";
import MainHeader from "../../components/header/MainHeader";
import { Outlet } from "react-router";
import { useParams } from 'react-router-dom';
import chatVector from '../../assets/live-chat.png';


export const Root = () => {
    const param = useParams();

    return <main className="bg-[#131d2f] flex flex-col   min-h-screen h-full w-full" >
        <MainHeader />
        <section className="flex">
            <SideNavigation />

            <section className="mx-5 rounded-md w-full h-full">
                <Outlet />
                {!param.id &&
                    <div className="max-w-[500px] bg-white m-auto  h-[300px] rounded-lg ">
                        <img className="w-32 pt-10 m-auto" src={chatVector} alt="" />
                        <h1 className="bg-red text-center mt-3  text-gray-700">No chat selected yet 🤖</h1>
                    </div>
                }
            </section>
        </section>
    </main>;
};


