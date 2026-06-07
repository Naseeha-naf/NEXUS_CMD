import React from 'react';

const KPICard = ({ title, value, subtitle, icon, color = 'neonCyan' }) => {
  const colorMap = {
    neonCyan: 'text-neonCyan border-neonCyan shadow-[0_0_15px_rgba(0,240,255,0.2)]',
    neonGreen: 'text-neonGreen border-neonGreen shadow-[0_0_15px_rgba(57,255,20,0.2)]',
    neonYellow: 'text-neonYellow border-neonYellow shadow-[0_0_15px_rgba(255,215,0,0.2)]',
    neonRed: 'text-neonRed border-neonRed shadow-[0_0_15px_rgba(255,0,60,0.2)]',
    slateGray: 'text-gray-400 border-slateGray shadow-none'
  };

  const bgMap = {
    neonCyan: 'bg-[rgba(0,240,255,0.1)]',
    neonGreen: 'bg-[rgba(57,255,20,0.1)]',
    neonYellow: 'bg-[rgba(255,215,0,0.1)]',
    neonRed: 'bg-[rgba(255,0,60,0.1)]',
    slateGray: 'bg-slateGray bg-opacity-20'
  };

  return (
    <div className={`bg-darkNavy border border-slateGray rounded-xl p-5 relative overflow-hidden flex flex-col justify-between hover:border-gray-500 transition-colors`}>
      {/* Accent Line */}
      <div className={`absolute top-0 left-0 w-full h-1 ${bgMap[color]}`} />
      
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-400 font-orbitron text-sm uppercase tracking-wider">{title}</h3>
        <div className={`p-2 rounded-lg ${bgMap[color]} ${colorMap[color].split(' ')[0]}`}>
          {icon}
        </div>
      </div>
      
      <div>
        <div className={`text-4xl font-bold font-inter mb-1 ${colorMap[color].split(' ')[0]}`}>
          {value}
        </div>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
    </div>
  );
};

export default KPICard;
