import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AlertOctagon, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

const AlertCenter = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/alerts`, { headers: { 'x-auth-token': token } });
      setAlerts(res.data);
    };
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000);
    return () => clearInterval(interval);
  }, []);

  const resolveAlert = async (id) => {
    const token = localStorage.getItem('token');
    await axios.put(`${import.meta.env.VITE_API_URL}/api/alerts/${id}/resolve`, {}, { headers: { 'x-auth-token': token } });
    setAlerts(alerts.map(a => a._id === id ? { ...a, resolved: true } : a));
  };

  const getSeverityStyles = (severity) => {
    switch(severity) {
      case 'Critical': return 'border-neonRed text-neonRed bg-[rgba(255,0,60,0.05)]';
      case 'Warning': return 'border-neonYellow text-neonYellow bg-[rgba(255,215,0,0.05)]';
      default: return 'border-neonCyan text-neonCyan bg-[rgba(0,240,255,0.05)]';
    }
  };

  const getIcon = (severity) => {
    switch(severity) {
      case 'Critical': return <AlertOctagon className="text-neonRed" />;
      case 'Warning': return <AlertTriangle className="text-neonYellow" />;
      default: return <Info className="text-neonCyan" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slateGray pb-4">
        <h2 className="text-3xl font-orbitron font-bold text-white tracking-wider">ALERT CENTER</h2>
        <p className="text-gray-400 mt-1">System Warnings & Critical Events</p>
      </div>

      <div className="space-y-4">
        {alerts.map(alert => (
          <div key={alert._id} className={`p-4 rounded-lg border-l-4 ${getSeverityStyles(alert.severity)} ${alert.resolved ? 'opacity-50 border-gray-600 text-gray-400 bg-transparent' : ''} flex items-center justify-between transition-all`}>
            <div className="flex items-center gap-4">
              {alert.resolved ? <CheckCircle2 className="text-gray-500" /> : getIcon(alert.severity)}
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-bold font-orbitron">{alert.satelliteId?.name || 'Unknown'}</span>
                  <span className="text-xs tracking-wider uppercase bg-spaceBlack px-2 py-0.5 rounded border border-current">{alert.metric}</span>
                </div>
                <p className="text-sm mt-1">{alert.message}</p>
                <p className="text-xs mt-2 opacity-70 font-mono">{new Date(alert.timestamp).toLocaleString()}</p>
              </div>
            </div>
            {!alert.resolved && (
              <button 
                onClick={() => resolveAlert(alert._id)}
                className="px-4 py-2 border border-current rounded text-xs font-bold uppercase tracking-wider hover:bg-current hover:text-spaceBlack transition-colors"
              >
                Acknowledge
              </button>
            )}
          </div>
        ))}
        {alerts.length === 0 && <p className="text-gray-400 font-orbitron">No active alerts. Systems nominal.</p>}
      </div>
    </div>
  );
};

export default AlertCenter;
