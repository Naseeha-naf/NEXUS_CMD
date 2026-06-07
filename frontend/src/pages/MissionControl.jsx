import React, { useEffect, useState } from 'react';
import axios from 'axios';
import KPICard from '../components/KPICard';
import { Satellite, ShieldCheck, AlertTriangle, XOctagon, Bell, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MissionControl = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/analytics/dashboard`, {
          headers: { 'x-auth-token': token }
        });
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <div className="text-neonCyan animate-pulse font-orbitron">Establishing link...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end border-b border-slateGray pb-4">
        <div>
          <h2 className="text-3xl font-orbitron font-bold text-white tracking-wider">MISSION CONTROL</h2>
          <p className="text-gray-400 mt-1">Global Constellation Overview</p>
        </div>
        <button onClick={() => navigate('/telemetry')} className="bg-darkNavy border border-neonCyan text-neonCyan px-4 py-2 rounded font-orbitron text-sm hover:bg-neonCyan hover:text-spaceBlack transition-colors">
          View Live Telemetry
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPICard title="Total Satellites" value={data.totalSatellites} icon={<Satellite size={24} />} color="neonCyan" />
        <KPICard title="System Health" value={`${data.systemHealthPercentage}%`} icon={<Activity size={24} />} color="neonGreen" />
        <KPICard title="Total Alerts Today" value={data.alertsToday} icon={<Bell size={24} />} color="neonYellow" />
        
        <KPICard title="Healthy Systems" value={data.healthyCount} icon={<ShieldCheck size={24} />} color="neonGreen" />
        <KPICard title="Warning Systems" value={data.warningCount} icon={<AlertTriangle size={24} />} color="neonYellow" />
        <KPICard title="Critical Systems" value={data.criticalCount} icon={<XOctagon size={24} />} color="neonRed" />
      </div>

      {/* Decorative Mission Map / Diagram placeholder */}
      <div className="mt-8 bg-darkNavy border border-slateGray rounded-xl p-6 relative overflow-hidden h-64 flex items-center justify-center">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neonCyan via-spaceBlack to-spaceBlack"></div>
        <div className="text-center z-10">
          <GlobeIcon />
          <p className="text-gray-400 font-orbitron mt-4 tracking-widest text-sm">ORBITAL NETWORK STABLE</p>
        </div>
      </div>
    </div>
  );
};

const GlobeIcon = () => (
  <svg className="w-24 h-24 text-neonCyan animate-[spin_20s_linear_infinite] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

export default MissionControl;
