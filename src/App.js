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

    <nav className='row text-center bg-yellow'>
 <Link to="/" className='btn btn-primary btn-sm m-1'>Home</Link>
 <Link to="/signin" className='btn btn-danger btn-sm m-1'>Signin</Link>
 <Link to="/signup" className='btn btn-info btn-sm m-1'>Signup</Link>
 <Link to="/addproducts" className='btn btn-warning btn-sm m-1'>Add products</Link>
 
</nav>
    <div className="App">
      <header className="App-header">
      <h1>Welcome to motor dealer</h1>

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
