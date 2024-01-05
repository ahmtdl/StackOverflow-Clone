import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Up from "../assets/up.svg";
import Down from "../assets/down.svg";
import MobileSidebar from "../components/MobileSidebar";
import HomeRight from "../components/HomeRight";
import { useLoaderData } from "react-router-dom";
import { supabase } from "../main";

export async function loader({ params }) {
  const questionId = params.id;

  const { data: questionData, error } = await supabase
    .from("questions")
    .select("*")
    .eq("id", questionId)
    .single();

  if (error) {
    console.error(error.message);
    return { question: null, answers: null };
  }

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("id, user_name, profile_img")
    .eq("id", questionData.user_id)
    .single();

  if (userError) {
    console.error(userError.message);
    return { question: null, user: null, answers: null };
  }

  const { data: answersData, error: answersError } = await supabase
    .from("answers")
    .select("*, users:user_id(user_name, profile_img)")
    .eq("question_id", questionId);

  if (answersError) {
    console.error(answersError.message);
    return { question: null, user: null, answers: null };
  }

  return { question: questionData, user: userData, answers: answersData };
}

export default function DetailPage() {
  const { question, user, answers } = useLoaderData();
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(answers);
  console.log(user);

  async function handleSubmitAnswer(e) {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const formData = new FormData(e.target);
    const answerData = Object.fromEntries(formData);
    answerData.user_id = user.id;
    answerData.question_id = question.id;

    const { data: insertedData, error } = await supabase
      .from("answers")
      .insert([answerData]);

    if (error) {
      console.error("Error inserting answer:", error.message);
    } else {
      window.location.reload();
    }
  }

  return (
    <div className='flex max-w-[1264px] w-full justify-between relative grow mx-auto'>
      <MobileSidebar />
      <div className='flex flex-col left-[164px] absolute w-[1100px] p-6 -z-10'>
        <div className='flex flex-col border-b border-gray-300 mb-4'>
          <div className='flex justify-between mb-3'>
            <h1 className='text-[27px]'>{question.title}</h1>
            <button
              type='button'
              className='rounded-md ml-1.5 bg-[#1b75d0] py-2 px-[10.8px] text-[13px] text-white shadow-sm hover:bg-blue-800'
            >
              <Link to='/questions/askquestion'>Ask Question</Link>
            </button>
          </div>
          <div className='pb-2 text-[13px] text-[#636b74] '>
            <span className='mr-6'>Asked today</span>
            <span>Viewed {question.views} times</span>
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='flex flex-col'>
            <div className='flex mb-4'>
              <div className='flex flex-col p-4 pt-0 items-center gap-2'>
                <button className='border rounded-full p-3'>
                  <img src={Up} alt='' />
                </button>
                <span className='font-bold text-lg'>{question.votes}0</span>
                <button className='border rounded-full p-3'>
                  <img src={Down} alt='' />
                </button>
              </div>
              <div className='w-[675px] flex flex-col'>
                <div className='mb-16'>
                  <h2 className='mb-8 text-[15px]'>{question.body}</h2>
                  <ul className='flex gap-1 text-[13px] mb-12'>
                    {question.tags.map((tag, index) => (
                      <li
                        key={index}
                        className='border rounded bg-blue-200 hover:bg-blue-300 p-px px-2 cursor-pointer'
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <div className='flex flex-col mr-4'>
                    <div className='flex justify-between'>
                      <div></div>
                      <div className='border flex flex-col rounded'>
                        <Link to={`/users/${user.user_name}`}>
                          <div className='flex pr-4 py-4 pl-1 bg-[#D6E8FA] items-center gap-1'>
                            <img
                              className='w-8 h-8'
                              src={user.profile_img}
                              alt=''
                            />
                            <p className='text-[13px]'>{user.user_name}</p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {answers.length > 0 && (
              <div>
                <h1 className='text-[21px] mb-2'>
                  <span>{answers.length}</span> Answers
                </h1>
                {answers.map((answer, index) => (
                  <div className='flex mb-4' key={index}>
                    <div className='flex flex-col p-4 pt-0 items-center gap-2'>
                      <button className='border rounded-full p-3'>
                        <img src={Up} alt='' />
                      </button>
                      <span className='font-bold text-lg'>{answer.votes}0</span>
                      <button className='border rounded-full p-3'>
                        <img src={Down} alt='' />
                      </button>
                    </div>
                    <div className='w-[675px] flex flex-col'>
                      <div className='mb-16'>
                        <h2 className='mb-8 text-[15px]'>{answer.answer}</h2>
                        <div className='flex flex-col mr-4'>
                          <div className='flex justify-between'>
                            <div></div>
                            <div className='border flex flex-col rounded'>
                              <Link to={`/users/${answer.users.user_name}`}>
                                <div className='flex pr-4 py-4 pl-1 bg-[#D6E8FA] items-center gap-1'>
                                  <img
                                    className='w-8 h-8'
                                    src={answer.users.profile_img}
                                    alt=''
                                  />
                                  <p className='text-[13px]'>
                                    {answer.users.user_name}
                                  </p>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <form onSubmit={handleSubmitAnswer}>
              <label className='block mb-2 text-[21px]'>Your Answer</label>
              <div className='mb-6 bg-white p-6 border rounded border-gray-300 focus:border-blue-500'>
                <div className='w-full mb-4 border border-gray-200 rounded-lg focus-within:border-blue-500'>
                  <button
                    type='button'
                    className='p-2 px-4 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100'
                  >
                    <svg
                      className='w-4 h-4'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 16 20'
                    >
                      <path d='M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z' />
                      <path d='M14.067 0H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.933-2ZM6.709 13.809a1 1 0 1 1-1.418 1.409l-2-2.013a1 1 0 0 1 0-1.412l2-2a1 1 0 0 1 1.414 1.414L5.412 12.5l1.297 1.309Zm6-.6-2 2.013a1 1 0 1 1-1.418-1.409l1.3-1.307-1.295-1.295a1 1 0 0 1 1.414-1.414l2 2a1 1 0 0 1-.001 1.408v.004Z' />
                    </svg>
                  </button>
                  <textarea
                    name='answer'
                    rows={8}
                    className='w-full p-3 text-sm text-gray-800 bg-white border-0 focus:outline-none'
                    placeholder='Your Answer...'
                    required
                  ></textarea>
                </div>
              </div>
              <button
                type='submit'
                className='mx-auto text-white bg-[#1b75d0] hover:bg-blue-800 font-medium rounded-lg text-sm  px-5 py-2.5 text-center mb-20'
              >
                Post your answer
              </button>
            </form>
          </div>
          <div className='w-[298.4px] ml-6 hidden sm:block'>
            <HomeRight />
          </div>
        </div>
      </div>
    </div>
  );
}
