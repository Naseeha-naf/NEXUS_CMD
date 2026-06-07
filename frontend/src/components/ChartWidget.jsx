import React from 'react';

const ChartWidget = ({ title, children, action }) => {
  return (
    <div className="bg-darkNavy border border-slateGray rounded-xl p-5 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-orbitron tracking-wide text-gray-200">{title}</h3>
        {action && <div>{action}</div>}
      </div>
      <div className="flex-1 w-full relative min-h-[300px]">
        {children}
      </div>
    </div>
  );
};

export default ChartWidget;
