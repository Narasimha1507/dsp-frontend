import './App.css';
import AuthForm from './pages/AuthForm';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import AfterNavbar from './pages/AfterNavbar';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import ViewFiles from './pages/ViewFiles';
import ProtectedFilePage from './pages/ProtectedAccess';
import PageNotFound from './pages/PageNotFound';

function useCursorEffect() {
  useEffect(() => {
    let cursor = document.getElementById('custom-cursor');
    if (!cursor) {
      cursor = document.createElement('div');
      cursor.id = 'custom-cursor';
      document.body.appendChild(cursor);
    }

    const updateCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    window.addEventListener('mousemove', updateCursor);
    return () => {
      window.removeEventListener('mousemove', updateCursor);
      cursor.remove();
    };
  }, []);
}

function App() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  useCursorEffect();

  return (
    <div className="App">
      <div className="grid-overlay"></div>
      <Router>
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
          <Route path="/protected-access/:filename" element={<ProtectedFilePage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
