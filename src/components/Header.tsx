"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaBell, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Header() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([
    "New supplier added",
    "Invoice #123 approved",
    "Payment received from client",
  ]);

  const router = useRouter();

  // Refs para clicks fuera
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const notifMenuRef = useRef<HTMLDivElement | null>(null);

  // Toggle menús
  const toggleUserMenu = () => {
    setUserMenuOpen((s) => {
      if (!s) setNotifMenuOpen(false);
      return !s;
    });
  };

  const toggleNotifMenu = () => {
    setNotifMenuOpen((s) => {
      if (!s) setUserMenuOpen(false);
      return !s;
    });
  };

  // Borrar notificación individual
  const removeNotification = (index: number) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  // Logout
  const handleLogout = () => {
    // Borrar token
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    // Redirigir a auth
    router.push("/auth");
  };

  // Cierra menús al click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const t = event.target as Node;
      if (userMenuRef.current && !userMenuRef.current.contains(t)) {
        setUserMenuOpen(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(t)) {
        setNotifMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between bg-white shadow p-4 select-none dark:bg-gray-900 dark:text-gray-100">
      {/* Logo / Título */}
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" className="h-8 w-8" />
        <span className="font-bold text-lg">Suppliers Management System</span>
      </div>

      {/* Menú derecho */}
      <div className="flex items-center space-x-4 relative">
        {/* Notificaciones */}
        <div className="relative" ref={notifMenuRef}>
          <button
            type="button"
            className="relative cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 transition-colors focus:outline-none"
            onClick={toggleNotifMenu}
          >
            <FaBell size={24} />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>

          {notifMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-50 animate-fadeIn">
              {notifications.length === 0 ? (
                <div className="p-2 text-gray-500 text-sm text-center dark:text-gray-300">
                  No notifications
                </div>
              ) : (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {notifications.map((notif, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => console.log(`Clicked: ${notif}`)}
                    >
                      <span>{notif}</span>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-red-500 transition-colors focus:outline-none"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNotification(index);
                        }}
                      >
                        <FaTimes />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Menú usuario */}
        <div className="relative" ref={userMenuRef}>
          <button
            type="button"
            className="cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 transition-colors focus:outline-none"
            onClick={toggleUserMenu}
          >
            <FaUserCircle size={28} />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-50 animate-fadeIn">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  Profile
                </li>
                <li className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  Edit Profile
                </li>
                <li className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  Settings
                </li>
                <li className="p-2">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left text-red-500 hover:text-red-600"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
