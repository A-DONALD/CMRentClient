import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(() => localStorage.getItem('token') || null);
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        validateToken();
    }, [authToken]);

    const validateToken = async () => {
        if (!authToken) {
            setUser(null);
            return;
        }

        try {
            await axios.post('/api/auth/validate-token', { token: authToken });

        } catch (error) {
            console.error('Token validation error:', error.response?.status);
            logout();
        }
    };

    const login = (token, userData) => {
        setAuthToken(token);
        setUser(userData);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setAuthToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        try {
            axios.get('/api/auth/logout');
        } catch (error) {
            console.error('Failed to contact the server : ', error.response?.status);
        }
    };

    const isAuthenticated = () => {
        return !!user;
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);