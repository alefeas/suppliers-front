"use client";

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>Welcome! From here, you can create companies, manage suppliers, invoices, and payments.</p>

      <div className="mt-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
          Create Company
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded mr-2">
          Manage Suppliers
        </button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded">
          View Invoices
        </button>
      </div>
    </div>
  );
}
