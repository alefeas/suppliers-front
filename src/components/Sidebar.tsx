"use client";

import { companies } from "@/mock/companies";

interface GlobalSidebarProps {
  selectCompany: (id: string) => void;
}

export default function GlobalSidebar({ selectCompany }: GlobalSidebarProps) {
  return (
    <aside className="w-64 min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-md p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-4">Mis Empresas</h2>

      <div className="flex flex-col gap-2">
        {companies.map((company) => (
          <button
            key={company.id}
            onClick={() => selectCompany(company.id)}
            className="p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {company.name}
          </button>
        ))}
      </div>

      <div className="mt-auto">
        <button className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
          Crear empresa
        </button>
        <button className="w-full mt-2 p-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
          Unirse a empresa
        </button>
      </div>
    </aside>
  );
}
