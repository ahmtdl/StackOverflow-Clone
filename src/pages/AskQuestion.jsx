import { useNavigate, Link } from "react-router-dom";
import BackgroundImage from "../assets/svgexport-bck-org.svg";
import { supabase } from "../main";
import { useState } from "react";

export default function AskQuestion() {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  async function handleAskQuestion(e) {
    e.preventDefault();

    const { user, error: authError } = await supabase.auth.getUser();
    if (authError) {
      setShowLoginModal(true);
      return;
    }

    const formData = new FormData(e.target);
    const questionData = Object.fromEntries(formData);

    if (typeof questionData.tags === "string") {
      questionData.tags = questionData.tags.split(",");
    }

    questionData.user_id = user.id;

    const { data: insertedData, error } = await supabase
      .from("questions")
      .insert([questionData]);

    if (error) {
      console.error("Error inserting question:", error.message);
    } else {
      navigate(`/questions`);
    }
  }

  return (
    <div className='bg-[#F1F2F3]'>
      <div className='flex flex-col w-[1264px] mx-auto px-6 '>
        <div className='flex justify-between mb-4'>
          <h1 className='text-[27px] font-bold pt-10'>Ask a public question</h1>
          <img src={BackgroundImage} alt='' />
        </div>
        <div className='border border-[#92C2F2] rounded bg-[#EDF5FD] w-[851px] p-6 mb-4'>
          <h1 className='text-[21px] mb-2'>Writing a good question</h1>
          <h3 className='text-[15px] mb-4'>
            You’re ready to ask a programming-related question and this form
            will help guide you through the process. Looking to ask a
            non-programming question? See the topics here to find a relevant
            site.
          </h3>
          <p className='text-[13px] font-bold mb-2'>Steps</p>
          <ul className='list-disc text-[13px] pl-10'>
            <li>Summarize your problem in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>
              Add “tags” which help surface your question to members of the
              community.
            </li>
            <li>Review your question and post it to the site.</li>
          </ul>
        </div>
        <form className='w-[851px]' onSubmit={handleAskQuestion}>
          <div className='mb-6 bg-white p-6 border rounded border-gray-300 '>
            <label className='block mb-2 text-sm font-medium text-gray-900 font-bold'>
              Title
            </label>
            <p className='mb-1 text-[13px] text-[#636b74]'>
              Be specific and imagine you’re asking a question to another
              person.
            </p>
            <input
              type='text'
              name='title'
              className='border placeholder:text-[13px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              placeholder='e.g. Is there an R function for finding the index of an element in a vector?'
              required
            />
          </div>

          <div className='mb-6 bg-white p-6 border rounded border-gray-300 focus:border-blue-500'>
            <label className='block mb-2 text-sm font-medium text-gray-900 font-bold'>
              What are the details of your problem?
            </label>
            <p className='mb-2 text-[13px] text-[#636b74]'>
              Introduce the problem and expand on what you put in the title.
            </p>
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
                name='body'
                rows={8}
                className='w-full p-3 text-sm text-gray-800 bg-white border-0 focus:outline-none'
                placeholder='Describe your problem...'
                required
              ></textarea>
            </div>
          </div>
          <div className='mb-6 bg-white p-6 border rounded border-gray-300 '>
            <label className='block mb-2 text-sm font-medium text-gray-900 font-bold'>
              Tags
            </label>
            <p className='mb-1 text-[13px] text-[#636b74]'>
              Add up to 5 tags to describe what your question is about. Start
              typing to see suggestions.
            </p>
            <input
              type='text'
              name='tags'
              className='border placeholder:text-[13px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              placeholder='e.g. (ios mysql typescript)'
              required
            />
          </div>
          <button
            type='submit'
            className='mx-auto text-white bg-[#1b75d0] hover:bg-blue-800 font-medium rounded-lg text-sm  px-5 py-2.5 text-center mb-20'
          >
            Post your question
          </button>
        </form>
      </div>
      {showLoginModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-8 max-w-md rounded-lg'>
            <p className='text-lg font-semibold mb-4'>
              You need to be logged in to ask a question.
            </p>
            <Link to={"/login"}>
              <button className='bg-[#1b75d0] text-white font-medium rounded-lg px-4 py-2'>
                Log In
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
