import React from 'react';

interface AdminSidebarProps {
  // Add props here
}

export const AdminSidebar: React.FC<AdminSidebarProps> = (props) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">AdminSidebar</h2>
      {/* Component content */}
    </div>
  );
};

export default AdminSidebar;
