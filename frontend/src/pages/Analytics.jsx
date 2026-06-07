import React from 'react';
import ChartWidget from '../components/ChartWidget';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  // Mock analytics data for the portfolio showcase since historical aggregation takes time to build up in simulation
  const mockHistoricalData = [
    { name: 'Mon', alerts: 12, health: 95 },
    { name: 'Tue', alerts: 19, health: 88 },
    { name: 'Wed', alerts: 3, health: 98 },
    { name: 'Thu', alerts: 5, health: 96 },
    { name: 'Fri', alerts: 2, health: 99 },
    { name: 'Sat', alerts: 0, health: 100 },
    { name: 'Sun', alerts: 8, health: 92 },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-slateGray pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-orbitron font-bold text-white tracking-wider">HISTORICAL ANALYTICS</h2>
          <p className="text-gray-400 mt-1">Weekly System Performance Reports</p>
        </div>
        <button className="bg-darkNavy border border-neonCyan text-neonCyan px-4 py-2 rounded font-orbitron text-sm hover:bg-neonCyan hover:text-spaceBlack transition-colors">
          Download PDF Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartWidget title="Weekly Alert Volume">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockHistoricalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip contentStyle={{backgroundColor: '#0B1020', borderColor: '#1F2937'}} cursor={{fill: '#1F2937'}} />
              <Bar dataKey="alerts" fill="#FFD700" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartWidget>

        <ChartWidget title="Average System Health (%)">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockHistoricalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" domain={[0, 100]} />
              <Tooltip contentStyle={{backgroundColor: '#0B1020', borderColor: '#1F2937'}} cursor={{fill: '#1F2937'}} />
              <Bar dataKey="health" fill="#39FF14" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartWidget>
      </div>
    </div>
  );
};

export default Analytics;
