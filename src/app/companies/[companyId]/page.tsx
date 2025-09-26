// src/app/companies/[companyId]/page.tsx
"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Invoices from "./sections/Invoices";
import UploadInvoice from "./sections/UploadInvoice";
import SupplierInvoices from "./sections/SupplierInvoices";
import PaymentForecast from "./sections/PaymentForecast";
import MyTxt from "./sections/MyTxt";
import Statistics from "./sections/Statistics";

interface Props {
  params: { companyId: string };
  goBack: () => void; // función para volver a listado de empresas
}

export default function CompanyDashboard({ params, goBack }: Props) {
  const { companyId } = params;
  const [activeSection, setActiveSection] = useState<string>("invoices");

  const renderSection = () => {
    switch (activeSection) {
      case "invoices":
        return <Invoices />;
      case "upload-invoice":
        return <UploadInvoice />;
      case "supplier-invoices":
        return <SupplierInvoices />;
      case "payment-forecast":
        return <PaymentForecast />;
      case "my-txt":
        return <MyTxt />;
      case "statistics":
        return <Statistics />;
      default:
        return <Invoices />;
    }
  };

  return (
    <div className="flex flex-1">
      <Sidebar companyId={companyId} setSection={setActiveSection} goBack={goBack} />
      <main className="flex-1 p-6">{renderSection()}</main>
    </div>
  );
}
