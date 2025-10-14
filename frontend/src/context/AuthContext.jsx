import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Create the context to hold authentication state.
const AuthContext = createContext(null);

// 2. Create the provider component. This component will wrap your entire app.
export const AuthProvider = ({ children }) => {
    // Initialize the token state by reading from localStorage.
    // This keeps the user logged in even if they refresh the page.
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

    // This effect helps sync the login state across multiple browser tabs.
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

    // The value that will be provided to all consuming components.
    const value = {
        isAuthenticated: !!authToken, // A boolean: true if a token exists, false otherwise
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Create a custom hook for easy access to the auth context from any component.
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        // This error will be thrown if you try to use this hook outside of an AuthProvider.
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
