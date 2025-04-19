import { evaluate } from 'mathjs'
import React, { useEffect, useState } from 'react'


const Calculator = () => {

    const [bgColor, setBgColor] = useState('#3f799c')
    const [prev, setPrev] = useState('')
    const [input, setInput] = useState('')

    const clickEqual = () => {
        try{
            const expression = input.replace(/X/gi, '*')
            const result = evaluate(expression)
            setPrev(`${input} = `)
            setInput(result.toString())
        }
        catch(error){
            setPrev(`${error} Error`)
            setInput('')
        }
    }

    useEffect(()=>{
        console.log(input);
    },[input])

    const allowInputs = (e) => {
        const value = e.target?.value;
        const filtered = value.replace(/[^0-9+\-*/.]/g, '')
        setInput(filtered)
    }

    const getColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#'
        for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)]
        return color
    }

    const changeColor = () => {
        const color = getColor()
        setBgColor(color)
    }

    return (
        <>
            <section className="calculator w-screen h-screen !bg-white flex items-center justify-center">
                <main className="w-dvh h-dvh flex items-center justify-center p-1" style={{ background: bgColor }}>
                    <div className="calc-container w-full sm:w-5/6 lg:w-4/6 xl:w-3/6 h-5/6 flex flex-col items-center justify-center gap-1 bg-white/50 backdrop-blur-xl rounded-2xl shadow-2xl p-1">
                        <div className="calc-display bg-white/10 w-full h-4/12 flex items-end rounded-2xl p-1">
                            <button className='btn !rounded-full' onClick={changeColor}>Cc</button>
                            <fieldset className='daisy-fieldset bg-white/10 w-full h-4/6 grid items-center rounded-2xl p-1'>
                                <span className=" w-full h-full px-3 text-end">
                                    <input type='text' className="w-full h-full text-end" value={prev} readOnly/>
                                </span>
                                <input type='tel' className="input w-full text-end bg-white/15 border-0 px-3" value={input} onChange={allowInputs}/>
                            </fieldset>
                        </div>
                        <div className="calc-button bg-white/10 w-full h-8/12 grid rounded-2xl p-1">
                            <div className=" row-span-5 grid grid-cols-5 gap-1 p-1">
                                <div className="bg-white/15 col-span-4 grid gap-1 rounded-2xl p-1">
                                    <div className="w-full rounded-2xl grid grid-cols-3 p-1 ps-3 items-center justify-center gap-2">
                                        <button type="button" className='btn btn-outline w-5/6 h-5/6' onClick={() => {
                                            setPrev('')
                                            setInput('')
                                        }}>Ac</button>
                                        <button type="button" className='btn btn-outline w-5/6 h-5/6' onClick={() => setInput(p => p.slice(0, -1))}>DEL</button>
                                        <button type="button" className='btn btn-outline w-5/6 h-5/6' onClick={() => setInput(p => p + '/')}>/</button>
                                    </div>
                                    <div className="w-full row-span-10 ps-3 grid grid-cols-3   items-center rounded-2xlr">
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, i) => (
                                            <button key={i} type="button" className='btn btn-outline w-5/6 h-4/6' onClick={() => setInput(prev => prev + num.toString())}>{num}</button>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-white/15 grid grid-cols-1 items-center rounded-2xl p-1">
                                    <button type="button" className='btn btn-outline h-3/6' onClick={() => setInput(p => p + '*')}>*</button>
                                    <button type="button" className='btn btn-outline h-4/6' onClick={() => setInput(p => p + '-')}>-</button>
                                    <button type="button" className='btn btn-outline h-5/6' onClick={() => setInput(p => p + '+')}>+</button>
                                </div>
                            </div>
                            <div className="bg-white/15 row-span-1 grid grid-cols-5 items-center gap-1 p-1 rounded-2xl">
                                <button type="button" className='btn btn-outline' onClick={() => setInput(p => p + '0')}>0</button>
                                <button type="button" className='btn btn-outline' onClick={() => setInput(p => p + '00')}>00</button>
                                <button type="button" className='btn btn-outline' onClick={() => setInput(p => p + '.')}>.</button>
                                <button type="button" className='btn btn-outline col-span-2' onClick={clickEqual}>=</button>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    )
}

export default Calculator