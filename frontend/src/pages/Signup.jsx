import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Satellite } from 'lucide-react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Viewer');
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(name, email, password, role);
      navigate('/');
    } catch (err) {
      alert('Signup failed.');
    }
  };

  return (
    <div className="min-h-screen bg-spaceBlack flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-darkNavy border border-slateGray rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-neonCyan shadow-[0_0_20px_rgba(0,240,255,1)] rounded-b-full"></div>
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-spaceBlack border border-neonCyan rounded-xl flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <Satellite size={32} className="text-neonCyan animate-pulse" />
          </div>
          <h2 className="text-3xl font-orbitron font-bold text-white tracking-wider">REQUEST ACCESS</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-xs font-bold mb-2 uppercase tracking-wider">Operative Name</label>
            <input type="text" required className="w-full bg-spaceBlack border border-slateGray text-white rounded-lg p-3 focus:outline-none focus:border-neonCyan transition-all" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-bold mb-2 uppercase tracking-wider">Email</label>
            <input type="email" required className="w-full bg-spaceBlack border border-slateGray text-white rounded-lg p-3 focus:outline-none focus:border-neonCyan transition-all" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-bold mb-2 uppercase tracking-wider">Passcode</label>
            <input type="password" required className="w-full bg-spaceBlack border border-slateGray text-white rounded-lg p-3 focus:outline-none focus:border-neonCyan transition-all" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-bold mb-2 uppercase tracking-wider">Clearance Level</label>
            <select className="w-full bg-spaceBlack border border-slateGray text-white rounded-lg p-3 focus:outline-none focus:border-neonCyan transition-all" value={role} onChange={e => setRole(e.target.value)}>
              <option value="Viewer">Viewer</option>
              <option value="Operator">Operator</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-neonCyan hover:bg-[#00c0cc] text-spaceBlack font-bold py-3 px-4 rounded-lg transition-colors font-orbitron tracking-widest mt-6">
            SUBMIT REQUEST
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          Already have clearance? <Link to="/login" className="text-neonCyan hover:underline">Acknowledge</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
