"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import CompanyDashboard from "./companies/[companyId]/page";

import { companies } from "@/mock/companies";

export default function HomePage() {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);

  const handleSelectCompany = (companyId: string) => {
    setSelectedCompanyId(companyId);
  };

  const handleBackToCompanies = () => {
    setSelectedCompanyId(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-800">
      {!selectedCompanyId ? (
        <Sidebar selectCompany={handleSelectCompany} />
      ) : (
        <CompanyDashboard
          params={{ companyId: selectedCompanyId }}
          goBack={handleBackToCompanies} // enviamos la función para volver
        />
      )}
    </div>
  );
}
