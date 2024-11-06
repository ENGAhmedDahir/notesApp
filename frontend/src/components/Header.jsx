import { Link } from "react-router-dom";
import { useState } from 'react';
import { useUser } from "../hook/useUser";
import { CiSearch } from "react-icons/ci";
import { BiLogOutCircle } from "react-icons/bi";
import { FaUser } from "react-icons/fa6";

const Header = ({ onSearch }) => {
  const { user, logout } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Pass the search query to the parent component
  };

  return (
    <div className='bg-white h-[100px] shadow-md flex justify-between items-center px-4 md:px-8 space-y-4 fixed left-0 right-0 top-0 z-10'>
      <div>
        <h1 className='text-3xl md:text-5xl lg:text-6xl text-indigo-600 font-megrin font-semibold'>Notes App</h1>
      </div>

      <div className="flex flex-wrap justify-end items-center space-x-4 md:space-x-6 text-lg md:text-2xl">
        {user ? (
          <>
            {/* Search Bar */}
            <div className="flex items-center border-2 border-gray-300 rounded-md px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md w-full md:w-auto">
              <CiSearch className="text-2xl md:text-4xl text-indigo-600" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search notes..."
                className="px-2 py-1 md:px-4 md:py-2 w-full md:w-auto focus:outline-none"
              />
            </div>

            {/* User Info */}
            <Link   className='flex items-center space-x-2'>
              <FaUser className="text-indigo-500" />
              <span className='hidden md:inline'>{user?.name}</span>
            </Link>

            {/* Logout Button */}
            <button onClick={logout} type='button' className='flex items-center text-gray-800 px-2 md:px-4 py-1 md:py-2 rounded-md'>
              <BiLogOutCircle className="text-xl md:text-3xl" /> 
              <span className="hidden md:inline ml-2">Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link to='/signup' className='border-2 border-gray-900 text-indigo-700 px-2 md:px-4 py-1 md:py-2 rounded-md m-1 md:m-2'>Sign Up</Link>
            <Link to='/login' className='bg-indigo-600 text-white py-1 md:py-2 px-2 md:px-4 rounded-lg transition duration-300 hover:bg-indigo-700'>Sign In</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
