import React from "react";

interface ModelProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Model: React.FC<ModelProps> = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Model;
