import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import AdminInformeTable from "../../components/AdminInformeTable";
import AdminEditInformeModal from "../../components/AdminEditInformeModal";
import senaLogo from "../../assets/logogreen.png";

const Informes = () => {
  const [informes, setInformes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedInforme, setSelectedInforme] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const itemsPerPage = 5;

  const fetchInformes = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/informes`);
      setInformes(data);
    } catch {
      toast.error("Error al obtener informes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInformes();
  }, []);

  const eliminarInforme = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el informe permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/informes/${id}`);
        setInformes((prev) => prev.filter((x) => x._id !== id));
        toast.success("Informe eliminado correctamente");
      } catch {
        toast.error("Error al eliminar informe");
      }
    }
  };

  const openEditModal = (informe) => {
    setSelectedInforme(informe);
    setIsEditing(true);
    setShowModal(true);
  };

  const openCreateModal = () => {
    setSelectedInforme({
      nombre: "",
      descripcion: "",
      esPara: "",
      imagen: null,
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      const form = new FormData();
      form.append("nombre", selectedInforme.nombre);
      form.append("descripcion", selectedInforme.descripcion);
      form.append("esPara", selectedInforme.esPara);
      if (selectedInforme.imagen instanceof File) {
        form.append("imagen", selectedInforme.imagen);
      }
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/informes/${selectedInforme._id}`,
        form
      );
      setInformes((prev) =>
        prev.map((x) => (x._id === data.informe._id ? data.informe : x))
      );
      toast.success("Informe actualizado correctamente");
      setShowModal(false);
    } catch {
      toast.error("Error al actualizar informe");
    }
  };

  const handleCreateInforme = async () => {
    try {
      const form = new FormData();
      form.append("nombre", selectedInforme.nombre);
      form.append("descripcion", selectedInforme.descripcion);
      form.append("esPara", selectedInforme.esPara);
      if (selectedInforme.imagen instanceof File) {
        form.append("imagen", selectedInforme.imagen);
      }
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/informes`,
        form
      );
      setInformes((prev) => [...prev, data.informe]);
      toast.success("Informe creado exitosamente");
      setShowModal(false);
    } catch {
      toast.error("Error al crear informe");
    }
  };

  const filtered = informes.filter((i) =>
    i.nombre.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Cargando informes...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Cabecera */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 mb-6 flex items-center">
        <img src={senaLogo} alt="SENA Logo" className="h-10 mr-4" />
        <h1 className="text-2xl font-bold text-green-700">
          Gestión de Informes
        </h1>
      </div>

      {/* Tabla y buscador */}
      <AdminInformeTable
        informes={paginated}
        onEdit={openEditModal}
        onDelete={eliminarInforme}
        onCreate={openCreateModal}
        searchTerm={search}
        setSearchTerm={(val) => {
          setSearch(val);
          setCurrentPage(1);
        }}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Modal */}
      {showModal && selectedInforme && (
        <AdminEditInformeModal
          informe={selectedInforme}
          onClose={() => setShowModal(false)}
          onChange={setSelectedInforme}
          onSave={handleSaveChanges}
          onCreate={handleCreateInforme}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

export default Informes;
