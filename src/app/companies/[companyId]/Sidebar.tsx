"use client";

import { FaArrowLeft, FaFileInvoice, FaUpload, FaUsers, FaChartLine, FaEnvelope } from "react-icons/fa";
import { companies } from "@/mock/companies";

interface SidebarProps {
  companyId: string;
  setSection: (section: string) => void;
  goBack: () => void; // función para volver al listado
}

export default function Sidebar({ companyId, setSection, goBack }: SidebarProps) {
  const company = companies.find(c => c.id === companyId);

  const sidebarItems = [
    { label: "Facturas", route: "invoices", icon: <FaFileInvoice /> },
    { label: "Subir Factura", route: "upload-invoice", icon: <FaUpload /> },
    { label: "Proveedores", route: "supplier-invoices", icon: <FaUsers /> },
    { label: "Proyección de Pagos", route: "payment-forecast", icon: <FaChartLine /> },
    { label: "Documentos TXT", route: "my-txt", icon: <FaEnvelope /> },
    { label: "Estadísticas", route: "statistics", icon: <FaChartLine /> },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-md p-4 flex flex-col">
      <button 
        className="flex items-center gap-2 mb-6 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition"
        onClick={goBack}
      >
        <FaArrowLeft /> Volver a empresas
      </button>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-1">{company?.name || "Empresa"}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Panel interno</p>
      </div>

      <nav className="flex flex-col gap-2">
        {sidebarItems.map(item => (
          <button
            key={item.label}
            onClick={() => setSection(item.route)}
            className="flex items-center gap-3 p-3 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
