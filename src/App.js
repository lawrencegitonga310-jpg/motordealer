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


function App() {
  return (

   <Router>

    <nav className=' bg-dark p-5 shadow d-flex justify-content'>
 <Link to="/" className='btn btn-sm m-3 text-primary'>Home</Link>
 <Link to="/signin" className='btn btn-sm m-3 text-primary'>Signin</Link>
 <Link to="/signup" className='btn btn-sm m-3 text-primary'>Signup</Link>
 <Link to="/addproducts" className='btn btn-sm m-3 text-primary'>Add products</Link>
 <Link to="/aboutus" className='btn btn-sm m-3 text-primary'>About us</Link>
</nav>
    <div className="App  mb-10 text-center text-primary"> 
      <header className="App-header">
      <h1>Welcome to Mlenga Carhire</h1>

      </header>
      

      <Routes>
        <Route path='/signup' element={< Signup />} />
        <Route path='/signin' element={< Signin />} />
        <Route path='/addproducts' element={< Addproducts />} />
        <Route path='/' element={<Getproducts />} />
        <Route path='/makepayment' element={< Makepayment />} />
        <Route path='*' element={< Notfound />} />
        <Route path='/aboutus' element={< Aboutus />} />
      </Routes>

      <Footer/>
    </div>
   </Router>
  );
}

export default App;
