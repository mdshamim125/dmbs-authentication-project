import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Dashboard/Sidebar';

const DashboardLayoute = () => {
    return (
        <div className="relative min-h-screen md:flex">
        {/* Sidebar */}
        <Sidebar />
  
        {/* Outlet --> Dynamic content */}
        <div className="flex-1">
          <div className="p-5">
            <Outlet />
          </div>
        </div>
      </div>
    );
};

export default DashboardLayoute;