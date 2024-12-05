import React, { useState } from 'react';
import Link from 'next/link';
import {
  FiHome,
  FiUsers,
  FiDollarSign,
  FiSettings,
  FiMenu,
  FiLogOut,
} from 'react-icons/fi';

interface SidebarProps {
  userRole: 'admin' | 'regular' | null;
}

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const [isExpanded, setIsExpanded] = useState(true); // Estado para expandir/contraer el sidebar

  const toggleSidebar = () => setIsExpanded(!isExpanded); // Alternar estado del sidebar

  return (
    <aside
      className={`${
        isExpanded ? 'w-64' : 'w-20'
      } bg-background-dark text-text-dark min-h-screen flex flex-col shadow-lg transition-all duration-300`}
    >
      {/* Header del Sidebar */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-primary-dark transition-all"
        onClick={toggleSidebar}
      >
        {isExpanded && (
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary text-background-dark rounded-full flex items-center justify-center">
              <FiHome size={24} />
            </div>
            <span className="text-2xl font-semibold">CRM</span>
          </div>
        )}
        <FiMenu size={24} className="text-primary-light" />
      </div>

      {/* Navegación */}
      <nav className="flex flex-col space-y-4 mt-6">
        <Link href="/dashboard">
          <div className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-primary-light transition-all group">
            <FiHome size={20} className="group-hover:text-primary-light" />
            {isExpanded && <span className="ml-4 group-hover:text-primary-light">Dashboard</span>}
          </div>
        </Link>
        <Link href="/clients">
          <div className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-primary-light transition-all group">
            <FiUsers size={20} className="group-hover:text-primary-light" />
            {isExpanded && <span className="ml-4 group-hover:text-primary-light">Clientes</span>}
          </div>
        </Link>
        <Link href="/sales">
          <div className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-primary-light transition-all group">
            <FiDollarSign size={20} className="group-hover:text-primary-light" />
            {isExpanded && <span className="ml-4 group-hover:text-primary-light">Ventas</span>}
          </div>
        </Link>
        {userRole === 'admin' && (
          <Link href="/admin">
            <div className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-primary-light transition-all group">
              <FiSettings size={20} className="group-hover:text-primary-light" />
              {isExpanded && <span className="ml-4 group-hover:text-primary-light">Admin</span>}
            </div>
          </Link>
        )}
      </nav>

      {/* Footer del Sidebar */}
      <div className="mt-auto p-4">
        <div className="flex items-center justify-center">
          {isExpanded ? (
            <div className="flex flex-col items-center">
              <span className="text-sm opacity-75 text-text-light">© 2024 EmpowerBiz</span>
              <button
                onClick={() => alert('Cerrando sesión...')}
                className="mt-2 bg-primary text-background-dark py-2 px-4 rounded-lg shadow hover:bg-primary-dark transition-all flex items-center"
              >
                <FiLogOut size={20} className="mr-2" />
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <button
              onClick={() => alert('Cerrando sesión...')}
              className="bg-primary text-background-dark py-2 px-4 rounded-lg shadow hover:bg-primary-dark transition-all flex items-center"
            >
              <FiLogOut size={20} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
