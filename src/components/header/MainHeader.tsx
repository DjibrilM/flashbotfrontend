import { FiMenu } from 'react-icons/fi'
import logo from '../../assets/logo.png'

const MainHeader = () => {
    return <header className="h-16 rounded-md items-center bg-[#ffffff0b] m-5 flex justify-between">
        <div className="flex items-center gap-5 px-4">
            <FiMenu className="text-white cursor-pointer text-2xl" />
            <img src={logo} className='w-32' alt="" />
        </div>

        <div className="pr-10">
            <div className="w-10 h-10 flex items-center justify-center border-[3px] bg-[#131d2f] rounded-full ">
                <h1 className='text-2xl text-white'>D</h1>
            </div>
        </div>
    </header>;
};

export default MainHeader;
