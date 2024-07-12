import React from 'react';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Contact from './pages/Contact';
import SignUp from "./pages/SignUp";

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/SignUp" element={<SignUp />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
