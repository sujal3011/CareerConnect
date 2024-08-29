// src/routes.js
import React from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import Opportunities from './pages/Opportunities';

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/opportunities" element={<Opportunities />} />
      </Routes>
    </Layout>
  );
}

export default AppRoutes;
