import React, { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();
const initialState = { isLoggedIn: false };

const reducer = (state, action) => {
    switch (action.type) {
        case "SIGN_IN":
            return {
                isLoggedIn: true
            }
        case "SIGN_OUT":
            return {
                isLoggedIn: false
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);