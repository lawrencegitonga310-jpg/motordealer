import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Makepayment from './components/Makepayment';
import Notfound from './components/Notfound';
import Footer from './components/Footer';
import Aboutus from './components/Aboutus';
import Location from './components/Location';
import Chatbot from './components/Chatbot';


function App() {
  return (
   <Router>
    <nav className='bg-dark p-5 shadow d-flex justify-content-center'>
 <Link to="/" className='nav-link-btn'>
   <span className='nav-icon'>🏠</span>
   <span className='nav-text'>Home</span>
 </Link>
 <Link to="/signin" className='nav-link-btn'>
   <span className='nav-icon'>👤</span>
   <span className='nav-text'>Signin</span>
 </Link>
 <Link to="/signup" className='nav-link-btn'>
   <span className='nav-icon'>✨</span>
   <span className='nav-text'>Signup</span>
 </Link>
 <Link to="/addproducts" className='nav-link-btn'>
   <span className='nav-icon'>🚗</span>
   <span className='nav-text'>Add products</span>
 </Link>
 <Link to="/aboutus" className='nav-link-btn'>
   <span className='nav-icon'>ℹ️</span>
   <span className='nav-text'>About us</span>
   
 </Link>
 <Link to="/location" className='nav-link-btn'>
   <span className='nav-icon'>📍</span>
   <span className='nav-text'>Location</span>
 </Link>
 <Link to="/chatbot" className='nav-link-btn'>
   <span className='nav-icon'>💬</span>
   <span className='nav-text'>Chatbot</span>
 </Link>
</nav>
    <div className="App  mb-10 text-center text-primary"> 
      <header className="App-header">
      <h1 className='welcome-heading'>
        <span className='welcome-text'>Welcome to</span>
        <span className='brand-name'>Mrenga Carhire</span>
        <span className='car-icon'>🚗</span>
      </h1>
</header>
      
      <Routes>
        <Route path='/signup' element={< Signup />} />
        <Route path='/signin' element={< Signin />} />
        <Route path='/addproducts' element={< Addproducts />} />
        <Route path='/' element={< Getproducts />} />
        <Route path='/makepayment' element={< Makepayment />} />
        <Route path='*' element={< Notfound />} />
        <Route path='/aboutus' element={< Aboutus />} />
        <Route path='/location' element={< Location />} />
        <Route path='/chatbot' element={< Chatbot />} />
      </Routes>

      <Footer/>
    </div>
   </Router>

  );
}

export default App;
