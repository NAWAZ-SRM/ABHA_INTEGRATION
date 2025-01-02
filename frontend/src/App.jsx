import React from "react";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white">
      <div className="text-center space-y-6 p-8 bg-white bg-opacity-10 rounded-xl shadow-lg backdrop-blur-md">
        <h1 className="text-4xl font-extrabold">ABHA Integration Portal</h1>
      <div className="space-y-2">
        <Link to="/session">
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700">
            Generate Session Token
          </button>
        </Link>
        <Link to="/encrypt">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700">
            Encrypt Data
          </button>
        </Link>
        <Link to="/create-abha-aadhaar">
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Create ABHA Using Aadhaar
      </button>
    </Link>
    <Link to="/create-abha-dl">
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Create ABHA Using Aadhaar
      </button>
    </Link>
      </div>
    </div>
    </div>
  );
}

export default App;
