import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './features/landing/LandingPage';
import AuthPage from './features/auth/AuthPage';
import ForgotPassword from './features/auth/ForgotPassword';
import Dashboard from './features/dashboard/Dashboard';
import QuestionList from './features/questions/QuestionList';
import Bookmarks from './features/bookmarks/Bookmarks';
import Subjects from './features/subjects/Subjects';
import MockTest from './features/mocktest/MockTest';
import Profile from './features/profile/Profile';
import AdminPanel from './features/admin/AdminPanel';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

function Protected({ children, adminOnly }) {
  return (
    <ProtectedRoute adminOnly={adminOnly}>
      <Layout>{children}</Layout>
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<AuthPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
      <Route path="/questions" element={<Protected><QuestionList /></Protected>} />
      <Route path="/bookmarks" element={<Protected><Bookmarks /></Protected>} />
      <Route path="/subjects" element={<Protected><Subjects /></Protected>} />
      <Route path="/mocktest" element={<Protected><MockTest /></Protected>} />
      <Route path="/profile" element={<Protected><Profile /></Protected>} />
      <Route path="/admin" element={<Protected adminOnly><AdminPanel /></Protected>} />

      <Route path="*" element={<Protected><Dashboard /></Protected>} />
    </Routes>
  );
}
