import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Target, Cpu, Thermometer, Battery, Radio } from 'lucide-react';

const Predictions = () => {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const fetchPredictions = async () => {
      const token = localStorage.getItem('token');
      // Fetch predictions with failure risk > 0
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/predictions`, { headers: { 'x-auth-token': token } });
      const uniquePreds = res.data.filter(p => p.failureRiskPercentage > 10).slice(0, 10);
      setPredictions(uniquePreds);
    };
    fetchPredictions();
  }, []);

  const getIssueIcon = (issue) => {
    if (issue.includes('Thermal')) return <Thermometer className="text-neonRed" size={20} />;
    if (issue.includes('Battery')) return <Battery className="text-neonYellow" size={20} />;
    if (issue.includes('Compute')) return <Cpu className="text-neonCyan" size={20} />;
    if (issue.includes('Communication')) return <Radio className="text-neonYellow" size={20} />;
    return <Target className="text-neonRed" size={20} />;
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slateGray pb-4">
        <h2 className="text-3xl font-orbitron font-bold text-white tracking-wider">PREDICTIVE INTELLIGENCE</h2>
        <p className="text-gray-400 mt-1">AI-driven failure forecasting and mitigation</p>
      </div>

      <div className="space-y-4">
        {predictions.map(pred => (
          <div key={pred._id} className="bg-darkNavy border border-slateGray rounded-xl p-6 hover:border-neonCyan transition-colors">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-spaceBlack border border-slateGray rounded-lg flex items-center justify-center">
                  {getIssueIcon(pred.predictedIssue)}
                </div>
                <div>
                  <h3 className="text-lg font-orbitron font-bold text-white flex items-center gap-2">
                    {pred.satelliteId?.name}
                    <span className="text-xs font-inter bg-slateGray text-white px-2 py-0.5 rounded tracking-widest uppercase">PREDICTION</span>
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">Predicted Event: <span className="text-neonYellow">{pred.predictedIssue}</span></p>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className="text-xs text-gray-500 font-orbitron mb-1">FAILURE PROBABILITY</div>
                <div className="flex items-end gap-2">
                  <span className={`text-3xl font-bold font-inter ${pred.failureRiskPercentage > 70 ? 'text-neonRed' : pred.failureRiskPercentage > 40 ? 'text-neonYellow' : 'text-neonCyan'}`}>
                    {pred.failureRiskPercentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-[rgba(0,240,255,0.05)] border border-[rgba(0,240,255,0.2)] rounded-lg">
              <div className="text-xs text-neonCyan font-orbitron tracking-widest uppercase mb-2">Recommended Mitigation Action</div>
              <p className="text-sm text-gray-300 font-inter">{pred.recommendedAction}</p>
            </div>
          </div>
        ))}
        {predictions.length === 0 && <p className="text-gray-400 font-orbitron">No impending failures predicted by the AI engine.</p>}
      </div>
    </div>
  );
};

export default Predictions;
