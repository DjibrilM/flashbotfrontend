import { useState } from "react";

const Switch = () => {
    const [active, setActive] = useState<boolean>(true);

    return <div className={`  ${active ? "bg-green-500" : "bg-gray-400"} h-[3.2rem]  overflow-hidden w-[6rem] flex items-center   pl-2 relative shadow-lg rounded-[100rem] bg-[#00000027]`}>
        <div style={active ? { marginLeft: "2.5rem", } : { marginRight: "2rem" }} className="w-10 h-10 shadow-lg   duration-300 cursor-pointer  rounded-full bg-white  absolute z-20">
        </div>

        <div className="absolute font-thin z-0 w-full h-full top-0  items-center px-2 left-0 flex justify-between">
            <p onClick={() => setActive(false)} className=" cursor-pointer pl-1 text-[10px]">OFF</p>
            <p onClick={() => setActive(true)} className="mr-2 cursor-pointer text-[10px]">ON</p>
        </div>
    </div>;
};

export default Switch;
