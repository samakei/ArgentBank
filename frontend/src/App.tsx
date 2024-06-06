// Pieds d'applications
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Home from './pages/Home'
import SiGnIn from './pages/SiGnIn'
import Footer from './components/Footer';
import './styles/main.css'

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<><Hero /><Features /></>} />
            {/* Ajout d'autres routes si nécessaire */}
             <Route path="/" element={<Home />} />
             <Route path="/sign-in" element={<SiGnIn />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
