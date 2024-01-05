import { Link, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react"; // Import useState and useEffect
import MobileSidebar from "../components/MobileSidebar";
import { supabase } from "../main";

export async function loader() {
  const { data, error } = await supabase
    .from("users")
    .select("user_name, profile_img");

  if (error) {
    console.error("Error fetching users:", error.message);
    return [];
  }

  return data;
}

export default function Users() {
  const initialUsers = useLoaderData();
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  const filteredUsers = users.filter((user) =>
    user.user_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='flex max-w-[1264px] w-full justify-between relative grow mx-auto'>
      <MobileSidebar />
      <div className='flex flex-col left-[164px] absolute w-[1100px] p-6 -z-10'>
        <h1 className='text-[27px] mb-8'>Users</h1>

        <form className='mb-6'>
          <label className='mb-2 text-sm font-medium text-gray-900 sr-only'>
            Search
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
              <svg
                className='w-4 h-4 text-gray-500 dark:text-gray-400 block'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1'
                  d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                />
              </svg>
            </div>
            <input
              type='search'
              name='user_name'
              className='hidden md:block p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-500 h-7 focus:outline-none'
              placeholder='Filter by user name...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
            />
          </div>
        </form>

        {filteredUsers.length > 0 ? (
          <ul className='flex flex-wrap gap-2'>
            {filteredUsers.map((user) => (
              <Link to={`/users/${user.user_name}`} key={user.user_name}>
                <li className='border p-3 rounded flex gap-2'>
                  <img
                    src={user.profile_img}
                    alt=''
                    className='rounded w-12 h-12'
                  />
                  <p className='text-[15px] text-blue-400'>{user.user_name}</p>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <p className='text-gray-500'>No users match the search criteria.</p>
        )}
      </div>
    </div>
  );
}
