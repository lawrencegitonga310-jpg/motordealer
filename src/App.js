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


function App() {
  return (

   <Router>

    <nav className='text-primary bg-dark'>
 <Link to="/" className='btn btn-sm m-3 bg-grey'>Home</Link>
 <Link to="/signin" className='btn btn-sm m-3 bg-grey'>Signin</Link>
 <Link to="/signup" className='btn btn-sm m-3 bg-grey'>Signup</Link>
 <Link to="/addproducts" className='btn btn-sm m-3 bg-grey'>Add products</Link>
 
</nav>
    <div className="App">
      <header className="App-header">
      <h1 text-danger>Welcome to Mlenga Carhire</h1>

      </header>
      

      <Routes>
        <Route path='/signup' element={< Signup />} />
        <Route path='/signin' element={< Signin />} />
        <Route path='/addproducts' element={< Addproducts />} />
        <Route path='/' element={<Getproducts />} />
        <Route path='/makepayment' element={< Makepayment />} />
        <Route path='*' element={< Notfound />} />
      </Routes>

      <Footer/>
    </div>
   </Router>
  );
}

export default App;
