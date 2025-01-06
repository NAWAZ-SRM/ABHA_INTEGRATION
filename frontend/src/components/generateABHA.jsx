import React, { useState } from 'react';
import axios from 'axios';

const GenerateAbhaCard = () => {
  const [abhaCard, setAbhaCard] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerateAbhaCard = async () => {
    try {
      setError(null);

      const headers = {
        'REQUEST-ID': '1823589b-cb13-479d-a471-7a57df569e38', // Example UUID, generate dynamically
        TIMESTAMP: new Date().toISOString(),
        'X-token': 'Bearer YOUR_X_TOKEN',
        Authorization: 'YOUR_ACCESS_TOKEN',
      };

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/abha/api/v3/profile/account/abha-card`,
        { headers }
      );

      setAbhaCard(response.data.abhaCard); // Assuming ABHA card is part of the response
    } catch (err) {
      setError('Failed to generate ABHA Card. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Generate ABHA Card</h2>
      <button
        onClick={handleGenerateAbhaCard}
        className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
      >
        Generate ABHA Card
      </button>
      {abhaCard && (
        <div className="mt-4 p-4 border rounded-lg bg-white">
          <h3 className="text-lg font-semibold">ABHA Card</h3>
          <pre className="text-gray-700">{JSON.stringify(abhaCard, null, 2)}</pre>
        </div>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default GenerateAbhaCard;
