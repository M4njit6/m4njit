
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import CoursePlayer from './pages/CoursePlayer';
import Dashboard from './pages/Dashboard';
import Certificates from './pages/Certificates';
import VerifyCertificate from './pages/VerifyCertificate';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPanel from './pages/Admin/AdminPanel';
import Support from './pages/Support';
import { User } from './types';
import { INITIAL_SECURITY_CODES } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('manjit_user');
    return stored ? JSON.parse(stored) : null;
  });

  const [isAdminUnlocked, setIsAdminUnlocked] = useState(() => {
    return localStorage.getItem('manjit_admin_unlocked') === 'true';
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('manjit_theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  useEffect(() => {
    if (!localStorage.getItem('manjit_security_codes')) {
      localStorage.setItem('manjit_security_codes', JSON.stringify(INITIAL_SECURITY_CODES));
    }

    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('manjit_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('manjit_theme', 'light');
    }
  }, [isDarkMode]);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('manjit_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('manjit_user');
    setIsAdminUnlocked(false);
    localStorage.removeItem('manjit_admin_unlocked');
  };

  const handleAdminUnlock = () => {
    setIsAdminUnlocked(true);
    localStorage.setItem('manjit_admin_unlocked', 'true');
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col transition-colors duration-300 bg-white dark:bg-black text-black dark:text-white font-sans">
        <Navbar 
          user={user} 
          onLogout={handleLogout} 
          isDarkMode={isDarkMode} 
          onToggleTheme={() => setIsDarkMode(!isDarkMode)} 
          isAdminUnlocked={isAdminUnlocked}
          onAdminUnlock={handleAdminUnlock}
        />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            
            {/* Protected Course Routes */}
            <Route 
              path="/courses" 
              element={user ? <Courses /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/course/:slug" 
              element={user ? <CourseDetail user={user} /> : <Navigate to="/login" />} 
            />
            
            <Route 
              path="/player/:courseId" 
              element={user ? <CoursePlayer user={user} setUser={setUser} /> : <Navigate to="/login" />} 
            />
            
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} 
            />
            
            <Route 
              path="/certificates" 
              element={user ? <Certificates user={user} /> : <Navigate to="/login" />} 
            />
            
            <Route path="/verify-certificate" element={<VerifyCertificate />} />
            <Route path="/verify-certificate/:id" element={<VerifyCertificate />} />

            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
            <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register onLogin={handleLogin} />} />
            
            <Route path="/support" element={<Support />} />
            
            <Route 
              path="/admin" 
              element={isAdminUnlocked ? <AdminPanel /> : <Navigate to="/" />} 
            />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
