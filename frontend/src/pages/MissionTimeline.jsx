import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Clock, Activity, AlertTriangle, TrendingUp, Info } from 'lucide-react';

const MissionTimeline = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`, { headers: { 'x-auth-token': token } });
      setEvents(res.data);
    };
    fetchEvents();
    const interval = setInterval(fetchEvents, 5000);
    return () => clearInterval(interval);
  }, []);

  const getEventIcon = (type) => {
    switch(type) {
      case 'Alert': return <AlertTriangle className="text-neonRed" size={16} />;
      case 'Prediction': return <TrendingUp className="text-neonYellow" size={16} />;
      case 'Telemetry': return <Activity className="text-neonCyan" size={16} />;
      default: return <Info className="text-neonGreen" size={16} />;
    }
  };

  const getEventColor = (type) => {
    switch(type) {
      case 'Alert': return 'border-neonRed text-neonRed';
      case 'Prediction': return 'border-neonYellow text-neonYellow';
      case 'Telemetry': return 'border-neonCyan text-neonCyan';
      default: return 'border-neonGreen text-neonGreen';
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slateGray pb-4">
        <h2 className="text-3xl font-orbitron font-bold text-white tracking-wider">MISSION TIMELINE</h2>
        <p className="text-gray-400 mt-1">Chronological Event History</p>
      </div>

      <div className="bg-darkNavy border border-slateGray rounded-xl p-6 relative">
        <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-slateGray z-0"></div>
        <div className="space-y-8 relative z-10">
          {events.map((ev, index) => (
            <div key={ev._id} className="flex items-start gap-6">
              <div className={`w-10 h-10 rounded-full border-2 bg-spaceBlack flex items-center justify-center shrink-0 ${getEventColor(ev.eventType)}`}>
                {getEventIcon(ev.eventType)}
              </div>
              <div className="flex-1 bg-spaceBlack border border-slateGray p-4 rounded-lg hover:border-gray-500 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-bold font-orbitron text-white">{ev.satelliteId?.name || 'SYSTEM'}</span>
                    <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 border rounded ${getEventColor(ev.eventType)} bg-opacity-10`}>{ev.eventType}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 font-mono">
                    <Clock size={12} />
                    {new Date(ev.timestamp).toLocaleTimeString()} - {new Date(ev.timestamp).toLocaleDateString()}
                  </div>
                </div>
                <p className="text-sm text-gray-300">{ev.description}</p>
              </div>
            </div>
          ))}
          {events.length === 0 && <p className="text-gray-400 font-orbitron ml-16">Awaiting system events...</p>}
        </div>
      </div>
    </div>
  );
};

export default MissionTimeline;
