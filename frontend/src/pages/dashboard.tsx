// src/pages/dashboard.tsx

import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { UserRole } from '../constants/roles';
import {
  UserIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  ChartBarIcon,
  PlusCircleIcon,
  XIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  SearchIcon,
} from '@heroicons/react/solid';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Transition } from '@headlessui/react';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Define el tipo de actividad
interface Activity {
  id: number;
  type: 'venta' | 'cliente';
  description: string;
  date: string;
}

interface DashboardProps {
  userRole: UserRole | null;
  setUserRole: (role: UserRole | null) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userRole, setUserRole }) => {
  // Estado principal
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activitiesPerPage] = useState<number>(5);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Activity; direction: 'ascending' | 'descending' } | null>(null);

  // Datos para los gráficos
  const [salesData, setSalesData] = useState<number[]>([]);
  const [clientsData, setClientsData] = useState<number[]>([]);

  // Efecto para simular la carga de datos
  useEffect(() => {
    // Simulación de llamada a una API
    setTimeout(() => {
      setActivities([
        { id: 1, type: 'venta', description: 'Venta de Seguro de Vida a Juan Pérez', date: '01/04/2024' },
        { id: 2, type: 'cliente', description: 'Nuevo Cliente: María López', date: '03/04/2024' },
        { id: 3, type: 'venta', description: 'Venta de Seguro de Hogar a Carlos Martínez', date: '05/04/2024' },
        { id: 4, type: 'cliente', description: 'Nuevo Cliente: Ana Gómez', date: '07/04/2024' },
        { id: 5, type: 'venta', description: 'Venta de Seguro de Auto a Luis Rodríguez', date: '09/04/2024' },
        { id: 6, type: 'venta', description: 'Venta de Seguro de Salud a Sofía Hernández', date: '11/04/2024' },
        { id: 7, type: 'cliente', description: 'Nuevo Cliente: Pedro Sánchez', date: '13/04/2024' },
        { id: 8, type: 'venta', description: 'Venta de Seguro de Viaje a Lucía Díaz', date: '15/04/2024' },
        { id: 9, type: 'venta', description: 'Venta de Seguro de Negocio a Diego Torres', date: '17/04/2024' },
        { id: 10, type: 'cliente', description: 'Nuevo Cliente: Valentina Ruiz', date: '19/04/2024' },
        // Agrega más actividades según sea necesario
      ]);

      // Simulación de datos para los gráficos
      setSalesData([500, 750, 300, 600, 400, 800, 550, 700, 320, 620]);
      setClientsData([10, 15, 12, 18, 14, 20, 16, 19, 13, 21]);

      setLoading(false);
    }, 1500);
  }, []);

  // Filtrado de actividades según la búsqueda
  const filteredActivities = useMemo(() => {
    return activities.filter(activity =>
      activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.date.includes(searchQuery)
    );
  }, [activities, searchQuery]);

  // Ordenamiento de actividades
  const sortedActivities = useMemo(() => {
    if (sortConfig !== null) {
      return [...filteredActivities].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return filteredActivities;
  }, [filteredActivities, sortConfig]);

  // Paginación
  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
  const currentActivities = sortedActivities.slice(indexOfFirstActivity, indexOfLastActivity);
  const totalPages = Math.ceil(sortedActivities.length / activitiesPerPage);

  // Función para cambiar la página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Función para manejar el ordenamiento
  const requestSort = (key: keyof Activity) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Datos para los gráficos
  const lineChartData = {
    labels: Array.from({ length: salesData.length }, (_, i) => `Mes ${i + 1}`),
    datasets: [
      {
        label: 'Ventas',
        data: salesData,
        fill: false,
        backgroundColor: '#3b82f6',
        borderColor: '#3b82f6',
      },
      {
        label: 'Clientes',
        data: clientsData,
        fill: false,
        backgroundColor: '#10b981',
        borderColor: '#10b981',
      },
    ],
  };

  const barChartData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Ingresos',
        data: [3000, 4000, 3500, 5000, 4500, 6000],
        backgroundColor: '#f43f5e',
      },
      {
        label: 'Gastos',
        data: [2000, 2500, 2200, 3000, 2700, 3500],
        backgroundColor: '#f59e0b',
      },
    ],
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
          {/* Título */}
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>

          {/* Tarjetas de resumen */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Tarjeta de Clientes */}
            <div className="flex items-center bg-white p-6 rounded-lg shadow">
              <UserIcon className="h-12 w-12 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Clientes</p>
                <p className="text-2xl font-semibold text-gray-800">150</p>
              </div>
            </div>

            {/* Tarjeta de Ventas */}
            <div className="flex items-center bg-white p-6 rounded-lg shadow">
              <ShoppingCartIcon className="h-12 w-12 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Ventas</p>
                <p className="text-2xl font-semibold text-gray-800">75</p>
              </div>
            </div>

            {/* Tarjeta de Ingresos */}
            <div className="flex items-center bg-white p-6 rounded-lg shadow">
              <CurrencyDollarIcon className="h-12 w-12 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Ingresos</p>
                <p className="text-2xl font-semibold text-gray-800">$45,000</p>
              </div>
            </div>

            {/* Tarjeta de Crecimiento */}
            <div className="flex items-center bg-white p-6 rounded-lg shadow">
              <ChartBarIcon className="h-12 w-12 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Crecimiento</p>
                <p className="text-2xl font-semibold text-gray-800">20%</p>
              </div>
            </div>
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Gráfico de Ventas y Clientes */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Ventas y Clientes</h3>
              <Line data={lineChartData} />
            </div>

            {/* Gráfico de Ingresos vs Gastos */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Ingresos vs Gastos</h3>
              <Bar data={barChartData} />
            </div>
          </div>

          {/* Actividades Recientes */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Actividades Recientes</h3>

            {/* Barra de búsqueda */}
            <div className="mb-4">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Buscar actividades..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                aria-label="Buscar actividades"
              />
              <SearchIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3 pointer-events-none" />
            </div>

            {/* Tabla de actividades */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {/* Columna Tipo con ordenamiento */}
                    <th
                      className="py-3 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('type')}
                    >
                      <div className="flex items-center">
                        Tipo
                        {sortConfig?.key === 'type' ? (
                          sortConfig.direction === 'ascending' ? (
                            <ChevronUpIcon className="h-4 w-4 ml-1" />
                          ) : (
                            <ChevronDownIcon className="h-4 w-4 ml-1" />
                          )
                        ) : null}
                      </div>
                    </th>

                    {/* Columna Descripción con ordenamiento */}
                    <th
                      className="py-3 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('description')}
                    >
                      <div className="flex items-center">
                        Descripción
                        {sortConfig?.key === 'description' ? (
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentActivities.length > 0 ? (
                    currentActivities.map(activity => (
                      <tr key={activity.id}>
                        <td className="py-4 px-6 text-sm text-gray-700 capitalize">
                          {activity.type === 'venta' ? (
                            <span className="flex items-center text-red-500">
                              <CurrencyDollarIcon className="h-5 w-5 mr-1" />
                              Venta
                            </span>
                          ) : (
                            <span className="flex items-center text-green-500">
                              <UserIcon className="h-5 w-5 mr-1" />
                              Cliente
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-700">{activity.description}</td>
                        <td className="py-4 px-6 text-sm text-gray-700">{activity.date}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="py-4 px-6 text-center text-gray-500">
                        No se encontraron actividades.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-6">
                <span className="text-sm text-gray-700">
                  Mostrando <span className="font-medium">{currentActivities.length}</span> de{' '}
                  <span className="font-medium">{sortedActivities.length}</span> actividades
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
