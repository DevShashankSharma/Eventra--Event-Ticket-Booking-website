import React from 'react';

const Modal = ({ show, onClose, formData }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-xl p-6 shadow-xl text-center space-y-4">
        <h2 className="text-2xl font-bold text-green-600">Booking Confirmed!</h2>
        <p className="text-gray-700">Thank you, <span className="font-semibold">{formData.name}</span>!</p>
        <p className="text-gray-600">🎟️ {formData.quantity} Ticket(s) Booked</p>
        <p className="text-sm text-gray-400">Confirmation will be sent to <br /> <span className="font-semibold">{formData.email}</span></p>
        <button
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
