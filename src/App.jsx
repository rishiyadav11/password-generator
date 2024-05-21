import React, { useEffect, useCallback, useState } from 'react'
import Typewriter from 'typewriter-effect/dist/core';
import { TbRefresh } from "react-icons/tb";
const App = () => {
  const [password, setPassword] = useState("")
  const [digit, setDigit] = useState(false)
  const [special, setSpecial] = useState(false)
  const [uppercaseCheck, setuppercaseCheck] = useState(true)
  const [lowercaseCheck, setlowercaseCheck] = useState(true)
  const [length, setLength] = useState(8)
  const [refresh, setRefresh] = useState(false)
  const [copy, setcopy] = useState("Copy You password")

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = ""
    if (digit) str += "1234567890"
    if(uppercaseCheck) str+= "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(lowercaseCheck) str += "abcdefghijklmnopqrstuvwxyz"
    if (special) str += "!@#$%^&*()_-=+-*/.?><{}[];:`"
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [digit, special, length,lowercaseCheck,uppercaseCheck,refresh])

  useEffect(() => {
    passwordGenerator();
  }, [digit, special, length, refresh, passwordGenerator])
  let typtext = document.querySelector('#typetext')
  useEffect(() => {
    let typtext = document.querySelector('#typetext');
    new Typewriter(typtext, {
      strings: ['Generate Your Password !'],
      autoStart: true,
      loop: true,
    });
  }, []);


  const handleClick = () => {
    navigator.clipboard.writeText(password)
    setcopy("Copied !!");
    setTimeout(() => {
      setcopy("Copy Your password");
    }, 2000);
  };
  return (
    <>
    <div className=" w-screen h-screen flex items-center justify-center  bg-cyan-600  ">
      <div className={`max-w-screen-lg w-full h-[85%] rounded-xl pl-4 shadow-2xl shadow-gray-800 pt-5 flex flex-col items-center justify-start gap-6 bg-sky-700`}>
        <h1 id='typetext' className='text-white text-3xl font-semibold'></h1>
        <div className=" border-b-2 w-[70%] flex justify-between px-2 py-1 items-center border-black">
        <input type="text"
        readOnly
        value={password}
        className='outline-none w-[95%]  bg-transparent text-3xl border-black'
         />
         <TbRefresh onClick={()=>passwordGenerator()} className='text-3xl cursor-pointer' />
        </div>
     <div className="w-[70%] h-[60%] border border-black rounded-lg grid grid-cols-2 gap-1">
      <div className="flex items-center gap-2 px-4">
        <label htmlFor='number' className='select-none cursor-pointer text-2xl'>Number</label>
        <input id='number' checked={digit}  onClick={() => setDigit(!digit)} className='h-4 w-4 cursor-pointer' type="checkbox" />
      </div>
      <div className="flex items-center gap-2 px-4">
        <label htmlFor='symbol' className='select-none cursor-pointer text-2xl'>Symbol</label>
        <input id='symbol' checked={special}  onClick={() => setSpecial(!special)} className='h-4 w-4 cursor-pointer' type="checkbox" />
      </div>
      <div className="flex items-center gap-2 px-4">
        <label htmlFor='uppercase' className='select-none cursor-pointer text-2xl'>Uppercase</label>
        <input id='uppercase' checked={uppercaseCheck}  onClick={() => setuppercaseCheck(!uppercaseCheck)} className='h-4 w-4 cursor-pointer' type="checkbox" />
      </div>
      <div className="flex items-center gap-2 px-4">
        <label htmlFor='lowercase' className='select-none cursor-pointer text-2xl'>Lowercase</label>
        <input id='lowercase' checked={lowercaseCheck}  onClick={() => setlowercaseCheck(!lowercaseCheck)} className='h-4 w-4 cursor-pointer' type="checkbox" />
      </div>
      <div className="flex items-center px-4 gap-2 col-span-2">
        <label className='select-none cursor-pointer text-2xl' htmlFor="length">Length ({length})</label>
        <input
          type="range"
          min="1"
          max="40"
          className='w-[80%]'
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          name="length"
          id="length"
        />
      </div>
    </div>
    <div onClick={handleClick} className="btn bg-green-500 py-2 px-3 rounded-xl cursor-pointer text-3xl ">{
      copy
    }
    </div>
      </div>
    </div>
    </>
  )
}

export default App
