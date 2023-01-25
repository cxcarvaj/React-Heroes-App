import { useContext } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { AuthContext, LoginPage } from '../auth';

export const PublicRoute = ({ children }) => {

    const { logged } = useContext(AuthContext);

    return !logged ? children : <Navigate to="/marvel" />;

};