import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MissionControl from './pages/MissionControl';
import LiveTelemetry from './pages/LiveTelemetry';
import SatelliteManagement from './pages/SatelliteManagement';
import RiskAnalysis from './pages/RiskAnalysis';
import AlertCenter from './pages/AlertCenter';
import Predictions from './pages/Predictions';
import Analytics from './pages/Analytics';
import OrbitVisualization from './pages/OrbitVisualization';
import MissionTimeline from './pages/MissionTimeline';
import MissionCopilot from './pages/MissionCopilot';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div className="text-white flex items-center justify-center h-screen">Loading Systems...</div>;
  return user ? children : <Navigate to="/login" />;
};

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-spaceBlack text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-spaceBlack p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/" element={<ProtectedRoute><Layout><MissionControl /></Layout></ProtectedRoute>} />
          <Route path="/telemetry" element={<ProtectedRoute><Layout><LiveTelemetry /></Layout></ProtectedRoute>} />
          <Route path="/satellites" element={<ProtectedRoute><Layout><SatelliteManagement /></Layout></ProtectedRoute>} />
          <Route path="/risk" element={<ProtectedRoute><Layout><RiskAnalysis /></Layout></ProtectedRoute>} />
          <Route path="/alerts" element={<ProtectedRoute><Layout><AlertCenter /></Layout></ProtectedRoute>} />
          <Route path="/predictions" element={<ProtectedRoute><Layout><Predictions /></Layout></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Layout><Analytics /></Layout></ProtectedRoute>} />
          <Route path="/timeline" element={<ProtectedRoute><Layout><MissionTimeline /></Layout></ProtectedRoute>} />
          <Route path="/orbit" element={<ProtectedRoute><Layout><OrbitVisualization /></Layout></ProtectedRoute>} />
          <Route path="/copilot" element={<ProtectedRoute><Layout><MissionCopilot /></Layout></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
