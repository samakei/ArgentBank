// Pieds d'applications
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage'
import Footer from './components/Footer';
import './styles/main.css'
import Error404Page from './pages/Error404Page';
import UserPage from './pages/UserPage';
import SiGnInPage from './pages/SiGnInPage';


const App = () => {
  return (
    
    <Router>
      <div>
        <Navbar />
        <main>
          <Routes>
            
            {/* Ajout d'autres routes si nécessaire */}
             <Route path="/" element={<HomePage />} />
             <Route path='/sign-in' element={ <SiGnInPage />} />
             <Route path='/user' element={< UserPage/>} />
             <Route path="*" element={<Error404Page />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
