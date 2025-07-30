import './App.css';
import Nav from './Components/Nav/Nav.js';
import Homepage from './Pages/Homepage.js';
import { Routes, Route } from 'react-router-dom';
import Reservations from './Pages/Reservations.js';
import Menupage from './Pages/Menupage.js'
import Aboutpage from './Pages/Aboutpage.js';
import Orderpage from './Pages/Orderpage.js';
import Login from './Pages/Login.js';

// Assume you have an OrderPage component
// import OrderPage from './components/OrderPage';

function App() {
  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/about" element={<Aboutpage />} />
          <Route path="/menu" element={<Menupage />} />
          <Route path="/order" element={<Orderpage />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </>
  );
}

export default App;