import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import Favourites from './pages/favourites';
import Cart from './pages/cart';
import NavBar from './components/NavBar';


const App = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/favourites" element={<Favourites />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </>
    );
}

export default App;