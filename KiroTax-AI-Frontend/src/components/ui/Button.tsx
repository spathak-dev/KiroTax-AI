import React from 'react';

interface ButtonProps {
  // Add props here
}

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Button</h2>
      {/* Component content */}
    </div>
  );
};

export default Button;
