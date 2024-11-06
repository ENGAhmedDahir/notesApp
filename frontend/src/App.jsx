import Header from './components/Header';
import SignUp from './components/SignUp';
import { Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn'; // Ensure the filename is correct (SignIn.jsx)
import Home from './pages/Home';
import { useUser } from './hook/useUser';
import UserIfo from './components/UserIfo';

function App() {
  const { user } = useUser(); // Add parentheses

  return (
    <>
      {user ? (
        <>
          <Header />
          <Routes>
            <Route path="/userInfo" element={<UserIfo />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            {/* Add a fallback 404 route */}
            <Route path="*" element={<h2>404: Page Not Found</h2>} />
          </Routes>
        </>
      ) : (
        <> 
        <Header />
        <Routes>
          
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
         
            {/* Add a fallback 404 route */}
            <Route path="*" element={<h2>404: Page Not Found</h2>} />
          </Routes>
        <SignIn /> 
        </>
      )}
    </>
  );
}

export default App;
