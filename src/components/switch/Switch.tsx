import { useState } from "react";

const Switch = () => {
    const [active, setActive] = useState<boolean>(true);

    return <div className="h-10 overflow-hidden w-[6rem] p-2 relative border-[#ffffff34] rounded-full border bg-[#00000027]">
        <div style={active ? { marginLeft: "3.3rem", } : { marginRight: "1rem" }} className={`w-6 h-6  border-[#ffffff46] border-2 duration-300 cursor-pointer  rounded-full ${active ? "bg-green-500": "bg-gray-400"}  absolute z-20`}>
        </div>

        <div className="absolute font-thin z-0 w-full h-full top-0  items-center px-2 left-0 flex justify-between">
            <p onClick={() => setActive(false)} className=" cursor-pointer pl-1 text-[10px]">OFF</p>
            <p onClick={() => setActive(true)} className="mr-1 cursor-pointer text-[10px]">ON</p>
        </div>
    </div>;
};

export default Switch;
