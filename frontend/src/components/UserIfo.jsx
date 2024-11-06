import axios from 'axios';
import { useEffect, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { useUser } from '../hook/useUser';
import toast from 'react-hot-toast';

const UserInfo = () => {
  const { user } = useUser();
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleUpdateUser = async () => {
    try {
      const { data } = await axios.put(`/api/users/edit-user/${user.id}`, { name: editName, email: editEmail });
      localStorage.setItem('userInfo', JSON.stringify(data)); // Save updated info to local storage
      toast.success('User updated successfully');
    } catch (error) {
      toast.error("Update error: " + error.message);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      const response = await axios.put(`/api/users/update-password/${user.id}`, { currentPassword, newPassword });
      toast.success('Password updated successfully');
    } catch (error) {
      toast.error('Password update failed. ' + error.message);
    }
  };

  return (
    <div className="bg-white w-[800px] mt-[110px] h-[800px] flex justify-center items-center shadow-2xl">
      <div className="flex items-center gap-4">
        <div className="bg-indigo-700 w-1/2 h-full flex items-center justify-center">
          <h1 className="text-3xl text-white font-bold">User Information</h1>
        </div>
        <div className="w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-4">User Details</h1>
          <div className="flex space-x-2 items-center">
            <label>User Name:</label>
            <input 
              type="text" 
              value={editName} 
              onChange={(e) => setEditName(e.target.value)} 
              className="border p-1"
            />
            <CiEdit className="text-indigo-600 text-3xl cursor-pointer" />
          </div>
          <div className="flex space-x-2 items-center mt-2">
            <label>Email:</label>
            <input 
              type="email" 
              value={editEmail} 
              onChange={(e) => setEditEmail(e.target.value)} 
              className="border p-1"
            />
            <CiEdit className="text-indigo-600 text-3xl cursor-pointer" />
          </div>
          <button onClick={handleUpdateUser} className="mt-4 p-2 bg-indigo-600 text-white rounded">
            Update User Info
          </button>
          <h2 className="text-2xl font-bold mt-6">Change Password</h2>
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="border p-1 mt-2 w-full"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border p-1 mt-2 w-full"
          />
          <button onClick={handleUpdatePassword} className="mt-4 p-2 bg-indigo-600 text-white rounded">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
