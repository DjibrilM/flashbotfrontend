import React from "react"


interface Props {
    open: boolean,
    close: () => void,
    errorMessage: string
}


const ErrorPopup: React.FC<Props> = ({ errorMessage, close, open }) => {
    return (
        open ? <>
            <div className='fixed top-0 left-0 z-50 bg-[#131d2fe5]  w-full h-screen'></div>
            <div className="w-full fixed  z-[51] top-0 pt-10 flex justify-center">
                <div className="max-w-[550px] error-popup shadow-lg w-full  flex justify-center flex-col  h-[300px] bg-white">
                    <div className="w-full h-16 flex border border-b"></div>

                    <h1 className='text-center pt-4 text-2xl text-red-500 font-bold'>Ops!Error 🙄</h1>
                    <p className='text-center text-slate-700 mt-3'>{errorMessage}</p>
                    <button  onClick={() => close()} className=' bg-red-500 w-[150px] text-slate-100 cursor-pointer m-auto mt-7 p-3 rounded-md px-5'>Ok</button>
                    <div className="bg-red h-[50%] w-full  items-end flex">
                        <div className="w-full h-20 border-t"></div>
                    </div>
                </div>
            </div>
        </> : <></>
    )
}

export default ErrorPopup