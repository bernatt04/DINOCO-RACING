// src/pages/admin.tsx

import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { UserRole } from '../constants/roles';
import {
  PlusIcon,
  PencilAltIcon,
  TrashIcon,
  SearchIcon,
  XIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/solid';
import { Transition } from '@headlessui/react';

// Define el tipo de usuario
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface AdminProps {
  userRole: UserRole | null;
  setUserRole: (role: UserRole | null) => void;
}

const Admin: React.FC<AdminProps> = ({ userRole, setUserRole }) => {
  // Estado principal
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [formData, setFormData] = useState<Omit<User, 'id'>>({ name: '', email: '', role: 'user' });
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; role?: string }>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage] = useState<number>(5);
  const [sortConfig, setSortConfig] = useState<{ key: keyof User; direction: 'ascending' | 'descending' } | null>(null);

  // Efecto para simular la carga de datos
  useEffect(() => {
    // Simulación de llamada a una API
    setTimeout(() => {
      setUsers([
        { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin' },
        { id: 2, name: 'Juan Pérez', email: 'juan@example.com', role: 'user' },
        { id: 3, name: 'María López', email: 'maria@example.com', role: 'user' },
        { id: 4, name: 'Carlos Martínez', email: 'carlos@example.com', role: 'user' },
        { id: 5, name: 'Ana Gómez', email: 'ana@example.com', role: 'user' },
        { id: 6, name: 'Luis Rodríguez', email: 'luis@example.com', role: 'user' },
        { id: 7, name: 'Sofía Hernández', email: 'sofia@example.com', role: 'user' },
        { id: 8, name: 'Pedro Sánchez', email: 'pedro@example.com', role: 'user' },
        { id: 9, name: 'Lucía Díaz', email: 'lucia@example.com', role: 'user' },
        { id: 10, name: 'Diego Torres', email: 'diego@example.com', role: 'user' },
        // Agrega más usuarios según sea necesario
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  // Función para manejar la apertura del modal de agregar usuario
  const handleAddUser = () => {
    setFormData({ name: '', email: '', role: 'user' });
    setFormErrors({});
    setIsAddModalOpen(true);
  };

  // Función para manejar la apertura del modal de editar usuario
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setFormErrors({});
    setIsEditModalOpen(true);
  };

  // Función para manejar la apertura del modal de eliminar usuario
  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  // Validación del formulario
  const validateForm = () => {
    const errors: { name?: string; email?: string; role?: string } = {};
    if (!formData.name.trim()) {
      errors.name = 'El nombre es obligatorio.';
    }
    if (!formData.email.trim()) {
      errors.email = 'El email es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'El email no es válido.';
    }
    if (!formData.role) {
      errors.role = 'El rol es obligatorio.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Función para agregar un nuevo usuario
  const submitAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const newUser: User = { id: Date.now(), ...formData };
      setUsers([newUser, ...users]);
      setIsAddModalOpen(false);
      setCurrentPage(1); // Volver a la primera página
    }
  };

  // Función para editar un usuario existente
  const submitEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && selectedUser) {
      const updatedUser: User = { id: selectedUser.id, ...formData };
      setUsers(users.map(user => (user.id === selectedUser.id ? updatedUser : user)));
      setIsEditModalOpen(false);
      setSelectedUser(null);
    }
  };

  // Función para confirmar la eliminación de un usuario
  const confirmDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter(user => user.id !== selectedUser.id));
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    }
  };

  // Función para manejar la búsqueda con debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setCurrentPage(1); // Resetear a la primera página al buscar
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Filtrado de usuarios según la búsqueda
  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  // Ordenamiento de usuarios
  const sortedUsers = useMemo(() => {
    if (sortConfig !== null) {
      return [...filteredUsers].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return filteredUsers;
  }, [filteredUsers, sortConfig]);

  // Paginación
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  // Función para cambiar la página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Función para manejar el ordenamiento
  const requestSort = (key: keyof User) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Barra lateral */}
      <Sidebar userRole={userRole} />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Encabezado */}
        <Header userRole={userRole} setUserRole={setUserRole} />

        {/* Contenido */}
        <div className="p-6 flex-1">
          {/* Título */}
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Panel de Administración</h2>

          {/* Acciones y búsqueda */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Buscar usuarios..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                aria-label="Buscar usuarios"
              />
              <SearchIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
            </div>

            {/* Botón para agregar usuario */}
            {userRole === 'admin' && (
              <button
                onClick={handleAddUser}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Añadir Usuario
              </button>
            )}
          </div>

          {/* Tabla de usuarios */}
          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            {loading ? (
              <div className="p-6 text-center text-gray-500">Cargando usuarios...</div>
            ) : (
              <>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {/* Columna Nombre con ordenamiento */}
                      <th
                        className="py-3 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort('name')}
                      >
                        <div className="flex items-center">
                          Nombre
                          {sortConfig?.key === 'name' ? (
                            sortConfig.direction === 'ascending' ? (
                              <ChevronUpIcon className="h-4 w-4 ml-1" />
                            ) : (
                              <ChevronDownIcon className="h-4 w-4 ml-1" />
                            )
                          ) : null}
                        </div>
                      </th>

                      {/* Columna Email con ordenamiento */}
                      <th
                        className="py-3 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort('email')}
                      >
                        <div className="flex items-center">
                          Email
                          {sortConfig?.key === 'email' ? (
                            sortConfig.direction === 'ascending' ? (
                              <ChevronUpIcon className="h-4 w-4 ml-1" />
                            ) : (
                              <ChevronDownIcon className="h-4 w-4 ml-1" />
                            )
                          ) : null}
                        </div>
                      </th>

                      {/* Columna Rol con ordenamiento */}
                      <th
                        className="py-3 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort('role')}
                      >
                        <div className="flex items-center">
                          Rol
                          {sortConfig?.key === 'role' ? (
                            sortConfig.direction === 'ascending' ? (
                              <ChevronUpIcon className="h-4 w-4 ml-1" />
                            ) : (
                              <ChevronDownIcon className="h-4 w-4 ml-1" />
                            )
                          ) : null}
                        </div>
                      </th>

                      {/* Columna Acciones */}
                      {userRole === 'admin' && (
                        <th className="py-3 px-6 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">
                          Acciones
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentUsers.length > 0 ? (
                      currentUsers.map(user => (
                        <tr key={user.id}>
                          <td className="py-4 px-6 text-sm text-gray-700">{user.name}</td>
                          <td className="py-4 px-6 text-sm text-gray-700">{user.email}</td>
                          <td className="py-4 px-6 text-sm text-gray-700 capitalize">{user.role}</td>
                          {userRole === 'admin' && (
                            <td className="py-4 px-6 text-sm text-gray-700 flex justify-center space-x-3">
                              {/* Botón Editar */}
                              <button
                                onClick={() => handleEditUser(user)}
                                className="text-yellow-500 hover:text-yellow-600"
                                aria-label={`Editar ${user.name}`}
                              >
                                <PencilAltIcon className="h-5 w-5" />
                              </button>

                              {/* Botón Eliminar */}
                              <button
                                onClick={() => handleDeleteUser(user)}
                                className="text-red-500 hover:text-red-600"
                                aria-label={`Eliminar ${user.name}`}
                              >
                                <TrashIcon className="h-5 w-5" />
                              </button>
                            </td>
                          )}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={userRole === 'admin' ? 4 : 3} className="py-4 px-6 text-center text-gray-500">
                          No se encontraron usuarios.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* Paginación */}
                {totalPages > 1 && (
                  <div className="flex justify-between items-center px-6 py-3 bg-gray-50">
                    <span className="text-sm text-gray-700">
                      Mostrando <span className="font-medium">{currentUsers.length}</span> de{' '}
                      <span className="font-medium">{sortedUsers.length}</span> usuarios
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-md border ${
                          currentPage === 1
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Anterior
                      </button>
                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index + 1}
                          onClick={() => paginate(index + 1)}
                          className={`px-3 py-1 rounded-md border ${
                            currentPage === index + 1
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded-md border ${
                          currentPage === totalPages
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Siguiente
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Modales */}

          {/* Modal para Agregar Usuario */}
          <Transition
            show={isAddModalOpen}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <Transition.Child
                enter="transition-transform duration-300"
                enterFrom="scale-95 opacity-0"
                enterTo="scale-100 opacity-100"
                leave="transition-transform duration-200"
                leaveFrom="scale-100 opacity-100"
                leaveTo="scale-95 opacity-0"
              >
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                  <button
                    onClick={() => setIsAddModalOpen(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    aria-label="Cerrar"
                  >
                    <XIcon className="h-6 w-6" />
                  </button>
                  <h3 className="text-xl font-semibold mb-4">Añadir Nuevo Usuario</h3>
                  <form onSubmit={submitAddUser} noValidate>
                    <div className="mb-4">
                      <label className="block text-gray-700">Nombre</label>
                      <input
                        type="text"
                        className={`mt-1 w-full border ${
                          formErrors.name ? 'border-red-500' : 'border-gray-300'
                        } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600`}
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        aria-invalid={!!formErrors.name}
                        aria-describedby="name-error"
                      />
                      {formErrors.name && (
                        <p className="text-red-500 text-sm mt-1" id="name-error">
                          {formErrors.name}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Email</label>
                      <input
                        type="email"
                        className={`mt-1 w-full border ${
                          formErrors.email ? 'border-red-500' : 'border-gray-300'
                        } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600`}
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        aria-invalid={!!formErrors.email}
                        aria-describedby="email-error"
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-sm mt-1" id="email-error">
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Rol</label>
                      <select
                        className={`mt-1 w-full border ${
                          formErrors.role ? 'border-red-500' : 'border-gray-300'
                        } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600`}
                        value={formData.role}
                        onChange={e => setFormData({ ...formData, role: e.target.value as 'admin' | 'user' })}
                        aria-invalid={!!formErrors.role}
                        aria-describedby="role-error"
                      >
                        <option value="user">Usuario</option>
                        <option value="admin">Administrador</option>
                      </select>
                      {formErrors.role && (
                        <p className="text-red-500 text-sm mt-1" id="role-error">
                          {formErrors.role}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setIsAddModalOpen(false)}
                        className="mr-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                      >
                        Añadir
                      </button>
                    </div>
                  </form>
                </div>
              </Transition.Child>
            </div>
          </Transition>

          {/* Modal para Editar Usuario */}
          <Transition
            show={isEditModalOpen}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <Transition.Child
                enter="transition-transform duration-300"
                enterFrom="scale-95 opacity-0"
                enterTo="scale-100 opacity-100"
                leave="transition-transform duration-200"
                leaveFrom="scale-100 opacity-100"
                leaveTo="scale-95 opacity-0"
              >
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    aria-label="Cerrar"
                  >
                    <XIcon className="h-6 w-6" />
                  </button>
                  <h3 className="text-xl font-semibold mb-4">Editar Usuario</h3>
                  <form onSubmit={submitEditUser} noValidate>
                    <div className="mb-4">
                      <label className="block text-gray-700">Nombre</label>
                      <input
                        type="text"
                        className={`mt-1 w-full border ${
                          formErrors.name ? 'border-red-500' : 'border-gray-300'
                        } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600`}
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        aria-invalid={!!formErrors.name}
                        aria-describedby="edit-name-error"
                      />
                      {formErrors.name && (
                        <p className="text-red-500 text-sm mt-1" id="edit-name-error">
                          {formErrors.name}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Email</label>
                      <input
                        type="email"
                        className={`mt-1 w-full border ${
                          formErrors.email ? 'border-red-500' : 'border-gray-300'
                        } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600`}
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        aria-invalid={!!formErrors.email}
                        aria-describedby="edit-email-error"
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-sm mt-1" id="edit-email-error">
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Rol</label>
                      <select
                        className={`mt-1 w-full border ${
                          formErrors.role ? 'border-red-500' : 'border-gray-300'
                        } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600`}
                        value={formData.role}
                        onChange={e => setFormData({ ...formData, role: e.target.value as 'admin' | 'user' })}
                        aria-invalid={!!formErrors.role}
                        aria-describedby="edit-role-error"
                      >
                        <option value="user">Usuario</option>
                        <option value="admin">Administrador</option>
                      </select>
                      {formErrors.role && (
                        <p className="text-red-500 text-sm mt-1" id="edit-role-error">
                          {formErrors.role}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setIsEditModalOpen(false)}
                        className="mr-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                      >
                        Guardar
                      </button>
                    </div>
                  </form>
                </div>
              </Transition.Child>
            </div>
          </Transition>

          {/* Modal para Confirmar Eliminación */}
          <Transition
            show={isDeleteModalOpen}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <Transition.Child
                enter="transition-transform duration-300"
                enterFrom="scale-95 opacity-0"
                enterTo="scale-100 opacity-100"
                leave="transition-transform duration-200"
                leaveFrom="scale-100 opacity-100"
                leaveTo="scale-95 opacity-0"
              >
                <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative">
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    aria-label="Cerrar"
                  >
                    <XIcon className="h-6 w-6" />
                  </button>
                  <h3 className="text-xl font-semibold mb-4">Confirmar Eliminación</h3>
                  <p className="mb-6">
                    ¿Estás seguro de que deseas eliminar a <span className="font-bold">{selectedUser?.name}</span>?
                  </p>
                  <div className="flex justify-end">
                    <button
                      onClick={() => setIsDeleteModalOpen(false)}
                      className="mr-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={confirmDeleteUser}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Transition>
        </div>
        </div>
        </div>
      );
    };

    export default Admin;
