import React from 'react';

interface BillListProps {
  // Add props here
}

export const BillList: React.FC<BillListProps> = (props) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">BillList</h2>
      {/* Component content */}
    </div>
  );
};

export default BillList;
