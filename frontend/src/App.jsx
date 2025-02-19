import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./pages/Home";
import Header from "./components/Header";
import { useUser } from "./hook/useUser";

function App() {
  const { user } = useUser();

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protecting the Home Route */}
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </div>
  );
}

export default App;
