import React, { useState } from "react";

function SessionPage() {
  const [clientId, setClientId] = useState("SBXID_008656"); // Default value
  const [clientSecret, setClientSecret] = useState("5d30dfd4-a6c9-4a6a-9526-0fc309354de8");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null); // State for error handling

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setResponse(null); // Clear previous responses

    try {
      const res = await fetch("http://localhost:5000/api/create-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clientId, clientSecret }),
      });

      if (!res.ok) {
        // Handle HTTP errors
        const errorData = await res.json();
        throw new Error(errorData.message || "An unexpected error occurred.");
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err.message); // Capture and display the error message
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
      <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-2xl space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Generate Session Token</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Client ID</label>
            <input
              type="text"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Client Secret</label>
            <input
              type="password"
              value={clientSecret}
              onChange={(e) => setClientSecret(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-700 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-800 transition"
          >
            Generate Token
          </button>
        </form>
        {response && (
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-700">API Response:</h3>
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

export default SessionPage;
