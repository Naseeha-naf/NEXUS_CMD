import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit } from 'lucide-react';

const SatelliteManagement = () => {
  const [satellites, setSatellites] = useState([]);
  
  useEffect(() => {
    const fetchSats = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/satellites`, { headers: { 'x-auth-token': token } });
      setSatellites(res.data);
    };
    fetchSats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-slateGray pb-4">
        <h2 className="text-3xl font-orbitron font-bold text-white tracking-wider">SATELLITE MANAGEMENT</h2>
        <button className="bg-neonCyan text-spaceBlack px-4 py-2 rounded font-orbitron text-sm font-bold flex items-center gap-2 hover:bg-[#00c0cc] transition-colors">
          <Plus size={16} /> ADD SATELLITE
        </button>
      </div>

      <div className="bg-darkNavy border border-slateGray rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slateGray bg-opacity-30 border-b border-slateGray text-gray-400 font-orbitron text-sm tracking-wider">
              <th className="p-4">Name</th>
              <th className="p-4">Mission</th>
              <th className="p-4">Launch Date</th>
              <th className="p-4">Orbit</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {satellites.map(sat => (
              <tr key={sat._id} className="border-b border-slateGray hover:bg-slateGray hover:bg-opacity-10 transition-colors">
                <td className="p-4 font-bold text-neonCyan">{sat.name}</td>
                <td className="p-4 text-gray-300">{sat.missionName}</td>
                <td className="p-4 text-gray-400">{new Date(sat.launchDate).toLocaleDateString()}</td>
                <td className="p-4">
                  <span className="bg-slateGray text-xs px-2 py-1 rounded font-orbitron tracking-widest">{sat.orbitType}</span>
                </td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded font-bold uppercase tracking-wider ${sat.status === 'Active' ? 'bg-[rgba(57,255,20,0.1)] text-neonGreen border border-neonGreen' : 'bg-gray-800 text-gray-400 border border-gray-600'}`}>
                    {sat.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-3">
                  <button className="text-gray-400 hover:text-neonCyan transition-colors"><Edit size={18} /></button>
                  <button className="text-gray-400 hover:text-neonRed transition-colors"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SatelliteManagement;
