import { useState, useEffect } from "react";
import { supabase } from "../main";
import { Link } from "react-router-dom";

export default function LoggedNavbar() {
  const [loggedUser, setLoggedUser] = useState(null);

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setLoggedUser(null);
    }
  }

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setLoggedUser(session.user);
      }
    });
  }, []);

  return (
    <div className='flex items-center'>
      <Link to={`/users/${loggedUser?.user_metadata?.name}`}>
        <button className='flex gap-1 py-[0.9rem] px-2 ml-1 hover:bg-gray-200'>
          <div>
            {loggedUser ? (
              <p className='text-gray-500 text-sm overflow-hidden whitespace-no-wrap'>
                {loggedUser.user_metadata?.name}
              </p>
            ) : null}
          </div>
        </button>
      </Link>
      <button
        type='button'
        className='rounded ml-2 bg-blue-600 px-3 py-1.5 text-[13px]  text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
      >
        <Link to='/' onClick={handleLogout}>
          Logout
        </Link>
      </button>
    </div>
  );
}
