import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Activity, ShieldAlert, HeartPulse } from 'lucide-react';

const RiskAnalysis = () => {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const fetchPredictions = async () => {
      const token = localStorage.getItem('token');
      // Get the latest prediction for each satellite to form a risk analysis overview
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/predictions`, { headers: { 'x-auth-token': token } });
      
      // Deduplicate to show only the latest per satellite
      const latestMap = new Map();
      res.data.forEach(p => {
        if (!latestMap.has(p.satelliteId._id)) {
          latestMap.set(p.satelliteId._id, p);
        }
      });
      setPredictions(Array.from(latestMap.values()));
    };
    fetchPredictions();
    const interval = setInterval(fetchPredictions, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="border-b border-slateGray pb-4">
        <h2 className="text-3xl font-orbitron font-bold text-white tracking-wider">RISK ANALYSIS ENGINE</h2>
        <p className="text-gray-400 mt-1">Real-time health scores and threat classification</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {predictions.map(pred => (
          <div key={pred._id} className="bg-darkNavy border border-slateGray rounded-xl p-6 relative overflow-hidden">
            {/* Risk indicator line */}
            <div className={`absolute top-0 left-0 w-full h-2 ${pred.healthScore > 75 ? 'bg-neonGreen' : pred.healthScore > 40 ? 'bg-neonYellow' : 'bg-neonRed'}`}></div>
            
            <div className="flex justify-between items-start mb-6 mt-2">
              <h3 className="text-xl font-orbitron font-bold text-neonCyan">{pred.satelliteId?.name}</h3>
              <div className="bg-spaceBlack border border-slateGray p-2 rounded-lg">
                <HeartPulse size={20} className={pred.healthScore > 75 ? 'text-neonGreen' : pred.healthScore > 40 ? 'text-neonYellow' : 'text-neonRed'} />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400 font-orbitron">HEALTH SCORE</span>
                  <span className="text-white font-bold">{pred.healthScore}/100</span>
                </div>
                <div className="w-full bg-spaceBlack rounded-full h-2">
                  <div className={`h-2 rounded-full ${pred.healthScore > 75 ? 'bg-neonGreen' : pred.healthScore > 40 ? 'bg-neonYellow' : 'bg-neonRed'}`} style={{ width: `${pred.healthScore}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400 font-orbitron">RISK SCORE</span>
                  <span className="text-white font-bold">{pred.riskScore}/100</span>
                </div>
                <div className="w-full bg-spaceBlack rounded-full h-2">
                  <div className={`h-2 rounded-full ${pred.riskScore < 25 ? 'bg-neonGreen' : pred.riskScore < 60 ? 'bg-neonYellow' : 'bg-neonRed'}`} style={{ width: `${pred.riskScore}%` }}></div>
                </div>
              </div>

              <div className="pt-4 border-t border-slateGray flex justify-between items-center">
                <span className="text-gray-400 text-xs font-orbitron">CLASSIFICATION</span>
                <span className={`text-xs px-2 py-1 border rounded uppercase tracking-widest font-bold ${pred.warningLevel === 'Critical' ? 'text-neonRed border-neonRed bg-[rgba(255,0,60,0.1)]' : pred.warningLevel === 'High' ? 'text-neonYellow border-neonYellow bg-[rgba(255,215,0,0.1)]' : pred.warningLevel === 'Medium' ? 'text-neonYellow border-neonYellow' : 'text-neonGreen border-neonGreen'}`}>
                  {pred.warningLevel}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskAnalysis;
