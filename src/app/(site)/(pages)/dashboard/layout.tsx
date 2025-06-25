'use client';
import { setLogout } from '@/redux/features/auth-slice';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FiShoppingCart, FiPackage, FiUsers, FiHome, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useDispatch } from 'react-redux';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const navItems = [
    { link: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { link: '/dashboard/products', icon: FiPackage, label: 'Products' },
    { link: '/dashboard/orders', icon: FiShoppingCart, label: 'Orders' },
    { link: '/dashboard/users', icon: FiUsers, label: 'Users' },
  ];

  const handleOptionClick = () => {
    dispatch(setLogout());
    router.push('/signin');
    toast.success('Logged out successfully');
    return;
  };

  return (
    <div className="flex h-screen bg-[#000]">
      {/* Sidebar */}
      <div
        className={`
          fixed z-40 top-0 left-0 h-full w-64 bg-[#000] border-r border-gray-700 p-4 
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:block
        `}
      >
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
            <FiShoppingCart className="text-white" size={20} />
          </div>
          <h1 className="text-xl font-bold text-white">eCommerce</h1>
        </div>

        <nav className="space-y-2">
          {navItems.map(item => (
            <Link
              key={item.link}
              href={item.link}
              onClick={() => setSidebarOpen(false)} // close on mobile tap
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                pathname === item.link
                  ? 'bg-green-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-lg"
            onClick={handleOptionClick}
          >
            <FiLogOut size={20} />
            Log out
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-auto">
        {/* Top Navbar */}
        <header className="bg-gray-900 text-white p-4 flex items-center justify-between md:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white focus:outline-none"
          >
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <div className="w-6" /> {/* Spacer */}
        </header>

        {/* Page Content */}
        <main className="flex-1  overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
