import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { IoTrash } from 'react-icons/io5';
import { CiEdit } from 'react-icons/ci';
import { BiLoaderCircle } from "react-icons/bi";
import Header from '../components/Header';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [notes, setNotes] = useState([]); // Array to store all notes
  const [noteInfo, setNoteInfo] = useState({ title: '', description: '' }); // State for form input
  const [loading, setLoading] = useState(false); // Loading state
  const [filteredNotes, setFilteredNotes] = useState([]); // Filtered notes for search

  // Function to open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setNoteInfo({ title: '', description: '' }); // Reset form when modal closes
  };

  // Fetch notes on page load
  useEffect(() => {
    const getNotes = async () => {
      setLoading(true); // Start loading
      try {
        const { data } = await axios.get('/api/notes/get-notes');
        setNotes(data); // Set the fetched notes
        setFilteredNotes(data); // Also set them for filtered notes initially
      } catch (error) {
        console.error('Error fetching notes:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    getNotes();
  }, []);

  // Handle input change for the form
  const handleInputChange = (event) => {
    setNoteInfo({
      ...noteInfo,
      [event.target.id]: event.target.value,
    });
  };

  // Handle form submission (Add Note)
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading
    try {
      const { data } = await axios.post('/api/notes/add-note', noteInfo);
      setNotes((prevNotes) => [...prevNotes, data]); // Add the new note to the list
      setFilteredNotes((prevNotes) => [...prevNotes, data]); // Ensure filtered notes is updated
      toast.success('Note added successfully');
      closeModal();
    } catch (error) {
      console.error('Error adding note:', error);
      toast.error(error.response?.data.error || 'An error occurred');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle note edit (fetch note for editing)
  const handleEdit = async (id) => {
    try {
      const { data } = await axios.get(`/api/notes/get-note/${id}`);
      setNoteInfo(data); // Set the note info for editing
      openModal();
    } catch (error) {
      console.error('Error fetching note:', error);
    }
  };

  // Handle note update dynamically
  const handleUpdate = async (id) => {
    setLoading(true); // Start loading
    try {
      const updatedNote = { ...noteInfo, updatedAt: new Date() };
      await axios.put(`/api/notes/edit-note/${id}`, updatedNote);

      // Update both notes and filteredNotes state with the new note info
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note._id === id ? { ...note, ...updatedNote } : note))
      );
      setFilteredNotes((prevNotes) =>
        prevNotes.map((note) => (note._id === id ? { ...note, ...updatedNote } : note))
      );

      toast.success('Note updated successfully');
      closeModal();
    } catch (error) {
      console.error('Error updating note:', error);
      toast.error(error.response?.data.error || 'An error occurred while updating the note');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle note delete dynamically
  const handleDelete = async (id) => {
    setLoading(true); // Start loading
    try {
      await axios.delete(`/api/notes/delete-note/${id}`);

      // Remove the deleted note from both notes and filteredNotes state
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      setFilteredNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));

      toast.success('Note deleted successfully');
    } catch (error) {
      console.error('Error deleting note:', error);
      toast.error(error.response?.data.message || 'An error occurred while deleting the note');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle search
  const handleSearch = (query) => {
    if (query) {
      const filtered = notes.filter((note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes(notes); // If search is empty, show all notes
    }
  };

  return (
    <div className="p-6 mt-[100px]">
      <Header onSearch={handleSearch} />
      {loading ? (
        <div className="flex justify-center items-center">
          <BiLoaderCircle className="text-6xl animate-spin text-indigo-700" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(filteredNotes) && filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <div key={note._id} className="border rounded-lg shadow-md p-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold mb-2">{note.title}</h2>
                  <div className="flex items-center gap-2">
                    <CiEdit
                      onClick={() => handleEdit(note._id)}
                      className={`text-3xl cursor-pointer text-indigo-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                    <IoTrash
                      onClick={() => handleDelete(note._id)}
                      className={`text-3xl cursor-pointer text-indigo-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {new Date(note.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                  })}
                </p>
                <p className="text-gray-700 mb-4">{note.description}</p>
              </div>
            ))
          ) : (
            <p>No notes available</p>
          )}
        </div>
      )}

      {/* Floating Plus Button */}
      <button
        className="fixed bottom-6 right-6 bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 focus:outline-none"
        onClick={openModal}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{noteInfo._id ? 'Edit Note' : 'Add New Note'}</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form
              onSubmit={noteInfo._id ? (event) => { event.preventDefault(); handleUpdate(noteInfo._id); } : handleSubmit}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  id="title"
                  value={noteInfo.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  placeholder="Enter note title"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  id="description"
                  value={noteInfo.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  placeholder="Enter note description"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="submit"
                  className="bg-indigo-500 w-full text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none"
                >
                  {loading ? 'Saving...' : noteInfo._id ? 'Update Note' : 'Add Note'}
                </button>
                {/* <button
                  type="button"
                  className="bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400 focus:outline-none"
                  onClick={closeModal}
                >
                  Cancel
                </button> */}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
