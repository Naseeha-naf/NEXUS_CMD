import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-darkNavy border-b border-slateGray h-16 flex items-center justify-between px-6 z-10 shadow-lg">
      <div className="text-sm font-orbitron text-gray-400">
        MISSION TIME: <span className="text-white ml-2">{new Date().toISOString().split('T')[1].split('.')[0]} UTC</span>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slateGray flex items-center justify-center border border-gray-600">
            <User size={16} className="text-gray-300" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white leading-tight">{user?.name || 'Operator'}</span>
            <span className="text-xs text-neonCyan font-orbitron leading-tight">{user?.role || 'Admin'}</span>
          </div>
        </div>
        
        <button 
          onClick={logout}
          className="text-gray-400 hover:text-neonRed transition-colors"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
