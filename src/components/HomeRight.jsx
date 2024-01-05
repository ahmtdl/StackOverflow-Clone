import SearchIcon from "../assets/svgexport-28.svg";
export default function HomeRight() {
  return (
    <>
      <ul className='border rounded border-[#f5d98e] mb-4'>
        <li className='text-[12px] font-bold p-3 bg-[#faecc6]'>
          The Overflow Blog
        </li>
        <li className='text-[13px] p-3 bg-[#fdf7e7]'>
          Is software getting worse?
        </li>
        <li className='text-[12px] p-3 font-bold bg-[#faecc6]'>
          Featured on Meta
        </li>
        <li className='text-[13px] p-2 bg-[#fdf7e7]'>
          Seeking feedback on tag colors update
        </li>
        <li className='text-[13px] p-2 bg-[#fdf7e7]'>
          Update to our Advertising Guidelines
        </li>
        <li className='text-[13px] p-2 bg-[#fdf7e7]'>
          Temporary policy: Generative AI e.g.,
          <br /> ChatGPT is banned
        </li>
        <li className='text-[13px] p-2 bg-[#fdf7e7]'>
          Rule proposal: Duplicate closure to roll-up
          <br />
          questions is no longer allowed
        </li>
      </ul>
      <ul className='border rounded border-[#dadddf] mb-4'>
        <li className='text-[15px] p-2 border-b bg-[#f9fafa]'>
          Custom Filters
        </li>
        <li className='text-[13px] p-3 text-blue-600'>
          Create a custom filter
        </li>
      </ul>
      <ul className='border rounded border-[#dadddf] mb-4'>
        <li className='text-[15px] p-2 border-b bg-[#f9fafa]'>Watched Tags</li>
        <li className='text-[13px] p-3 text-blue-600 flex flex-col items-center gap-4 p-6'>
          <img src={SearchIcon} alt='' className='w-12 h-12' />
          <p>Watch tags to curate your list of questions.</p>
          <button
            type='button'
            className='rounded bg-white px-3 py-1.5 text-[13px] text-blue-600 shadow-sm ring-1 ring-inset ring-blue-600 hover:bg-blue-100'
          >
            Watch a Tag
          </button>
        </li>
      </ul>
      <ul className='border rounded border-[#dadddf] mb-4'>
        <li className='text-[15px] p-2 border-b bg-[#f9fafa]'>Ignored Tags</li>
        <li className='p-6 text-center'>
          <button
            type='button'
            className='rounded bg-white px-3 py-1.5 text-[13px] text-blue-600 shadow-sm ring-1 ring-inset ring-blue-600 hover:bg-blue-100'
          >
            Add an ignored tag
          </button>
        </li>
      </ul>
    </>
  );
}
