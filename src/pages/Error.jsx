import { Link } from "react-router-dom";
import ErrorIcon from "../assets/svgexport-error.svg";

export default function Error() {
  return (
    <div className='bg-[#F1F2F3] h-screen flex justify-center gap-3 pt-36'>
      <img src={ErrorIcon} className='h-48 w-48' alt='' />
      <div className='flex flex-col gap-2 m-6'>
        <h1 className='text-[27px]'>Heyy I am just clone bro!!!</h1>
        <h2 className='text-[21px]'>
          I stole Stackoverflow website but it seems you catch me.
        </h2>
        <p className='text-[15px]'>
          Now be quiet and go back to
          <Link to={"/"} className='pl-2 text-blue-500'>
            Home
          </Link>
        </p>
      </div>
    </div>
  );
}
