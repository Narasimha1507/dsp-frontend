import './App.css';
import AuthForm from './pages/AuthForm';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import AfterNavbar from './pages/AfterNavbar';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import ViewFiles from './pages/ViewFiles';
import ProtectedAccess from './pages/ProtectedAccess';

function App() {
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <div className="App">
      <Router>
        {/* Show UserNavBar only if logged in, otherwise MainNavBar */}
        {user ? <AfterNavbar /> : <Navbar />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/viewfiles" element={<ViewFiles />} />
          <Route path="/api/files/protected-access/:filename" element={<ProtectedAccess />} />

          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
