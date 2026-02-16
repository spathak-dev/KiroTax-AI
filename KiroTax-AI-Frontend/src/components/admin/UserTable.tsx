import React from 'react';

interface UserTableProps {
  // Add props here
}

export const UserTable: React.FC<UserTableProps> = (props) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">UserTable</h2>
      {/* Component content */}
    </div>
  );
};

export default UserTable;
