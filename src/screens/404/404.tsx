import img from '../../assets/undraw_donut_love_kau1.svg';


const unknownPage = () => {
    return (
        <main className=" min-h-screen w-full overflow-hidden">
            <img className='w-52 m-auto mt-20' src={img} alt="" />
            <h1 className=' text-center mt-10 text-4xl text-slate-600'>404</h1>
            <h1 className='text-center mt-10 text-2xl font-bold text-slate-700 '>Page Not Found 😰😰</h1>
        </main>
    )
}

export default unknownPage