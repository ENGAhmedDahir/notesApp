import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hook/useUser";

const SignIn = () => {
  const nav = useNavigate();
  
  // State to manage form inputs
  const [formData, setFormData] = useState({
 
    email: '',
    password: '',
  });
   const {login , user } = useUser()


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
      const { data} = await axios.post('/api/users/login-user', formData); // Send data to server
     
      toast.success("login Successful"); // Success message
      setLoading(false); 
      console.log(data)
      login(data, data.expiresIn); //a, dat); //
       nav('/home'); // Redirect to login page
    } catch (e) {
      setLoading(false); 
      if(e.response.data.error) {
      toast.error(e.response.data.error,"Check your network"); 
      }
      else {
       toast.error(e.response.data.message);
       }
      console.log(e)
    }
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6"> Sign In</h2>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email:
            </label>
            <input
             onChange={handleInputChange}
              type="email"
             id="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password:
            </label>
            <input
             onChange={handleInputChange}
              type="password"
             id="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
         
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
           {loading ? "sign In..." : "sigIn"} 
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
         i have no account?{' '}
          <a href="/signup" className="text-indigo-600 hover:underline">
            sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
