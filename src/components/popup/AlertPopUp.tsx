
import { createRipples } from "react-ripples";
import { RotatingLines } from "react-loader-spinner";
import { TbInfoCircle } from 'react-icons/tb';
import React, { useState, useEffect } from "react";

const RippleButton = createRipples({
    color: "#0000001f",
    during: 400,
    className: "w-full  h-full"
});

interface Props {
    Loading: boolean,
    title: string,
    description: string,
    action: () => void,
    open: boolean,
    close: () => void,
}


const AlertPopUp: React.FC<Props> = ({ Loading, title, description, action, open, close }) => {
    const [isLoading, setIsloading] = useState<boolean>(Loading);

    useEffect(() => {
        setIsloading(Loading);
    }, [Loading])


    return (

        <>
            <section style={!open ? {
                display: "none"
            } : { display: "block" }} className='w-full p-4 bg-[#131d2fe5]   z-50 top-0 fixed  bottom-0'>

            </section>

            <div style={!open ? { transform: "translateY(-1000px)" } : { transform: "translateY(0px)" }} className="w-full  duration-200 fixed top-0  z-50">
                <div className="max-w-[600px] duration-300 flex flex-col overflow-hidden shadow-lg max-h-[400px]  h-full  bg-white m-auto mt-16 rounded-md " >
                    <div className=" basis-4/5 w-ful">
                        <div className="w-full flex items-center justify-center pt-8">
                            <TbInfoCircle className=" text-center text-4xl text-slate-500" />
                        </div>


                        <h1 className="text-center text-[1.2rem] font-semibold text-slate-700 mt-4">{title}</h1>
                        <p className=" text-slate-500 text-center m-4 leading-7">{description}</p>
                    </div>

                    <div className="w-full  flex h-20 border-t border-[#0000001f] ">
                        <RippleButton onClick={() => {
                            const closeTimeout = setTimeout(() => {
                                clearTimeout(closeTimeout);
                                close()
                            }, 200)
                        }}>
                            <button className="w-full text-green-700 border-r border-[#0000001f]  h-full">Cancel</button>
                        </RippleButton>

                        <RippleButton>
                            <button onClick={() => action()} className="h-full text-red-500 flex items-center justify-center  w-full">
                                {isLoading &&
                                    <RotatingLines
                                        strokeColor="#7777"
                                        width="35"
                                    />
                                }
                                {!isLoading &&
                                    <span>Continue</span>
                                }
                            </button>
                        </RippleButton>

                    </div>
                </div>
            </div>
        </>
    )
}

export default AlertPopUp