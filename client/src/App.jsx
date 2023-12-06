import React, { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/Homepage';
import Favorites from './pages/Favorites';
import Cart from './pages/cart';
import Item from './pages/item';
import Login from './pages/Login';
import Search from "./pages/Search";


const App = () => {
    const [session, setSession] = useState(null);
    
    return (
        <>
            <NavBar />
            
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login session = {session}
                                                     setSession = {setSession}/>} />
                <Route path="/item/:itemId" element={<Item />} />
                <Route path="/search/:searchQuery" element={<Search />} />

            </Routes>

            <Footer />
        </>
    );
}

export default App;