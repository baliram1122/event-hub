import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EventDetailPage from './pages/EventDetailPage';
import AddEvent from './pages/AddEvent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import YourEvents from './pages/YourEvents';
import Admin from './pages/Admin';
import Calendar from './pages/Calendar';
import Test from './pages/Test';
import SearchPage from './pages/SearchPage';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} /> 
          <Route path='/login' element={<Login />} /> 
          <Route path='/register' element={<Register />} /> 
          <Route path="/event/:eventId" element={<EventDetailPage />} />
          <Route path='/addevent' element={<AddEvent/>} />
          <Route path='/yourevents' element={<YourEvents/>} />
          <Route path='/admin' element={<Admin/>} />
          <Route path='/calendar' element={<Calendar/>} />
          <Route path='/searchpage' element={<SearchPage/>} />
          <Route path='/test' element={<Test/>} />
        </Routes>
      </BrowserRouter> 
      <ToastContainer />
    </div>
  );
}

export default App;
