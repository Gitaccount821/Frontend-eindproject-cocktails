import React from 'react';
import './App.css';
import Home from './pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import Search from './pages/Search/Search';
import Recommended from './pages/Recommended/Recommended';
import Favourites from './pages/Favourites/Favourites';
import CocktailDetail from './pages/CocktailDetail/CocktailDetail';
import Contact from './pages/Contact/Contact';
import Header from './components/Headersection/Header';
import Footer from './components/FooterSection/Footer';
import logoImage from './assets/cocktaillogoheader.png';
import { useAuth } from './context/Authcontext';

function App() {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <Header
                logoImage={logoImage}
                user={user}
                handleLogout={handleLogout}
            />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Search" element={<Search />} />
                <Route path="/Recommended" element={<Recommended />} />
                <Route path="/Favourites" element={<Favourites />} />
                <Route path="/cocktail/:id" element={<CocktailDetail />} />
            </Routes>
            <Footer
                contactText="Neem contact op"
                credits={["In opdracht van:", "Novi Hogeschool"]}
            />
        </>
    );
}

export default App;
