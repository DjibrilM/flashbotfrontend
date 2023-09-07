
import { createRipples } from "react-ripples";
import { RotatingLines } from "react-loader-spinner";
import { BsFillExclamationTriangleFill } from 'react-icons/bs';
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { scalPopupAnimate, scalPopupInitial } from "../../framermotion/animationVariant";

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
            <section
                onClick={() => alert('hello it is me')}
                style={!open ? {
                    display: "none"
                } : { display: "block" }} className='w-full p-4 bg-[#131d2fe5] left-0   z-50 top-0 fixed  bottom-0'>

            </section>

            {open &&
                    <motion.div onAnimationComplete={()=> alert("sya something ")} transition={{ type: "spring", duration: 0.4 }} initial={scalPopupInitial} animate={scalPopupAnimate} className="w-full   fixed top-5   z-50">
                        <div className="max-w-[500px] duration-300 flex flex-col overflow-hidden shadow-lg max-h-[300px]  h-full   bg-white m-auto mt-16 rounded-md " >
                            <div className=" basis-4/5 w-ful">
                                <div className="w-16 h-16 bg-[#eb8d8d5c]  m-auto mt-5 flex justify-center rounded-full  items-center">
                                    <BsFillExclamationTriangleFill className=" text-center text-2xl text-red-500" />
                                </div>


                                <h1 className="text-center font-semibold text-slate-700 mt-2">{title}</h1>
                                <p className=" text-slate-500 text-sm text-center m-4 mb-7 leading-7">{description}</p>
                            </div>

                            <div className="w-full text-sm  flex h-16 border-t border-[#0000001f] ">
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
                    </motion.div>
            }
        </>
    )
}

export default AlertPopUp