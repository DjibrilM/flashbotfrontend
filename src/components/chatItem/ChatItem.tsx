
import logo from '../../assets/chatbot.png'
import { createRipples } from 'react-ripples';
import { useNavigate, useParams } from 'react-router';



const RippleButton = createRipples({
    color: "#ffffff0b",
    during: 600,
    className: "w-full rounded-md mb-4 "
})

const ChatItem = () => {
    const navigate = useNavigate();
    const params = useParams();


    return <RippleButton>
        <div onClick={() => params.id !== 'lkjdfkf' && navigate({ pathname: "conversation/lkjdfkf" })} className="w-full flex justify-between p-3 h-[70px]  bg-[#ffffff0b] rounded-md">
            <div className="flex  w-full h-full cursor-pointer  gap-2">
                <div className="w-10 flex items-center rounded-full justify-center bg-[#ffffff0b] h-10">
                    <img src={logo} alt="" className="w-5" />
                </div>
                <div className="">
                    <h1 className="font-bold text-sm text-white">Elon musk</h1>
                    <p className="text-[10px] mt-2 text-gray-100">10/4/2022</p>
                </div>
            </div>

        </div>
    </RippleButton>
};

export default ChatItem;
