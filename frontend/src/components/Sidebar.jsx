import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Activity, Satellite, ShieldAlert, Bell, TrendingUp, BarChart2, Globe, Clock, Bot } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Mission Control', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Live Telemetry', path: '/telemetry', icon: <Activity size={20} /> },
    { name: 'Satellite Mgmt', path: '/satellites', icon: <Satellite size={20} /> },
    { name: 'Risk Analysis', path: '/risk', icon: <ShieldAlert size={20} /> },
    { name: 'Alert Center', path: '/alerts', icon: <Bell size={20} /> },
    { name: 'Predictions', path: '/predictions', icon: <TrendingUp size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart2 size={20} /> },
    { name: 'Mission Timeline', path: '/timeline', icon: <Clock size={20} /> },
    { name: 'Orbit Viz', path: '/orbit', icon: <Globe size={20} /> },
    { name: 'AI Copilot', path: '/copilot', icon: <Bot size={20} /> },
  ];

  return (
    <div className="w-64 bg-darkNavy border-r border-slateGray h-full flex flex-col transition-all duration-300">
      <div className="p-6 flex items-center gap-3 border-b border-slateGray">
        <div className="w-8 h-8 rounded bg-neonCyan flex items-center justify-center animate-pulse">
          <Satellite size={20} className="text-spaceBlack" />
        </div>
        <h1 className="font-orbitron font-bold text-lg tracking-wider text-white">NEXUS<span className="text-neonCyan">CMD</span></h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 font-inter ${
                    isActive
                      ? 'bg-spaceBlack border border-neonCyan text-neonCyan shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                      : 'text-gray-400 hover:text-white hover:bg-slateGray'
                  }`
                }
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slateGray text-xs text-gray-500 text-center font-orbitron">
        SYSTEM ONLINE <span className="inline-block w-2 h-2 rounded-full bg-neonGreen ml-1 animate-pulse"></span>
      </div>
    </div>
  );
};

export default Sidebar;
