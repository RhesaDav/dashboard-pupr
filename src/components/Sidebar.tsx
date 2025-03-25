"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiFileText } from "react-icons/fi";

const Sidebar = () => {
    const path = usePathname()
  return (
    <aside className="w-64 bg-gray-900 text-gray-200 p-6 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-white">Admin Dashboard</h1>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link 
              href="/dashboard/home" 
              className={`flex items-center px-4 py-3 rounded-lg transition duration-300 ${path === "/dashboard/home" ? "bg-blue-600 text-white" : "hover:bg-gray-800 hover:text-gray-100"}`}
            >
              <FiHome className="text-lg" /> <span>Home</span>
            </Link>
          </li>
          <li>
            <Link 
              href="/dashboard/contracts" 
              className={`flex items-center px-4 py-3 rounded-lg transition duration-300 ${path === "/dashboard/contracts" ? "bg-blue-600 text-white" : "hover:bg-gray-800 hover:text-gray-100"}`}
            >
              <FiFileText className="text-lg" /> <span>Data Kontrak</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;