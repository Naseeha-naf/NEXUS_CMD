import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChartWidget from '../components/ChartWidget';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LiveTelemetry = () => {
  const [satellites, setSatellites] = useState([]);
  const [selectedSat, setSelectedSat] = useState(null);
  const [telemetry, setTelemetry] = useState([]);

  useEffect(() => {
    const fetchSats = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/satellites`, { headers: { 'x-auth-token': token } });
      setSatellites(res.data);
      if (res.data.length > 0) setSelectedSat(res.data[0]._id);
    };
    fetchSats();
  }, []);

  useEffect(() => {
    if (!selectedSat) return;
    const fetchTelemetry = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/telemetry/${selectedSat}?limit=30`, { headers: { 'x-auth-token': token } });
      
      const formatted = res.data.map(t => ({
        time: new Date(t.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' }),
        battery: t.batteryLevel,
        temp: t.temperature,
        cpu: t.cpuUtilization,
        signal: t.signalStrength
      }));
      setTelemetry(formatted);
    };
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 5000);
    return () => clearInterval(interval);
  }, [selectedSat]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-slateGray pb-4">
        <h2 className="text-3xl font-orbitron font-bold text-white tracking-wider">LIVE TELEMETRY</h2>
        <select 
          className="bg-darkNavy border border-neonCyan text-neonCyan rounded px-4 py-2 font-orbitron focus:outline-none"
          value={selectedSat || ''}
          onChange={(e) => setSelectedSat(e.target.value)}
        >
          {satellites.map(s => (
            <option key={s._id} value={s._id}>{s.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartWidget title="Battery Level (%)">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={telemetry}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
              <XAxis dataKey="time" stroke="#9CA3AF" tick={{fontSize: 12}} />
              <YAxis stroke="#9CA3AF" domain={[0, 100]} />
              <Tooltip contentStyle={{backgroundColor: '#0B1020', borderColor: '#1F2937'}} />
              <Line type="monotone" dataKey="battery" stroke="#39FF14" strokeWidth={2} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartWidget>

        <ChartWidget title="Temperature (°C)">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={telemetry}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
              <XAxis dataKey="time" stroke="#9CA3AF" tick={{fontSize: 12}} />
              <YAxis stroke="#9CA3AF" domain={[-50, 100]} />
              <Tooltip contentStyle={{backgroundColor: '#0B1020', borderColor: '#1F2937'}} />
              <Line type="monotone" dataKey="temp" stroke="#FF003C" strokeWidth={2} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartWidget>

        <ChartWidget title="CPU Utilization (%)">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={telemetry}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
              <XAxis dataKey="time" stroke="#9CA3AF" tick={{fontSize: 12}} />
              <YAxis stroke="#9CA3AF" domain={[0, 100]} />
              <Tooltip contentStyle={{backgroundColor: '#0B1020', borderColor: '#1F2937'}} />
              <Line type="monotone" dataKey="cpu" stroke="#00F0FF" strokeWidth={2} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartWidget>

        <ChartWidget title="Signal Strength (%)">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={telemetry}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
              <XAxis dataKey="time" stroke="#9CA3AF" tick={{fontSize: 12}} />
              <YAxis stroke="#9CA3AF" domain={[0, 100]} />
              <Tooltip contentStyle={{backgroundColor: '#0B1020', borderColor: '#1F2937'}} />
              <Line type="monotone" dataKey="signal" stroke="#FFD700" strokeWidth={2} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartWidget>
      </div>
    </div>
  );
};

export default LiveTelemetry;
