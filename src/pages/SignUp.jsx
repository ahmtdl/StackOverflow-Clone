import MessageBox from "../assets/svgexport-19.svg";
import Arrows from "../assets/svgexport-20.svg";
import Badge from "../assets/svgexport-21.svg";
import Achievement from "../assets/svgexport-22.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../main";

async function getRandomProfileImage() {
  const { data: files, error } = await supabase.storage
    .from("profile_images")
    .list();
  console.log(files);

  const randomFile = files[Math.floor(Math.random() * files.length)];

  const { data: publicUrlData, error: publicUrlError } = await supabase.storage
    .from("profile_images")
    .getPublicUrl(randomFile.name);

  const publicUrl = publicUrlData?.publicUrl;

  if (!publicUrl) {
    return null;
  }

  return publicUrl;
}

export default function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  async function signUp(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData);

    if (user.password.length < 6) {
      setPasswordError("Password must contain at least six characters.");
      return;
    } else {
      setPasswordError(null);
    }

    let profileImageUrl;

    profileImageUrl = await getRandomProfileImage();

    const { user: authUser, error: authError } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        data: {
          name: user.name,
          profile_img: profileImageUrl, // Assign the random image URL to profile_img
        },
      },
    });

    if (authError) {
      if (authError.status === 400) {
        setError("User already registered.");
      }
      return;
    }

    const { data: profileData, error: profileError } = await supabase
      .from("users")
      .upsert([
        {
          user_name: user.name,
          email: user.email,
          profile_img: profileImageUrl, // Assign the random image URL to profile_img
        },
      ]);

    setError(null);

    navigate("/home");
  }

  return (
    <div className='bg-[#F1F2F3] grid grid-cols-2 h-screen pt-8'>
      <div className='flex flex-col items-end pt-28'>
        <h2 className='mb-2 text-lg font-semibold text-gray-900  text-[27px] mb-5'>
          Join the Stack Overflow community
        </h2>
        <ul className='max-w-md space-y-1 list-inside '>
          <li className='flex items-center gap-5 p-3'>
            <img src={MessageBox} alt='' />
            Get unstuck — ask a question
          </li>
          <li className='flex items-center gap-5 p-3'>
            <img src={Arrows} alt='' />
            Unlock new privileges like voting and commenting
          </li>
          <li className='flex items-center gap-5 p-3'>
            <img src={Badge} alt='' />
            Save your favorite questions, answers, watch tags, and more
          </li>
          <li className='flex items-center gap-5 p-3'>
            <img src={Achievement} alt='' />
            Earn reputation and badges
          </li>
        </ul>
      </div>
      <div className='flex flex-col items-center'>
        <form
          className='w-80 bg-white border shadow-xl rounded-lg mx-auto p-6 h-[550px]'
          onSubmit={signUp}
        >
          <div className='mb-5'>
            <label className='block mb-2 font-medium text-bold '>
              Display Name
            </label>
            <input
              type='text'
              name='name'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              required
            />
          </div>
          <div className='mb-5'>
            <label className='block mb-2 text-bold font-medium'>
              Your email
            </label>
            <input
              type='email'
              name='email'
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5${
                error ? "border-2 border-red-500" : "" // Set border color to red if there's an error
              }`}
              required
            />
            {error && <p className='text-red-500 text-[13px] mt-1'>{error}</p>}
          </div>
          <div className='mb-5'>
            <label className='block mb-2 text-bold font-medium'>
              Your password
            </label>

            <input
              type='password'
              name='password'
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5${
                passwordError ? "border-red-500 border-2" : "" // Set border color to red if there's a password error
              }`}
              required
            />
            {/* Display password error message below password input */}
            {passwordError && (
              <p className='text-red-500 text-[13px] mt-1 '>{passwordError}</p>
            )}
          </div>

          <button
            type='submit'
            className='mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mt-2'
          >
            Sign Up
          </button>
          <p className='text-[13px] mt-6'>
            By clicking “Sign up”, you agree to our terms of service and
            acknowledge that you have read and understand our privacy policy and
            code of conduct.
          </p>
        </form>
        <p className=' pt-4 text-[13px]'>
          Already have an account?
          <Link to='/login' className='pl-3 text-blue-500'>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
