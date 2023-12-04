import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
import NavBar from './components/NavBar';
import LoginSignup from './components/Login-Signup';


const App = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login-signup" element={<LoginSignup />} />
            </Routes>
        </>
    );
}

export default App;