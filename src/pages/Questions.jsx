import React from "react";
import HomeRight from "../components/HomeRight";
import MobileSidebar from "../components/MobileSidebar";
import { supabase } from "../main";
import { Link, useLoaderData } from "react-router-dom";

export async function loader() {
  const { data: questionsData, error: questionsError } = await supabase
    .from("questions")
    .select("*");

  if (questionsError) {
    console.error(questionsError.message);
  }

  const userIds = questionsData.map((question) => question.user_id);
  const { data: usersData, error: usersError } = await supabase
    .from("users")
    .select("id, user_name")
    .in("id", userIds);

  if (usersError) {
    console.error(usersError.message);
  }

  return { questions: questionsData, users: usersData };
}

export default function Questions() {
  const { questions, users } = useLoaderData();

  return (
    <div className='flex max-w-[1264px] w-full justify-between relative grow mx-auto'>
      <MobileSidebar />
      <div className='flex justify-between -z-10 pt-6 left-[164px] absolute'>
        <div className='felx flex-col w-[778px]'>
          <div className='flex flex-col border-b border-gray-300 pb-4'>
            <div className='flex justify-between mb-6'>
              <h1 className='text-[27px] pl-6'>Top Questions</h1>
              <button
                type='button'
                className='rounded-md ml-1.5 bg-[#1b75d0] p-[10.8px] text-[13px]  text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                <Link to='/questions/askquestion'>Ask Question</Link>
              </button>
            </div>
            <div className='flex justify-end rounded-md'>
              <button
                type='button'
                className='px-4 py-2 text-[13px] text-gray-900 bg-white border border-gray-400 rounded-s-md hover:bg-gray-100'
              >
                All
              </button>
              <button
                type='button'
                className='px-4 py-2 text-[13px] text-gray-900 bg-white border-t border-r border-b border-gray-400 hover:bg-gray-100'
              >
                Answered
              </button>
              <button
                type='button'
                className='px-4 py-2 text-[13px] text-gray-900 bg-white border-t border-r border-b border-gray-400 hover:bg-gray-100'
              >
                Hot
              </button>
              <button
                type='button'
                className='px-4 py-2 text-[13px] text-gray-900 bg-white border-t border-b border-gray-400 hover:bg-gray-100'
              >
                Week
              </button>
              <button
                type='button'
                className='px-4 py-2 text-[13px] text-gray-900 bg-white border border-gray-400 rounded-e-md hover:bg-gray-100'
              >
                Month
              </button>
            </div>
          </div>
          <div className='flex flex-col'>
            {questions.map((question) => {
              const user = users.find((user) => user.id === question.user_id);

              return (
                <div
                  key={question.id}
                  className='grid grid-cols-[1fr,5.5fr] p-4 border-b border-gray-300'
                >
                  <div className='flex flex-col items-end gap-1.5 mr-4 text-[13px]'>
                    <span>4 votes</span>
                    <span>0 answers</span>
                    <span>3 views</span>
                  </div>
                  <div>
                    <Link to={`/questions/${question.id}`}>
                      <h2 className='text-[17px] text-[#1b75d0]'>
                        {question.title}
                      </h2>
                    </Link>
                    <p className=' text-[13px] mb-4 line-clamp-2'>
                      {question.body}
                    </p>
                    <div className='flex justify-between'>
                      <ul className='flex gap-1 text-[13px]'>
                        {question.tags.map((tag, index) => (
                          <li
                            key={index}
                            className='border rounded bg-[#D6E8FA] hover:bg-blue-300 p-px px-2 cursor-pointer'
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                      <div>
                        <img src='' alt='' />
                        <Link>
                          <p className='text-[12px] text-[#1b75d0]'>
                            {user ? user.user_name : "Unknown User"}
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className='w-[298.4px] ml-6 hidden sm:block'>
          <HomeRight />
        </div>
      </div>
    </div>
  );
}
