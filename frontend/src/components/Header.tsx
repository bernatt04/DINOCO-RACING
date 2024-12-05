import React from 'react';
import { FiUser, FiLogOut } from 'react-icons/fi'; // Iconos de usuario y logout

interface HeaderProps {
  userRole: 'admin' | 'regular' | null;
  setUserRole: (role: 'admin' | 'regular' | null) => void;
}

const Header: React.FC<HeaderProps> = ({ userRole, setUserRole }) => {
  const handleLogout = () => {
    setUserRole(null);
    alert('Has cerrado sesión');
  };

  return (
    <header className="bg-background-dark text-text-dark flex justify-between items-center px-6 py-4 shadow-lg">
      {/* Logo del Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary text-background-dark rounded-full flex items-center justify-center">
          <FiUser size={24} className="text-white" />
        </div>
        <h1 className="text-2xl font-semibold text-primary-light">EmpowerBiz</h1>
      </div>

      {/* Opciones de Usuario */}
      {userRole && (
        <div className="relative flex items-center space-x-6">
          {/* Rol del Usuario */}
          <span className="text-lg font-medium text-text-light">
            {userRole === 'admin' ? 'Administrador' : 'Usuario'}
          </span>

          {/* Menú de Usuario */}
          <div className="group relative">
            <button className="flex items-center space-x-2 bg-primary-dark text-white px-4 py-2 rounded-lg shadow-md hover:bg-primary-light transition-all">
              <FiUser size={20} />
              <span className="hidden md:block">Cuenta</span>
            </button>
            {/* Dropdown del Menú */}
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg overflow-hidden hidden group-hover:block">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-left text-primary-dark hover:bg-primary-light hover:text-white transition-colors"
              >
                <FiLogOut size={20} className="mr-2" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
