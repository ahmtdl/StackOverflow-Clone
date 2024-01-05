import { Link } from "react-router-dom";
import HomeIcon from "../assets/svgexport-1.svg";
import TagIcon from "../assets/svgexport-3.svg";
import QuestionIcon from "../assets/svgexport-2.svg";
import UserIcon from "../assets/svgexport-4.svg";
import SavesIcon from "../assets/svgexport-11.svg";
import CompaniesIcon from "../assets/svgexport-13.svg";
import PlusIcon from "../assets/svgexport-14.svg";
import ExIcon from "../assets/svgexport-15.svg";
import LabsIcon from "../assets//svgexport-16 (1).svg";
import DiscIcon from "../assets//svgexport-17.svg";
import TeamsIcon from "../assets//svgexport-18.svg";
export default function MobileSidebar() {
  return (
    <>
      <ul className='pt-8 hidden sm:flex flex-col text-[13px] w-[164px] fixed border-r border-gray-300 -z-10 h-screen '>
        <li className='flex gap-2 hover:bg-gray-200 hover:font-bold p-2 rounded-l'>
          <img src={HomeIcon} alt='' />
          <Link to='/home'>Home</Link>
        </li>
        <li className='flex gap-2 hover:bg-gray-200 hover:font-bold p-2 rounded-l'>
          <img src={QuestionIcon} alt='' />
          <Link to='/questions'>Questions</Link>
        </li>
        <li className='flex gap-2 mb-4 hover:bg-gray-200 hover:font-bold p-2 rounded-l'>
          <img src={TagIcon} alt='' />
          <Link to='/tags'>Tags</Link>
        </li>

        <li className='flex gap-2 hover:bg-gray-200 hover:font-bold p-2 rounded-l'>
          <img src={SavesIcon} alt='' />
          <Link to='/error'>Saves</Link>
        </li>
        <li className='flex gap-2 hover:bg-gray-200 hover:font-bold p-2 rounded-l'>
          <img src={UserIcon} alt='' />
          <Link to='/users'>Users</Link>
        </li>
        <li className='flex gap-2 hover:bg-gray-200 hover:font-bold p-2 rounded-l mb-4'>
          <img src={CompaniesIcon} alt='' />
          <Link to='/error'>Companies</Link>
        </li>
        <li className='flex justify-between  p-2 rounded-l'>
          <Link to='/error' className='text-[12px]'>
            COLLECTİVES
          </Link>
          <img src={PlusIcon} alt='' />
        </li>
        <li className='flex gap-2 hover:bg-gray-200 hover:font-bold p-2 rounded-l mb-4'>
          <img src={ExIcon} alt='' />
          <Link to='/error'>Explore Collectives</Link>
        </li>
        <li className='flex  justify-between gap-2 p-2 rounded-l'>
          <Link to='/error' className='text-[12px]'>
            LABS
          </Link>
          <img src={LabsIcon} alt='' />
        </li>
        <li className='flex gap-2 hover:bg-gray-200 hover:font-bold p-2 rounded-l mb-4'>
          <img src={DiscIcon} alt='' />
          <Link to='/error'>Discussions</Link>
        </li>
        <li className='flex justify-between gap-2  p-2 rounded-l'>
          <Link to='/error' className='text-[12px]'>
            TEAMS
          </Link>
          <img src={PlusIcon} alt='' />
        </li>
        <li className='flex gap-2 hover:bg-gray-200 hover:font-bold p-2 rounded-l'>
          <img src={TeamsIcon} alt='' />
          <Link to='/error'>Create free teams</Link>
        </li>
      </ul>
    </>
  );
}
