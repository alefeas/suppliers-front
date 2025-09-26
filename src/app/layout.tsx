"use client"; // necesario para usar hooks
import "./globals.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayoutFor = ["/auth"];
  const hideLayout = hideLayoutFor.some((path) => pathname.startsWith(path));

  return (
    <html lang="en">
      <head>
        <title>Suppliers Management System</title>
        <meta
          name="description"
          content="Dashboard for managing suppliers, invoices, and payments"
        />
      </head>
      <body className="flex h-screen">
        <div className="flex-1 flex flex-col">
          {!hideLayout && <Header />}
          <main className="flex-1 p-6 bg-gray-100 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
