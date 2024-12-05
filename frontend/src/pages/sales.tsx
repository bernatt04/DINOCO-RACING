// src/pages/sales.tsx

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
  ChevronUpIcon
} from '@heroicons/react/solid';
import { Transition } from '@headlessui/react';

// Define el tipo de venta
interface Sale {
  id: number;
  client: string;
  product: string;
  amount: number;
  date: string;
}

interface SalesProps {
  userRole: UserRole | null;
  setUserRole: (role: UserRole | null) => void;
}

const Sales: React.FC<SalesProps> = ({ userRole, setUserRole }) => {
  // Estado principal
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [formData, setFormData] = useState<Omit<Sale, 'id'>>({ client: '', product: '', amount: 0, date: '' });
  const [formErrors, setFormErrors] = useState<{ client?: string; product?: string; amount?: string; date?: string }>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [salesPerPage] = useState<number>(5);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Sale; direction: 'ascending' | 'descending' } | null>(null);

  // Efecto para simular la carga de datos
  useEffect(() => {
    // Simulación de llamada a una API
    setTimeout(() => {
      setSales([
        { id: 1, client: 'Juan Pérez', product: 'Seguro de Vida', amount: 500, date: '01/04/2024' },
        { id: 2, client: 'María López', product: 'Seguro de Hogar', amount: 750, date: '05/04/2024' },
        { id: 3, client: 'Carlos Martínez', product: 'Seguro de Auto', amount: 300, date: '10/04/2024' },
        { id: 4, client: 'Ana Gómez', product: 'Seguro de Salud', amount: 600, date: '15/04/2024' },
        { id: 5, client: 'Luis Rodríguez', product: 'Seguro de Viaje', amount: 400, date: '20/04/2024' },
        { id: 6, client: 'Sofía Hernández', product: 'Seguro de Negocio', amount: 800, date: '25/04/2024' },
        { id: 7, client: 'Pedro Sánchez', product: 'Seguro de Vida', amount: 550, date: '30/04/2024' },
        { id: 8, client: 'Lucía Díaz', product: 'Seguro de Hogar', amount: 700, date: '04/05/2024' },
        { id: 9, client: 'Diego Torres', product: 'Seguro de Auto', amount: 320, date: '09/05/2024' },
        { id: 10, client: 'Valentina Ruiz', product: 'Seguro de Salud', amount: 620, date: '14/05/2024' },
        // Agrega más ventas según sea necesario
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  // Función para manejar la apertura del modal de agregar venta
  const handleAddSale = () => {
    setFormData({ client: '', product: '', amount: 0, date: '' });
    setFormErrors({});
    setIsAddModalOpen(true);
  };

  // Función para manejar la apertura del modal de editar venta
  const handleEditSale = (sale: Sale) => {
    setSelectedSale(sale);
    setFormData({ client: sale.client, product: sale.product, amount: sale.amount, date: sale.date });
    setFormErrors({});
    setIsEditModalOpen(true);
  };

  // Función para manejar la apertura del modal de eliminar venta
  const handleDeleteSale = (sale: Sale) => {
    setSelectedSale(sale);
    setIsDeleteModalOpen(true);
  };

  // Validación del formulario
  const validateForm = () => {
    const errors: { client?: string; product?: string; amount?: string; date?: string } = {};
    if (!formData.client.trim()) {
      errors.client = 'El cliente es obligatorio.';
    }
    if (!formData.product.trim()) {
      errors.product = 'El producto es obligatorio.';
    }
    if (formData.amount <= 0) {
      errors.amount = 'El monto debe ser mayor a 0.';
    }
    if (!formData.date.trim()) {
      errors.date = 'La fecha es obligatoria.';
    } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(formData.date)) {
      errors.date = 'La fecha debe tener el formato DD/MM/YYYY.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Función para agregar una nueva venta
  const submitAddSale = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const newSale: Sale = { id: Date.now(), ...formData };
      setSales([newSale, ...sales]);
      setIsAddModalOpen(false);
      setCurrentPage(1); // Volver a la primera página
    }
  };

  // Función para editar una venta existente
  const submitEditSale = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && selectedSale) {
      const updatedSale: Sale = { id: selectedSale.id, ...formData };
      setSales(sales.map(sale => (sale.id === selectedSale.id ? updatedSale : sale)));
      setIsEditModalOpen(false);
      setSelectedSale(null);
    }
  };

  // Función para confirmar la eliminación de una venta
  const confirmDeleteSale = () => {
    if (selectedSale) {
      setSales(sales.filter(sale => sale.id !== selectedSale.id));
      setIsDeleteModalOpen(false);
      setSelectedSale(null);
    }
  };

  // Función para manejar la búsqueda con debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setCurrentPage(1); // Resetear a la primera página al buscar
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Filtrado de ventas según la búsqueda
  const filteredSales = useMemo(() => {
    return sales.filter(sale =>
      sale.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sale.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sale.amount.toString().includes(searchQuery) ||
      sale.date.includes(searchQuery)
    );
  }, [sales, searchQuery]);

  // Ordenamiento de ventas
  const sortedSales = useMemo(() => {
    if (sortConfig !== null) {
      return [...filteredSales].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return filteredSales;
  }, [filteredSales, sortConfig]);

  // Paginar ventas
  const indexOfLastSale = currentPage * salesPerPage;
  const indexOfFirstSale = indexOfLastSale - salesPerPage;
  const currentSales = sortedSales.slice(indexOfFirstSale, indexOfLastSale);
  const totalPages = Math.ceil(sortedSales.length / salesPerPage);

  // Función para cambiar la página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Función para manejar el ordenamiento
  const requestSort = (key: keyof Sale) => {
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
            <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Ventas</h2>
            <div className="flex space-x-4 items-center w-full md:w-auto">
              {/* Barra de búsqueda */}
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Buscar ventas..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  aria-label="Buscar ventas"
                />
                <SearchIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>

              {/* Botón para agregar venta */}
              {userRole === 'admin' && (
                <button
                  onClick={handleAddSale}
                  className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Añadir Venta
                </button>
              )}
            </div>
          </div>

          {/* Tabla de ventas */}
          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            {loading ? (
              <div className="p-6 text-center text-gray-500">Cargando ventas...</div>
            ) : (
              <>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {/* Columna Cliente con ordenamiento */}
                      <th
                        className="py-3 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort('client')}
                      >
                        <div className="flex items-center">
                          Cliente
                          {sortConfig?.key === 'client' ? (
                            sortConfig.direction === 'ascending' ? (
                              <ChevronUpIcon className="h-4 w-4 ml-1" />
                            ) : (
                              <ChevronDownIcon className="h-4 w-4 ml-1" />
                            )
                          ) : null}
                        </div>
                      </th>

                      {/* Columna Producto con ordenamiento */}
                      <th
                        className="py-3 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort('product')}
                      >
                        <div className="flex items-center">
                          Producto
                          {sortConfig?.key === 'product' ? (
                            sortConfig.direction === 'ascending' ? (
                              <ChevronUpIcon className="h-4 w-4 ml-1" />
                            ) : (
                              <ChevronDownIcon className="h-4 w-4 ml-1" />
                            )
                          ) : null}
                        </div>
                      </th>

                      {/* Columna Monto con ordenamiento */}
                      <th
                        className="py-3 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort('amount')}
                      >
                        <div className="flex items-center">
                          Monto
                          {sortConfig?.key === 'amount' ? (
                            sortConfig.direction === 'ascending' ? (
                              <ChevronUpIcon className="h-4 w-4 ml-1" />
                            ) : (
                              <ChevronDownIcon className="h-4 w-4 ml-1" />
                            )
                          ) : null}
                        </div>
                      </th>

                      {/* Columna Fecha con ordenamiento */}
                      <th
                        className="py-3 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort('date')}
                      >
                        <div className="flex items-center">
                          Fecha
                          {sortConfig?.key === 'date' ? (
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
                    {currentSales.length > 0 ? (
                      currentSales.map(sale => (
                        <tr key={sale.id}>
                          <td className="py-4 px-6 text-sm text-gray-700">{sale.client}</td>
                          <td className="py-4 px-6 text-sm text-gray-700">{sale.product}</td>
                          <td className="py-4 px-6 text-sm text-gray-700">${sale.amount.toLocaleString()}</td>
                          <td className="py-4 px-6 text-sm text-gray-700">{sale.date}</td>
                          {userRole === 'admin' && (
                            <td className="py-4 px-6 text-sm text-gray-700 flex justify-center space-x-3">
                              {/* Botón Editar */}
                              <button
                                onClick={() => handleEditSale(sale)}
                                className="text-yellow-500 hover:text-yellow-600"
                                aria-label={`Editar venta de ${sale.client}`}
                              >
                                <PencilAltIcon className="h-5 w-5" />
                              </button>

                              {/* Botón Eliminar */}
                              <button
                                onClick={() => handleDeleteSale(sale)}
                                className="text-red-500 hover:text-red-600"
                                aria-label={`Eliminar venta de ${sale.client}`}
                              >
                                <TrashIcon className="h-5 w-5" />
                              </button>
                            </td>
                          )}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={userRole === 'admin' ? 5 : 4} className="py-4 px-6 text-center text-gray-500">
                          No se encontraron ventas.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* Paginación */}
                {totalPages > 1 && (
                  <div className="flex justify-between items-center px-6 py-3 bg-gray-50">
                    <span className="text-sm text-gray-700">
                      Mostrando <span className="font-medium">{currentSales.length}</span> de{' '}
                      <span className="font-medium">{sortedSales.length}</span> ventas
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

        {/* Modal para Agregar Venta */}
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
                <h3 className="text-xl font-semibold mb-4">Añadir Nueva Venta</h3>
                <form onSubmit={submitAddSale} noValidate>
                  <div className="mb-4">
                    <label className="block text-gray-700">Cliente</label>
                    <input
                      type="text"
                      className={`mt-1 w-full border ${
                        formErrors.client ? 'border-red-500' : 'border-gray-300'
                      } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600`}
                      value={formData.client}
                      onChange={e => setFormData({ ...formData, client: e.target.value })}
                      aria-invalid={!!formErrors.client}
                      aria-describedby="client-error"
                    />
                    {formErrors.client && (
                      <p className="text-red-500 text-sm mt-1" id="client-error">
                        {formErrors.client}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Producto</label>
                    <input
                      type="text"
                      className={`mt-1 w-full border ${
                        formErrors.product ? 'border-red-500' : 'border-gray-300'
                      } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600`}
                      value={formData.product}
                      onChange={e => setFormData({ ...formData, product: e.target.value })}
                      aria-invalid={!!formErrors.product}
                      aria-describedby="product-error"
                    />
                    {formErrors.product && (
                      <p className="text-red-500 text-sm mt-1" id="product-error">
                        {formErrors.product}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Monto</label>
                    <input
                      type="number"
                      className={`mt-1 w-full border ${
                        formErrors.amount ? 'border-red-500' : 'border-gray-300'
                      } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600`}
                      value={formData.amount}
                      onChange={e => setFormData({ ...formData, amount: Number(e.target.value) })}
                      aria-invalid={!!formErrors.amount}
                      aria-describedby="amount-error"
                    />
                    {formErrors.amount && (
                      <p className="text-red-500 text-sm mt-1" id="amount-error">
                        {formErrors.amount}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Fecha (DD/MM/YYYY)</label>
                    <input
                      type="text"
                      className={`mt-1 w-full border ${
                        formErrors.date ? 'border-red-500' : 'border-gray-300'
                      } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600`}
                      value={formData.date}
                      onChange={e => setFormData({ ...formData, date: e.target.value })}
                      placeholder="Ejemplo: 25/04/2024"
                      aria-invalid={!!formErrors.date}
                      aria-describedby="date-error"
                    />
                    {formErrors.date && (
                      <p className="text-red-500 text-sm mt-1" id="date-error">
                        {formErrors.date}
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

        {/* Modal para Editar Venta */}
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
                <h3 className="text-xl font-semibold mb-4">Editar Venta</h3>
                <form onSubmit={submitEditSale} noValidate>
                  <div className="mb-4">
                    <label className="block text-gray-700">Cliente</label>
                    <input
                      type="text"
                      className={`mt-1 w-full border ${
                        formErrors.client ? 'border-red-500' : 'border-gray-300'
                      } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600`}
                      value={formData.client}
                      onChange={e => setFormData({ ...formData, client: e.target.value })}
                      aria-invalid={!!formErrors.client}
                      aria-describedby="edit-client-error"
                    />
                    {formErrors.client && (
                      <p className="text-red-500 text-sm mt-1" id="edit-client-error">
                        {formErrors.client}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Producto</label>
                    <input
                      type="text"
                      className={`mt-1 w-full border ${
                        formErrors.product ? 'border-red-500' : 'border-gray-300'
                      } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600`}
                      value={formData.product}
                      onChange={e => setFormData({ ...formData, product: e.target.value })}
                      aria-invalid={!!formErrors.product}
                      aria-describedby="edit-product-error"
                    />
                    {formErrors.product && (
                      <p className="text-red-500 text-sm mt-1" id="edit-product-error">
                        {formErrors.product}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Monto</label>
                    <input
                      type="number"
                      className={`mt-1 w-full border ${
                        formErrors.amount ? 'border-red-500' : 'border-gray-300'
                      } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600`}
                      value={formData.amount}
                      onChange={e => setFormData({ ...formData, amount: Number(e.target.value) })}
                      aria-invalid={!!formErrors.amount}
                      aria-describedby="edit-amount-error"
                    />
                    {formErrors.amount && (
                      <p className="text-red-500 text-sm mt-1" id="edit-amount-error">
                        {formErrors.amount}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Fecha (DD/MM/YYYY)</label>
                    <input
                      type="text"
                      className={`mt-1 w-full border ${
                        formErrors.date ? 'border-red-500' : 'border-gray-300'
                      } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600`}
                      value={formData.date}
                      onChange={e => setFormData({ ...formData, date: e.target.value })}
                      placeholder="Ejemplo: 25/04/2024"
                      aria-invalid={!!formErrors.date}
                      aria-describedby="edit-date-error"
                    />
                    {formErrors.date && (
                      <p className="text-red-500 text-sm mt-1" id="edit-date-error">
                        {formErrors.date}
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
                <p className="mb-6">¿Estás seguro de que deseas eliminar la venta de <span className="font-bold">{selectedSale?.client}</span> por <span className="font-bold">${selectedSale?.amount.toLocaleString()}</span>?</p>
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="mr-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={confirmDeleteSale}
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

export default Sales;
