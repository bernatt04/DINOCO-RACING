import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { UserRole } from '../constants/roles';
import { PlusIcon, PencilAltIcon, TrashIcon, SearchIcon, XIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import { Transition } from '@headlessui/react';

// Define el tipo de cliente
interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface ClientsProps {
  userRole: UserRole | null;
  setUserRole: (role: UserRole | null) => void;
}

const Clients: React.FC<ClientsProps> = ({ userRole, setUserRole }) => {
  // Estado principal
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [formData, setFormData] = useState<Omit<Client, 'id'>>({ name: '', email: '', phone: '' });
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [clientsPerPage] = useState<number>(5);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Client; direction: 'ascending' | 'descending' } | null>(null);

  // Efecto para simular la carga de datos
  useEffect(() => {
    // Simulación de llamada a una API
    setTimeout(() => {
      setClients([
        { id: 1, name: 'Juan Pérez', email: 'juan@example.com', phone: '555-1234' },
        { id: 2, name: 'María López', email: 'maria@example.com', phone: '555-5678' },
        { id: 3, name: 'Carlos Martínez', email: 'carlos@example.com', phone: '555-9012' },
        { id: 4, name: 'Ana Gómez', email: 'ana@example.com', phone: '555-3456' },
        { id: 5, name: 'Luis Rodríguez', email: 'luis@example.com', phone: '555-7890' },
        { id: 6, name: 'Sofía Hernández', email: 'sofia@example.com', phone: '555-2345' },
        { id: 7, name: 'Pedro Sánchez', email: 'pedro@example.com', phone: '555-6789' },
        { id: 8, name: 'Lucía Díaz', email: 'lucia@example.com', phone: '555-0123' },
        { id: 9, name: 'Diego Torres', email: 'diego@example.com', phone: '555-4567' },
        { id: 10, name: 'Valentina Ruiz', email: 'valentina@example.com', phone: '555-8901' },
        // Agrega más clientes según sea necesario
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  // Función para manejar la apertura del modal de agregar cliente
  const handleAddClient = () => {
    setFormData({ name: '', email: '', phone: '' });
    setFormErrors({});
    setIsAddModalOpen(true);
  };

  // Función para manejar la apertura del modal de editar cliente
  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setFormData({ name: client.name, email: client.email, phone: client.phone });
    setFormErrors({});
    setIsEditModalOpen(true);
  };

  // Función para manejar la apertura del modal de eliminar cliente
  const handleDeleteClient = (client: Client) => {
    setSelectedClient(client);
    setIsDeleteModalOpen(true);
  };

  // Validación del formulario
  const validateForm = () => {
    const errors: { name?: string; email?: string; phone?: string } = {};
    if (!formData.name.trim()) {
      errors.name = 'El nombre es obligatorio.';
    }
    if (!formData.email.trim()) {
      errors.email = 'El email es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'El email no es válido.';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'El teléfono es obligatorio.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Función para agregar un nuevo cliente
  const submitAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const newClient: Client = { id: Date.now(), ...formData };
      setClients([newClient, ...clients]);
      setIsAddModalOpen(false);
      setCurrentPage(1); // Volver a la primera página
    }
  };

  // Función para editar un cliente existente
  const submitEditClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && selectedClient) {
      const updatedClient: Client = { id: selectedClient.id, ...formData };
      setClients(clients.map(client => (client.id === selectedClient.id ? updatedClient : client)));
      setIsEditModalOpen(false);
      setSelectedClient(null);
    }
  };

  // Función para confirmar la eliminación de un cliente
  const confirmDeleteClient = () => {
    if (selectedClient) {
      setClients(clients.filter(client => client.id !== selectedClient.id));
      setIsDeleteModalOpen(false);
      setSelectedClient(null);
    }
  };

  // Función para manejar la búsqueda con debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setCurrentPage(1); // Resetear a la primera página al buscar
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Filtrado de clientes según la búsqueda
  const filteredClients = useMemo(() => {
    return clients.filter(client =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery)
    );
  }, [clients, searchQuery]);

  // Ordenamiento de clientes
  const sortedClients = useMemo(() => {
    if (sortConfig !== null) {
      return [...filteredClients].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return filteredClients;
  }, [filteredClients, sortConfig]);

  // Paginar clientes
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = sortedClients.slice(indexOfFirstClient, indexOfLastClient);
  const totalPages = Math.ceil(sortedClients.length / clientsPerPage);

  // Función para cambiar la página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Función para manejar el ordenamiento
  const requestSort = (key: keyof Client) => {
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
        <main className="p-6 flex-1">
          {/* Título y acciones */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Clientes</h2>
            <div className="flex space-x-4 items-center w-full md:w-auto">
              {/* Barra de búsqueda */}
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Buscar clientes..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  aria-label="Buscar clientes"
                />
                <SearchIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>

              {/* Botón para agregar cliente */}
              {userRole === 'admin' && (
                <button
                  onClick={handleAddClient}
                  className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Añadir Cliente
                </button>
              )}
            </div>
          </div>

          {/* Tabla de clientes */}
          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            {loading ? (
              <div className="p-6 text-center text-gray-500">Cargando clientes...</div>
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

                      {/* Columna Teléfono con ordenamiento */}
                      <th
                        className="py-3 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort('phone')}
                      >
                        <div className="flex items-center">
                          Teléfono
                          {sortConfig?.key === 'phone' ? (
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
                    {currentClients.length > 0 ? (
                      currentClients.map(client => (
                        <tr key={client.id}>
                          <td className="py-4 px-6 text-sm text-gray-700">{client.name}</td>
                          <td className="py-4 px-6 text-sm text-gray-700">{client.email}</td>
                          <td className="py-4 px-6 text-sm text-gray-700">{client.phone}</td>
                          {userRole === 'admin' && (
                            <td className="py-4 px-6 text-sm text-gray-700 flex justify-center space-x-3">
                              {/* Botón Editar */}
                              <button
                                onClick={() => handleEditClient(client)}
                                className="text-yellow-500 hover:text-yellow-600"
                                aria-label={`Editar ${client.name}`}
                              >
                                <PencilAltIcon className="h-5 w-5" />
                              </button>

                              {/* Botón Eliminar */}
                              <button
                                onClick={() => handleDeleteClient(client)}
                                className="text-red-500 hover:text-red-600"
                                aria-label={`Eliminar ${client.name}`}
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
                          No se encontraron clientes.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* Paginación */}
                {totalPages > 1 && (
                  <div className="flex justify-between items-center px-6 py-3 bg-gray-50">
                    <span className="text-sm text-gray-700">
                      Mostrando <span className="font-medium">{currentClients.length}</span> de{' '}
                      <span className="font-medium">{sortedClients.length}</span> clientes
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
        </main>

        {/* Modales */}

        {/* Modal para Agregar Cliente */}
        <Transition show={isAddModalOpen} enter="transition-opacity duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
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
                <h3 className="text-xl font-semibold mb-4">Añadir Nuevo Cliente</h3>
                <form onSubmit={submitAddClient} noValidate>
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
                    <label className="block text-gray-700">Teléfono</label>
                    <input
                      type="text"
                      className={`mt-1 w-full border ${
                        formErrors.phone ? 'border-red-500' : 'border-gray-300'
                      } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600`}
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      aria-invalid={!!formErrors.phone}
                      aria-describedby="phone-error"
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-sm mt-1" id="phone-error">
                        {formErrors.phone}
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

        {/* Modal para Editar Cliente */}
        <Transition show={isEditModalOpen} enter="transition-opacity duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
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
                <h3 className="text-xl font-semibold mb-4">Editar Cliente</h3>
                <form onSubmit={submitEditClient} noValidate>
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
                    <label className="block text-gray-700">Teléfono</label>
                    <input
                      type="text"
                      className={`mt-1 w-full border ${
                        formErrors.phone ? 'border-red-500' : 'border-gray-300'
                      } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600`}
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      aria-invalid={!!formErrors.phone}
                      aria-describedby="edit-phone-error"
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-sm mt-1" id="edit-phone-error">
                        {formErrors.phone}
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
        <Transition show={isDeleteModalOpen} enter="transition-opacity duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
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
                <p className="mb-6">¿Estás seguro de que deseas eliminar a <span className="font-bold">{selectedClient?.name}</span>?</p>
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="mr-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={confirmDeleteClient}
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
  );
};

export default Clients;
