import React from "react";
import { BsEmojiFrown } from 'react-icons/bs';
import { scalPopupAnimate, scalPopupInitial } from "../../framermotion/animationVariant";

import { motion } from "framer-motion";


interface Props {
    open: boolean,
    close: () => void,
    errorMessage: string
};





const ErrorPopup: React.FC<Props> = ({ errorMessage, close, open }) => {
    return (
        open ? <>
            <div onClick={() => close()} className='fixed top-0 left-0 z-[52] bg-[#131d2fe5]  w-full h-screen'></div>
            <div className="w-full fixed  z-[53] top-0 pt-20 flex justify-center">
                <motion.div animate={scalPopupAnimate} initial={scalPopupInitial} className="max-w-[550px] mx-3  flex flex-col justify-between relative overflow-hidden rounded-md  shadow-lg w-full    h-[250px] bg-white">

                    <div className="">
                        <div className="p-4 bg-[#eb8d8d5c] w-14 flex items-center justify-center h-14 m-auto mt-5 rounded-full">
                            <BsEmojiFrown className="text-3xl text-red-500 " />
                        </div>

                        <p className=" text-slate-700 text-sm text-center mt-4">{errorMessage}</p>
                    </div>

                    <div className="w-full flex items-center justify-end pr-6 border-t h-[64px] ">
                        <button onClick={() => close()} className="active:bg-[#00000014] py-3 w-[100px] rounded-md text-sm bg-[#00000009] px-3 border">
                            Ok
                        </button>
                    </div>
                </motion.div>
            </div>
        </> : <></>
    )
}

export default ErrorPopup