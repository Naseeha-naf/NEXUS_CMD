import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Satellite } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      alert('Login failed. Please check credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-spaceBlack flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-darkNavy border border-slateGray rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-neonCyan shadow-[0_0_20px_rgba(0,240,255,1)] rounded-b-full"></div>
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-spaceBlack border border-neonCyan rounded-xl flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <Satellite size={32} className="text-neonCyan animate-pulse" />
          </div>
          <h2 className="text-3xl font-orbitron font-bold text-white tracking-wider">NEXUS<span className="text-neonCyan">CMD</span></h2>
          <p className="text-gray-400 text-sm mt-2 font-inter uppercase tracking-widest">Authorized Personnel Only</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-400 text-xs font-bold mb-2 uppercase tracking-wider" htmlFor="email">
              Clearance ID (Email)
            </label>
            <input
              id="email"
              type="email"
              className="w-full bg-spaceBlack border border-slateGray text-white rounded-lg p-3 focus:outline-none focus:border-neonCyan focus:ring-1 focus:ring-neonCyan transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-bold mb-2 uppercase tracking-wider" htmlFor="password">
              Passcode
            </label>
            <input
              id="password"
              type="password"
              className="w-full bg-spaceBlack border border-slateGray text-white rounded-lg p-3 focus:outline-none focus:border-neonCyan focus:ring-1 focus:ring-neonCyan transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-neonCyan hover:bg-[#00c0cc] text-spaceBlack font-bold py-3 px-4 rounded-lg transition-colors font-orbitron tracking-widest mt-4"
          >
            INITIALIZE UPLINK
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          No clearance? <Link to="/signup" className="text-neonCyan hover:underline">Request Access</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
