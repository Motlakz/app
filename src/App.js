import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import RepaymentsTracker from './components/Tracker';
import About from './components/About';
import Home from './components/Home';

function App() {
  return (
    <div className="bg-indigo-100 flex flex-col justify-center items-center min-h-screen">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tracker" element={<RepaymentsTracker />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
