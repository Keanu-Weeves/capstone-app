import './App.css';
import Nav from './Components/Nav/Nav.js';
import Homepage from './Pages/Homepage.js';
import { Routes, Route } from 'react-router-dom';
import Reservations from './Pages/Reservations.js';

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
          <Route path="/about" element={<div>About Content</div>} />
          <Route path="/menu" element={<div>Menu Content</div>} />
          <Route path="/order" element={<div>Order Online Content</div>} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/login" element={<div>Login Content</div>} />
        </Routes>
      </main>
    </>
  );
}

export default App;