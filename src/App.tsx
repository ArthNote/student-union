import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/User/Home';
import Events from './pages/User/Events';
import About from './pages/User/About';
import Login from './pages/Login';
import Footer from './components/Footer';
import Register from './pages/Register';
import AdminEvents from './pages/Admin/Events';
import AddEvent from './pages/Admin/AddEvent';
import EditEvent from './pages/Admin/EditEvent';

function App() {

  return (
    <>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/events" Component={Events} />
            <Route path="/about" Component={About} />
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="/admin-events" Component={AdminEvents} />
            <Route path="/add-event" Component={AddEvent} />
            <Route path="/edit-event/:id" Component={EditEvent} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App
