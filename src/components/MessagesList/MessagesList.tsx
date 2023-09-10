import React from 'react'
import feather from '../../assets/feather.png';
import ResponseMessage from '../response-message/response-message';


const NoMessage = () => {
    return (
        <div className="flex flex-col items-center justify-center pb-32 w-full h-full ">
            <div className=" relative right-12 flex items-center flex-col ">
                <img className="w-40 sm:w-52" src={feather} />
                <h1 className=" mt-3 text-slate-300">Type Your First Message</h1>
            </div>
        </div>
    )
};

interface Props {
    selectedChats: any[] | any,
    scrollToEnd: Function
}

const MessagesList: React.FC<Props> = React.memo(({ selectedChats, scrollToEnd })=> {
    return (
        <div>
            {selectedChats!?.length > 0 && (selectedChats?.map((message: any, index: number) => (
                <ResponseMessage
                    id={message.id}
                    index={index}
                    length={selectedChats.length}
                    scrollToTheEnd={() => scrollToEnd()}
                    loaded={message.loaded}
                    result={message.result}
                    prompt={message.prompt} />
            )))}
            {selectedChats!?.length <= 0 && <NoMessage />}
        </div>
    )
},);

export default MessagesList