import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/svgexport-19 (1).svg";
import { supabase } from "../main";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function login(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });

    if (error) {
      if (error.status === 400) {
        setError("Invalid email or password. Please check your credentials.");
      }
    } else {
      navigate("/home");
    }
  }

  return (
    <div className='flex flex-col items-center bg-[#F1F2F3] h-screen pt-7'>
      <img src={Logo} alt='' className='mb-9' />
      <form
        className='w-80 bg-white border shadow-xl rounded-lg mx-auto p-6 h-[330px]'
        onSubmit={login}
      >
        <div className='mb-5'>
          <label className='block mb-2 text-sm font-medium '>Your email</label>
          <input
            type='email'
            name='email'
            className={`min-h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
              error ? "border-red-500 border-2" : ""
            }`}
            required
          />
        </div>
        <div className='mb-5'>
          <label className='block mb-2 text-sm font-medium '>
            Your password
          </label>

          <input
            type='password'
            name='password'
            className={`min-h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
              error ? "border-red-500 border-2" : ""
            }`}
            required
          />
          {error && <p className='text-red-500 text-[13px] mt-1'>{error}</p>}
        </div>

        <button
          type='submit'
          className='mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center  mt-2'
        >
          Login
        </button>
      </form>
      <p className='pt-4 text-[13px]'>
        Don’t have an account?
        <Link to='/signup' className='pl-3 text-blue-500'>
          Sign Up
        </Link>
      </p>
    </div>
  );
}
