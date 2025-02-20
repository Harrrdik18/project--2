import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ProjectDetail from './pages/ProjectDetail'
import ProtectedRoute from './components/ProtectedRoute';
import EditTranscript from './pages/EditTranscript';
import AccountSettings from './pages/AccountSettings';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/project/:projectId" 
          element={
            <ProtectedRoute>
              <ProjectDetail />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/project/:projectId/file/:fileId" 
          element={
            <ProtectedRoute>
              <EditTranscript />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/account-settings" 
          element={
            <ProtectedRoute>
              <AccountSettings />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  )
}

export default App
