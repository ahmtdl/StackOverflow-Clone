import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MobileSidebar from "../components/MobileSidebar";
import { supabase } from "../main";
import Pasta from "../assets/svgexport-pasta.svg";
import Gold from "../assets/svgexport-gold.svg";
import Silver from "../assets/svgexport-silver.svg";
import Bronze from "../assets/svgexport-bronze.svg";
import Kalem from "../assets/svgexport-kalem.svg";

export async function loader({ params }) {
  const { username } = params;

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("user_name", username)
    .single();

  if (userError) {
    console.error("Error fetching user data:", userError.message);
    return { user: null, questions: [] };
  }

  const user = userData || null;

  const { data: questionData, error: questionError } = await supabase
    .from("questions")
    .select("*")
    .eq("user_id", user.id);

  if (questionError) {
    console.error("Error fetching user questions:", questionError.message);
    return { user, questions: [] };
  }

  const questions = questionData || [];

  return { user, questions };
}

function calculateMemberDuration(created_at) {
  const createdAtDate = new Date(created_at);
  const currentDate = new Date();
  const durationInDays = Math.floor(
    (currentDate - createdAtDate) / (1000 * 60 * 60 * 24)
  );
  return durationInDays;
}

export default function ProfilePage() {
  const { user, questions } = useLoaderData();
  const navigate = useNavigate();
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [memberDuration, setMemberDuration] = useState(null);
  const [isEditting, setIsEditting] = useState(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user.id === user.id) {
        setIsCurrentUser(true);
      }

      if (user.created_at) {
        const duration = calculateMemberDuration(user.created_at);
        setMemberDuration(duration);
      }
    });
  }, [user]);

  function handleEdit() {
    setIsEditting(!isEditting);
  }

  async function handleUptade(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const imageDatas = Object.fromEntries(formData);

    const timestamp = new Date().getTime();
    const imageName = `${timestamp}_${imageDatas.profile_img.name}`;

    const { data, error } = await supabase.storage
      .from("images")
      .upload(imageName, imageDatas.profile_img, {
        cacheControl: "3600",
        upsert: false,
      });

    const { data: imageData } = supabase.storage
      .from("images")
      .getPublicUrl(data?.path);

    const imageUrl = imageData.publicUrl;
    console.log(imageUrl);

    const { data: userData, error: userError } = await supabase
      .from("users")
      .update({
        profile_img: imageUrl,
      })
      .eq("id", user.id);
    if (userError) {
      console.log(userError.message);
    } else {
      navigate(`/users/${user.user_name}`);
    }
  }

  if (!user) {
    return (
      <div className='flex max-w-[1264px] w-full justify-between relative grow mx-auto'>
        <MobileSidebar />
        <div className='flex flex-col left-[164px] absolute w-[1100px] p-6 -z-10'>
          <h1 className='text-[27px]'>Profile Page</h1>
          <p className='text-gray-500'>Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex max-w-[1264px] w-full justify-between relative grow mx-auto'>
      <MobileSidebar />
      <div className='flex flex-col left-[164px] absolute w-[1100px] p-6 -z-10'>
        <div className='flex gap-2 p-3 pb-8 rounded justify-between'>
          <div className='flex gap-3'>
            <img
              src={user.profile_img}
              alt={`${user.user_name}'s Profile`}
              className='w-32 h-32 rounded'
            />
            <div className='flex flex-col'>
              <p className='text-[27px] font-bold mb-2'>{user.user_name}</p>
              <div className='flex items-center gap-2'>
                <img src={Pasta} alt='' />
                <p className='text-[13px] w-[180px] text-[#636b74]'>
                  Member for <span>{memberDuration} days</span>
                </p>
              </div>
            </div>
          </div>
          {isCurrentUser && (
            <button
              className='h-10 border hover:bg-gray-200 rounded px-2 py-2 flex items-center gap-2 rounded'
              onClick={handleEdit}
            >
              <img src={Kalem} alt='' />
              Edit Profile Image
            </button>
          )}
        </div>
        {isEditting ? (
          <div>
            <h2 className='text-[21px] mb-2'>Edit Your Profile Image</h2>
            <div className='flex flex-col p-4 items-center border rounded gap-4'>
              <h2 className='font-bold'>Profile image</h2>
              <div>
                <img
                  src={user.profile_img}
                  alt={`${user.user_name}'s Profile`}
                  className='w-44 h-44 rounded'
                />
              </div>
              <form className='flex flex-col' onSubmit={handleUptade}>
                <div className='mb-5'>
                  <input
                    name='profile_img'
                    type='file'
                    className='text-sm text-grey-500 file:mr-5 file:py-2 file:px-6 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:cursor-pointer hover:file:bg-blue-300 hover:file:text-blue-700'
                  />
                </div>

                <button
                  type='submit'
                  className='mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center  mt-2'
                >
                  Save profile
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div>
            <div className='flex flex-col mb-4'>
              <h2 className='text-[21px] mb-3 '>Badges</h2>
              <div className='flex gap-[24px] flex-wrap'>
                <div className='border rounded flex flex-col gap-3 items-center p-4'>
                  <img src={Gold} alt='' />
                  <p className='text-[13px] text-[#636b74]'>
                    This user doesn’t have any gold <br /> badges yet.
                  </p>
                </div>
                <div className='border flex flex-col items-center p-4 rounded gap-3'>
                  <img src={Silver} alt='' />
                  <p className='text-[13px] text-[#636b74]'>
                    This user doesn’t have any silver <br />
                    badges yet.
                  </p>
                </div>
                <div className='border flex flex-col items-center p-4 rounded gap-3'>
                  <img src={Bronze} alt='' />
                  <p className='text-[13px] text-[#636b74]'>
                    This user doesn’t have any bronze <br /> badges yet.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2 className='text-[21px] mb-3'>Posts</h2>
              {questions.length === 0 ? (
                <p>No posts found.</p>
              ) : (
                <ul>
                  {questions.map((question) => (
                    <li key={question.id} className='border flex rounded p-3'>
                      <Link to={`/questions/${question.id}`}>
                        <p>{question.title}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
