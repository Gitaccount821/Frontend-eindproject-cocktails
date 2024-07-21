import React from 'react';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Contact from './pages/Contact';
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Recommended from "./pages/Recommended";
import Favourites from "./pages/Favourites";
import { AuthProvider } from './context/Authcontext';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/SignUp" element={<SignUp />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Search" element={<Search />} />
                    <Route path="/Recommended" element={<Recommended />} />
                    <Route path="/Favourites" element={<Favourites />} />

                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
