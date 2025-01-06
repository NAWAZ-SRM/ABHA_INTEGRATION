import React, { useState } from 'react';
import axios from 'axios';

const GenerateQR = () => {
  const [qrCode, setQrCode] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerateQR = async () => {
    try {
      setError(null);

      // Example headers (replace with your logic)
      const headers = {
        'REQUEST-ID': '1823589b-cb13-479d-a471-7a57df569e38', // Example value, generate dynamically
        TIMESTAMP: new Date().toISOString(),
        'X-token': 'Bearer YOUR_X_TOKEN',
        'Authorization Token': 'YOUR_ACCESS_TOKEN',
      };

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v3/profile/account/qrCode`,
        { headers }
      );

      setQrCode(response.data.qrCode); // Assuming QR code is in response
    } catch (err) {
      setError('Failed to generate QR Code. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Generate QR Code</h2>
      <button
        onClick={handleGenerateQR}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Generate QR Code
      </button>
      {qrCode && (
        <div className="mt-4">
          <img src={qrCode} alt="Generated QR Code" className="border rounded-lg" />
        </div>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default GenerateQR;
