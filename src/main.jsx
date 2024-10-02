import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/Authcontext';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import LoadingIndicator from './components/LoadingIndicator/LoadingIndicator';

function Main() {
    const { isLoading } = useLoading();

    return (
        <>
            {isLoading && <LoadingIndicator />}
            <App />
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
