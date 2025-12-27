import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Hotels from './pages/Hotels';
import HotelDetail from './pages/HotelDetail';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import Tickets from './pages/Tickets';
import Transport from './pages/Transport';
import Bookings from './pages/Bookings';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="App" style={{ margin: 0, padding: 0 }}>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:id" element={<HotelDetail />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:id" element={<DestinationDetail />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/transport" element={<Transport />} />
        
        {/* Private Routes */}
        <Route path="/bookings" element={
          <PrivateRoute>
            <Bookings />
          </PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/admin" element={
          <PrivateRoute roles={['admin']}>
            <AdminDashboard />
          </PrivateRoute>
        } />
      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;
