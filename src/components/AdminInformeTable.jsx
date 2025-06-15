import React from "react";
import { FaSearch, FaFileAlt, FaEdit, FaTrash } from "react-icons/fa";

const AdminInformeTable = ({
  informes,
  onEdit,
  onDelete,
  onCreate,
  searchTerm,
  setSearchTerm,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md w-full max-w-6xl mx-auto mt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-green-700 flex items-center gap-2">
          <FaFileAlt /> Lista de Informes
        </h2>
        <button
          onClick={onCreate}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full sm:w-auto"
        >
          + Nuevo Informe
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-sm mx-auto mb-6 w-full">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-600"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-[700px] w-full text-sm text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="px-4 py-3">Imagen</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Descripción</th>
              <th className="px-4 py-3">Es para</th>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {informes.map((informe) => (
              <tr
                key={informe._id}
                className="bg-gray-50 hover:bg-green-50 transition"
              >
                <td className="px-4 py-3">
                  {informe.imagen ? (
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${informe.imagen}`}
                      alt="informe"
                      className="h-12 w-12 sm:h-14 sm:w-14 object-cover rounded-md"
                    />
                  ) : (
                    <span className="text-gray-400 italic">Sin imagen</span>
                  )}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {informe.nombre}
                </td>
                <td className="px-4 py-3 text-gray-700 truncate max-w-[200px]">
                  {informe.descripcion}
                </td>
                <td className="px-4 py-3 text-gray-700">{informe.esPara}</td>
                <td className="px-4 py-3 text-gray-700">
                  {new Date(informe.fecha).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-center space-x-2">
                  <button
                    onClick={() => onEdit(informe)}
                    title="Editar"
                    className="p-2 text-white bg-yellow-500 rounded hover:bg-yellow-600 transition"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(informe._id)}
                    title="Eliminar"
                    className="p-2 text-white bg-red-600 rounded hover:bg-red-700 transition"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => onPageChange(i + 1)}
              className={`px-3 py-1 rounded text-sm ${
                currentPage === i + 1
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminInformeTable;
