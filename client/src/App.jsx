import React, { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import PrivateRoutes from "./components/PrivateRoutes";
import UpdateAuth from "./components/Auth";
import HomePage from './pages/Homepage';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
import Item from './pages/Item';
import Login from './pages/Login';
import Search from "./pages/Search";
import NotFound from "./pages/Error";




const App = () => {
    const [session, setSession] = useState(null);
    
    return (
        <>
            <NavBar />
            <UpdateAuth session = {session}
                        setSession = {setSession}/>
            <Routes>
                <Route path='*' element={<NotFound />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login session = {session}
                                                     setSession = {setSession}/>} />
                <Route element={<PrivateRoutes />} >                                     
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/item/:itemId" element={<Item />} />
                </Route>
                <Route path="/search/:searchQuery" element={<Search />} />

            </Routes>

            <Footer />
        </>
    );
}

export default App;