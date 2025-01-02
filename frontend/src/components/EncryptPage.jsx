import React, { useState } from "react";

function EncryptPage() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleFetchPublicKey = async () => {
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("https://abhahcx.abdm.gov.in/abha/api/v3/profile/public/certificate");
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "An error occurred while fetching the public key.");
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
      <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-2xl space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Encrypt Data</h2>
        <button
          onClick={handleFetchPublicKey}
          className="w-full bg-blue-700 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-800 transition"
        >
          Fetch Public Key
        </button>
        {response && (
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-700">Public Key:</h3>
            <pre className="text-sm bg-gray-200 p-2 rounded mt-2 overflow-auto">{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
        {error && (
          <div className="p-4 bg-red-100 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-red-700">Error:</h3>
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EncryptPage;
