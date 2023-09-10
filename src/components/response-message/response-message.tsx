import imageLogo from '../../assets/chatbot.png';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useEffect, useRef, useState, useTransition, } from 'react';
import { RotatingLines } from 'react-loader-spinner'

interface Props {
    prompt: string,
    result: string,
    loaded: boolean,
    scrollToTheEnd: () => void,
    index: number,
    length: number,
    id: string
}

const ResponseMessage: React.FC<Props> = ({ prompt, result, index, length, id }) => {
    const [preview, setPreview] = useState<boolean>(false);
    const [pending, setPreviewier] = useTransition();
    const messageElement = useRef<HTMLDivElement>();

    useEffect(() => {
        setPreviewier(() => {
            setPreview(true);
        })
    }, []);


    useEffect(() => {
        if (index === length - 1 && !pending) {
            messageElement.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [pending])

    return (
        <div className={"mb-10"} id={id}>
            <div ref={(el: HTMLDivElement) => messageElement.current = el} className="flex gap-3    rounded-md ">
                {!pending && <>
                    <div className="min-w-[50px] h-[50px]   border-2 border-[#ffffff27] flex items-center justify-center rounded-md bg-black ">
                        <h1>ME</h1>
                    </div>

                    <div className="bg-[#0006] max-w-[840px] p-4 rounded-md ">
                        <p className="leading-8 text-slate-300">
                            {prompt}
                        </p>
                    </div>
                </>
                }

                {
                    pending && <div className=" bg-[#0006] rounded-[5px]">
                        <div className="loadingCard  w-[400px] h-[60px]">
                        </div>
                    </div>
                }
            </div>

            <div className={`mt-4 gap-4 relative  bg-[#0006]  max-w-[900px] w-full    rounded-md ${!pending && 'p-4'} `}>
                {!pending && <div className="w-[3rem] h-[3rem] border-2 border-[#ffffff27] flex items-center justify-center rounded-md bg-black ">
                    <img src={imageLogo} className='w-5' alt="" />
                </div>
                }

                {preview && (
                    <MarkdownPreview style={{ padding: 20, marginTop: 50, background: "transparent" }} className='previewer' source={result} />
                )}

                {pending &&
                    (<div className="loadingCard h-[150px] flex items-center justify-center  w-full">
                        <RotatingLines width='20' strokeColor='#ffff' />
                    </div>
                    )
                }
            </div>
        </div>
    );
};

export default ResponseMessage;
