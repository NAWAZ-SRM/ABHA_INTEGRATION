

// import React, { useState } from "react";

// const CreateABHAdl = () => {
//   const [dlNumber, setDlNumber] = useState("");
//   const [otp, setOtp] = useState("");
//   const [transactionId, setTransactionId] = useState("");
//   const [error, setError] = useState(null);

//   // Function to handle OTP generation
//   const handleGenerateOtp = async () => {
//     setError(null);
//     try {
//       const response = await fetch("http://localhost:3000/api/generate-otp-dl", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           dlNumber,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to generate OTP");
//       }

//       const data = await response.json();
//       setTransactionId(data.transactionId);
//       alert(`OTP sent to linked mobile number. Transaction ID: ${data.transactionId}`);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   // Function to handle OTP verification
//   const handleVerifyOtp = async () => {
//     setError(null);
//     try {
//       const response = await fetch("http://localhost:3000/api/verify-otp-dl", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           otp,
//           transactionId,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("OTP verification failed");
//       }

//       const data = await response.json();
//       alert("OTP verified successfully! Details updated in the transaction table.");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Create ABHA Using Driving License</h2>

//         {/* Driving License Number */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dlNumber">
//             Driving License Number
//           </label>
//           <input
//             type="text"
//             id="dlNumber"
//             value={dlNumber}
//             onChange={(e) => setDlNumber(e.target.value)}
//             placeholder="Enter Driving License Number"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>

//         {/* Generate OTP Button */}
//         <button
//           onClick={handleGenerateOtp}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
//         >
//           Generate OTP
//         </button>

//         {/* OTP Input */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
//             Enter OTP
//           </label>
//           <input
//             type="text"
//             id="otp"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             placeholder="Enter the OTP"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>

//         {/* Verify OTP Button (Always Enabled) */}
//         <button
//           onClick={handleVerifyOtp}
//           className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
//         >
//           Verify OTP
//         </button>

//         {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default CreateABHAdl;


import React, { useState } from "react";

const CreateABHAdl = () => {
  const [dlNumber, setDlNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [documentDetails, setDocumentDetails] = useState("");
  const [error, setError] = useState(null);

  // Function to handle OTP generation
  const handleGenerateOtp = async () => {
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/generate-otp-dl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dlNumber,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate OTP");
      }

      const data = await response.json();
      setTransactionId(data.transactionId);
      alert(`OTP sent to linked mobile number. Transaction ID: ${data.transactionId}`);
    } catch (err) {
      setError(err.message);
    }
  };

  // Function to handle OTP verification
  const handleVerifyOtp = async () => {
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/verify-otp-dl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp,
          transactionId,
        }),
      });

      if (!response.ok) {
        throw new Error("OTP verification failed");
      }

      const data = await response.json();
      alert("OTP verified successfully! Proceeding to document verification.");
    } catch (err) {
      setError(err.message);
    }
  };

  // Function to handle DL document verification
  const handleVerifyDocuments = async () => {
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/verify-documents-dl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transactionId,
          documentDetails,
        }),
      });

      if (!response.ok) {
        throw new Error("Document verification failed");
      }

      const data = await response.json();
      alert(`Document verified successfully! ABHA number generated: ${data.abhaNumber}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Create ABHA Using Driving License</h2>

        {/* Driving License Number */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dlNumber">
            Driving License Number
          </label>
          <input
            type="text"
            id="dlNumber"
            value={dlNumber}
            onChange={(e) => setDlNumber(e.target.value)}
            placeholder="Enter Driving License Number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Generate OTP Button */}
        <button
          onClick={handleGenerateOtp}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
        >
          Generate OTP
        </button>

        {/* OTP Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
            Enter OTP
          </label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter the OTP"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Verify OTP Button */}
        <button
          onClick={handleVerifyOtp}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
        >
          Verify OTP
        </button>

        {/* Document Verification */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="documentDetails">
            Document Details
          </label>
          <input
            type="text"
            id="documentDetails"
            value={documentDetails}
            onChange={(e) => setDocumentDetails(e.target.value)}
            placeholder="Enter Document Details"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button
          onClick={handleVerifyDocuments}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Verify DL Documents
        </button>

        {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default CreateABHAdl;
