import React, { createContext, useState, useContext } from 'react';

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading, loadingProgress, setLoadingProgress }}>
            {children}
        </LoadingContext.Provider>
    );
};
