import { useLoaderData } from "react-router-dom";
import MobileSidebar from "../components/MobileSidebar";
import { useState } from "react";
import { supabase } from "../main";
export async function loader() {
  const response = await fetch(
    "https://api.stackexchange.com/2.3/tags?pagesize=100&order=desc&sort=popular&site=stackoverflow"
  );

  const datas = await response.json();
  const tags = datas.items.map((tag) => tag.name);

  const { data, error } = await supabase
    .from("tags")
    .upsert(tags.map((name) => ({ name })));

  return tags;
}
export default function Tags() {
  const tags = useLoaderData();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredTags = tags.filter((tag) =>
    tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='flex max-w-[1264px] w-full justify-between relative grow mx-auto'>
      <MobileSidebar />
      <div className='flex flex-col left-[164px] absolute w-[1100px] p-6 -z-10'>
        <h1 className='text-[27px]'>Tags</h1>
        <p className='mb-10'>
          A tag is a keyword or label that categorizes your question with other,
          similar questions. Using <br />
          the right tags makes it easier for others to find and answer your
          question.
        </p>
        <form className='mb-6'>
          <label className='mb-2 text-sm font-medium text-gray-900 sr-only'>
            Search
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
              <svg
                className='w-4 h-4 text-gray-500  block'
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
              name='name'
              className='hidden md:block p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-500 h-7 focus:outline-none'
              placeholder='Filter by tag name...'
              required
              onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on input change
            />
          </div>
        </form>

        {filteredTags.length > 0 ? (
          <ul className='flex flex-wrap gap-2'>
            {filteredTags.map((tag) => (
              <li className='border p-3 pb-8 w-[230px] rounded' key={tag}>
                <p className='inline-block rounded text-[13px] bg-[#D6E8FA] p-1 hover:bg-[#99CCFF] cursor-pointer'>
                  {tag}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-gray-500'>No tags match the search criteria.</p>
        )}
      </div>
    </div>
  );
}
