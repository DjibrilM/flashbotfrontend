import React from 'react'
import { BsCheck2Circle } from 'react-icons/bs'
import { motion } from 'framer-motion'

interface Props {
    message: string,
}

const bottomSnackMessage: React.FC<Props> = ({ message }) => {
    return (
        <motion.div initial={{ bottom: 0, opacity: 0 }} animate={{ bottom: 30, opacity: 1 }} className=' bottom-10 flex px-2 items-center gap-1 py-2 text-center rounded-md mx-[50%] w-[200px] bg-slate-600 text-slate-100 absolute'>
            <div className=" bg-green-500 p-2 rounded-full">
                <BsCheck2Circle />
            </div>
            <div className="w-full">
                <span className=' text-center'>{message}</span>
            </div>
        </motion.div>
    )
}

export default bottomSnackMessage