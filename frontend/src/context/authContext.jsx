import React, { createContext } from 'react';

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const serverUrl = "https://apnacart-backend-gx24.onrender.com";

    return (
        <AuthContext.Provider value={{ serverUrl }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
