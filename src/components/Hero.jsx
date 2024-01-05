import Para from "../assets/svgexport-5.svg";
import Search from "../assets/svgexport-searchoı.svg";
import Lock from "../assets/svgexport-lock.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Hero() {
  const strings = [
    "developer",
    "data scientist",
    "game developer",
    "mobile developer",
  ];
  const [currentString, setCurrentString] = useState(strings[0]);

  useEffect(() => {
    setInterval(() => {
      const currentIndex = strings.indexOf(currentString);
      let nextIndex = currentIndex + 1;
      if (nextIndex >= strings.length) {
        nextIndex = 0;
      }

      setCurrentString(strings[nextIndex]);
    }, 2000);
  }, [currentString, strings]);

  return (
    <div className='heroContainer'>
      <div className='hero flex flex-col'>
        <div className='flex w-[924px] items-center mx-auto justify-between mb-12'>
          <div className='w-[442px] bg-[#FBDBC1] rounded-lg h-[252px] flex flex-col items-center p-6 gap-y-5'>
            <img src={Search} alt='' className='w-[48px] h-[48px]' />
            <h2>
              Find the best answer to your technical <br /> question, help
              others answer theirs
            </h2>
            <button
              type='button'
              className='rounded-md ml-1.5 bg-orange-600 px-5 py-3 text-sm  text-white shadow-sm hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              <Link to='/signup'>Join the community</Link>
            </button>
          </div>
          <div className='w-[442px] bg-[#D6E8FA] rounded-lg h-[252px] flex flex-col items-center p-6 gap-y-5 z-10'>
            <img src={Lock} alt='' className='w-[48px] h-[48px]' />
            <h2>
              Want a secure, private space for your <br />
              technical knowledge?
            </h2>
            <button
              type='button'
              className='rounded-md ml-1.5 bg-blue-600 px-5 py-3 text-sm  text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              <Link to='/login'>Login</Link>
            </button>
          </div>
        </div>
        <h1 className='text-white text center text-[55px] w-full text-center'>
          Every{" "}
          <span className='text-orange-600 animasyon'>{currentString}</span> has
          a <br />
          tab open to Stack Overflow
        </h1>
        <span></span>
        <img
          src={Para}
          className='absolute w-[200px] top-0 right-[90px]'
          alt=''
        />
        <img src={Para} className='absolute w-[200px] top-[270px]' alt='' />
      </div>

      <span className='spans'></span>
      <span className='spans'></span>
      <span className='spans'></span>
      <span className='spans'></span>
      <span className='spans'></span>
      <span className='spans'></span>
    </div>
  );
}
