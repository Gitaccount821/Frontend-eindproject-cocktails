import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthProvider, useAuth } from './context/Authcontext';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import LoadingIndicator from './components/LoadingIndicator/LoadingIndicator';
import HeaderSection from './components/Headersection/Headersection';
import FooterSection from './components/FooterSection/FooterSection';
import logoImage from './assets/cocktaillogoheader.png';

function Main() {
    const { isLoading } = useLoading();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            {isLoading && <LoadingIndicator />}
            <header>
                <HeaderSection
                    logoImage={logoImage}
                    user={user}
                    handleLogout={handleLogout}
                />
            </header>
            <main>
                <App />
            </main>
            <footer>
                <FooterSection
                    contactText="Neem contact op"
                    credits={["In opdracht van:", "Novi Hogeschool"]}
                />
            </footer>
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
