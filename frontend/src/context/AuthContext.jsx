import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Create the context to hold authentication state.
const AuthContext = createContext(null);

// 2. Create the provider component. This component will wrap your entire app.
export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

    useEffect(() => {
        const handleStorageChange = () => {
            setAuthToken(localStorage.getItem('authToken'));
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Function to handle user login
    const login = (token) => {
        localStorage.setItem('authToken', token);
        setAuthToken(token);
    };

    // Function to handle user logout
    const logout = () => {
        localStorage.removeItem('authToken');
        setAuthToken(null);
    };

   
    const value = {
        isAuthenticated: !!authToken,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
