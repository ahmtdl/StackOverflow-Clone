import { Link } from "react-router-dom";
export default function UnloggedNavbar() {
  return (
    <div className='flex w-[140px] ml-2'>
      <button
        type='button'
        className='rounded bg-white px-3 py-1.5 text-[13px] text-blue-600 shadow-sm ring-1 ring-inset ring-blue-600 hover:bg-blue-100'
      >
        <Link to='/login'>Login</Link>
      </button>
      <button
        type='button'
        className='rounded ml-1.5 bg-blue-600 px-3 py-1.5 text-[13px]  text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
      >
        <Link to='/signup'>Signup</Link>
      </button>
    </div>
  );
}
