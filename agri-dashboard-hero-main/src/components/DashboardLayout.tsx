
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(!isSidebarOpen)}
                  className="mr-4 md:hidden"
                >
                  <Menu className="h-6 w-6" />
                </Button>
                <h1 className="text-2xl font-bold text-krishi-600">KrishiShakti</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Gunjan</span>
                <div className="h-8 w-8 rounded-full bg-krishi-500 text-white flex items-center justify-center">
                  G
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;