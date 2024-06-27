// Pieds d'applications
import { useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
import { setToken } from './features/auth/authSlice';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import UserPage from './pages/UserPage';
import Error404Page from './pages/Error404Page';
import Footer from './components/Footer';
import './styles/main.css';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
       console.log('Token from localStorage:', token); // Debug log
      dispatch(setToken(token));
    }  else {
    console.warn('Token from localStorage is undefined or null');
  }
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/user" element={<UserPage />} />
            {/* Route de secours pour les pages non trouvées */}
            <Route path="*" element={<Error404Page />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
