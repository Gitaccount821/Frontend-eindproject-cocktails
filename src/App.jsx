import React from 'react';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Contact from './pages/Contact';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
