import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import App from './App';
import { AuthProvider, useAuth } from './context/Authcontext';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import LoadingIndicator from './components/LoadingIndicator/LoadingIndicator';
import HeaderSection from './components/Headersection/Headersection';
import FooterSection from './components/FooterSection/FooterSection';
import logoImage from './assets/cocktaillogoheader.png';

function Main() {
    const { isLoading } = useLoading();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const handleNavigateToContact = () => navigate('/contact');
    const handleNavigateToLogin = () => navigate('/login');
    const handleLogout = () => {
        logout();
        navigate('/');
    };
    const handleNavigateToSearch = () => navigate('/search');
    const handleNavigateToRecommended = () => navigate('/Recommended');
    const handleNavigateToFavourites = () => navigate('/Favourites');
    const handleNavigateHome = () => navigate('/');

    return (
        <>
            {isLoading && <LoadingIndicator />}
            <HeaderSection
                handleNavigateHome={handleNavigateHome}
                handleNavigateToContact={handleNavigateToContact}
                handleLogout={handleLogout}
                handleNavigateToLogin={handleNavigateToLogin}
                handleNavigateToSearch={handleNavigateToSearch}
                handleNavigateToRecommended={handleNavigateToRecommended}
                handleNavigateToFavourites={handleNavigateToFavourites}
                user={user}
                logoImage={logoImage}
            />
            <App />
            <FooterSection
                contactText="neem contact op"
                credits={["In opdracht van:", "Novi Hogeschool"]}
                onContactClick={handleNavigateToContact}
            />
        </>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <LoadingProvider>
                <AuthProvider>
                    <Main />
                </AuthProvider>
            </LoadingProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
