import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hook/useUser';

const SignUp = () => {
  const nav = useNavigate();
  
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const {user } = useUser()

  useEffect(() => {
 
   if (user){ nav('/')}
  },[])
  const [loading, setLoading] = useState(false); // Loading state for the form

  // Handles changes in form fields
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value, // Update form data based on id
    });
  };

  // Handles form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form behavior
    setLoading(true); // Set loading state to true
  
    try {
      const { data } = await axios.post('/api/users/register-user', formData); // Send data to server
      
     
      toast.success("Registration Successful"); // Success message
      setLoading(false); // Reset loading state
      nav('/login'); // Redirect to login page
    } catch (e) {
      setLoading(false); 
      if(e.response.data.error) {
      toast.error(e.response.data.error); 
      }else {
       toast.error(e.response.data.message);
       }
      console.log(e)
    }
  };

  return (
    <div className="h-screen  flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500">
      <div className="bg-white p-8 mt-12 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Username:</label>
            <input
              onChange={handleInputChange}
              type="text" // Correct type
              id="name" // Changed to match formData field
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Email:</label>
            <input
              onChange={handleInputChange}
              type="email"
              id="email" // Match id with formData field
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Password:</label>
            <input
              onChange={handleInputChange}
              type="password"
              id="password" // Match id with formData field
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-indigo-600 text-white py-2 rounded-lg transition duration-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
            }`}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Signing up...' : 'Sign up'}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
