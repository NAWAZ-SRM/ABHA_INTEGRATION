// import React, { useState } from "react";

// const CreateABHAaadhar = () => {
//   const [aadhaarNumber, setAadhaarNumber] = useState("");
//   const [otp, setOtp] = useState("");
//   const [transactionId, setTransactionId] = useState("");
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [email, setEmail] = useState("");
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [error, setError] = useState(null);

//   const handleGenerateOtp = async () => {
//     setError(null);
//     try {
//       const response = await fetch("http://localhost:3000/api/generate-otp", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           aadhaarNumber,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to generate OTP");
//       }

//       const data = await response.json();
//       setTransactionId(data.transactionId);
//       alert(`OTP sent to Aadhaar-linked mobile number. Transaction ID: ${data.transactionId}`);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleResendOtp = async () => {
//     setError(null);
//     try {
//       const response = await fetch("http://localhost:3000/api/resend-otp", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           transactionId,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to resend OTP");
//       }

//       const data = await response.json();
//       alert(`OTP resent to Aadhaar-linked mobile number. Message: ${data.message}`);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleVerifyAndEnroll = async () => {
//     setError(null);
//     setSuccessMessage(null);
//     try {
//       const response = await fetch("http://localhost:3000/api/enroll-abha", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           transactionId,
//           otp,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to enroll ABHA");
//       }

//       const data = await response.json();
//       if (data.message === "Abha account created successfully") {
//         setSuccessMessage("ABHA account created successfully!");
//       } else {
//         throw new Error(data.message || "Error in enrollment");
//       }
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleMobileVerification = async () => {
//     setError(null);
//     try {
//       const response = await fetch("http://localhost:3000/api/mobile-verification", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           mobileNumber,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to verify mobile number");
//       }

//       const data = await response.json();
//       setTransactionId(data.transactionId);
//       alert(`Mobile verification OTP sent. Transaction ID: ${data.transactionId}`);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleEmailVerification = async () => {
//     setError(null);
//     try {
//       const response = await fetch("http://localhost:3000/api/email-verification", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to send email verification link");
//       }

//       const data = await response.json();
//       alert(`Email verification link sent successfully: ${data.message}`);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Create ABHA Using Aadhaar</h2>
        
//         {/* Aadhaar Number Input */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aadhaarNumber">
//             Aadhaar Number
//           </label>
//           <input
//             type="text"
//             id="aadhaarNumber"
//             value={aadhaarNumber}
//             onChange={(e) => setAadhaarNumber(e.target.value)}
//             placeholder="Enter Aadhaar Number"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>

//         {/* Generate OTP Button */}
//         <button
//           onClick={handleGenerateOtp}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
//         >
//           Generate OTP
//         </button>

//         {/* Mobile Number Input */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNumber">
//             Mobile Number (if not Aadhaar-linked)
//           </label>
//           <input
//             type="text"
//             id="mobileNumber"
//             value={mobileNumber}
//             onChange={(e) => setMobileNumber(e.target.value)}
//             placeholder="Enter Mobile Number"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>

//         <button
//           onClick={handleMobileVerification}
//           className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
//         >
//           Verify Mobile
//         </button>

//         {/* Email Verification */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//             Email Address
//           </label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter Email Address"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>

//         <button
//           onClick={handleEmailVerification}
//           className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
//         >
//           Verify Email
//         </button>

//         {/* OTP and Enrollment */}
//         {transactionId && (
//           <>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
//                 Enter OTP
//               </label>
//               <input
//                 type="text"
//                 id="otp"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 placeholder="Enter OTP"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               />
//             </div>
//             <button
//               onClick={handleVerifyAndEnroll}
//               className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Verify & Enroll ABHA
//             </button>
//           </>
//         )}

//         {/* Success and Error Messages */}
//         {successMessage && <p className="text-green-500 text-xs italic mt-4">{successMessage}</p>}
//         {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default CreateABHAaadhar;



import React, { useState } from "react";

const CreateABHAaadhar = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState(null);

  const [useAadhaarLinkedNumber, setUseAadhaarLinkedNumber] = useState(true);
  const [mobile, setMobile] = useState("");
  const [mobileVerified, setMobileVerified] = useState(false);

  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);

  const [abhaSuggestions, setAbhaSuggestions] = useState([]);
  const [selectedAbhaAddress, setSelectedAbhaAddress] = useState("");
  const [customAbhaAddress, setCustomAbhaAddress] = useState("");
  const [isAbhaPopupOpen, setIsAbhaPopupOpen] = useState(false);

  const [successMessage, setSuccessMessage] = useState(null);

  // Generate OTP for Aadhaar-linked mobile
  const handleGenerateAadhaarOtp = async () => {
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/generate-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aadhaarNumber }),
      });

      if (!response.ok) throw new Error("Failed to generate OTP");

      const data = await response.json();
      setTransactionId(data.transactionId);
      alert(`OTP sent to Aadhaar-linked mobile number. Transaction ID: ${data.transactionId}`);
    } catch (err) {
      setError(err.message);
    }
  };

  // Verify OTP for Aadhaar-linked mobile
  const handleVerifyAadhaarOtp = async () => {
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/verify-aadhaar-mobile-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionId, otp }),
      });

      if (!response.ok) throw new Error("Failed to verify Aadhaar-linked mobile");

      setMobileVerified(true);
      alert("Aadhaar-linked mobile verification successful!");
    } catch (err) {
      setError(err.message);
    }
  };

  // Generate OTP for custom mobile number
  const handleGenerateCustomMobileOtp = async () => {
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/generate-custom-mobile-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });

      if (!response.ok) throw new Error("Failed to generate OTP for custom mobile");

      const data = await response.json();
      setTransactionId(data.transactionId);
      alert(`OTP sent to custom mobile number: ${mobile}`);
    } catch (err) {
      setError(err.message);
    }
  };

  // Verify OTP for custom mobile
  const handleVerifyCustomMobileOtp = async () => {
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/verify-custom-mobile-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionId, otp, mobile }),
      });

      if (!response.ok) throw new Error("Failed to verify custom mobile");

      setMobileVerified(true);
      alert("Custom mobile verification successful!");
    } catch (err) {
      setError(err.message);
    }
  };

  // Generate email verification link
  const handleGenerateEmailVerification = async () => {
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/generate-email-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("Failed to generate email verification link");

      alert("Email verification link sent successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch ABHA address suggestions
  const handleFetchAbhaSuggestions = async () => {
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/get-abha-suggestions", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to fetch ABHA address suggestions");

      const data = await response.json();
      setAbhaSuggestions(data.suggestions);
      setIsAbhaPopupOpen(true);
    } catch (err) {
      setError(err.message);
    }
  };

  // Create ABHA address
  const handleCreateAbhaAddress = async () => {
    setError(null);
    try {
      const abhaAddress = customAbhaAddress || selectedAbhaAddress;
      const response = await fetch("http://localhost:3000/api/create-abha-address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ abhaAddress, transactionId }),
      });

      if (!response.ok) throw new Error("Failed to create ABHA address");

      setSuccessMessage("ABHA address created successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create ABHA Account</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}

      {/* Aadhaar Number Section */}
      <div className="mb-6">
        <label htmlFor="aadhaarNumber" className="block font-medium text-gray-700 mb-2">
          Aadhaar Number:
        </label>
        <input
          type="text"
          id="aadhaarNumber"
          value={aadhaarNumber}
          onChange={(e) => setAadhaarNumber(e.target.value)}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          type="button"
          onClick={handleGenerateAadhaarOtp}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Generate OTP
        </button>
      </div>

      {/* OTP Verification Section */}
      <div className="mb-6">
        <label htmlFor="otp" className="block font-medium text-gray-700 mb-2">
          OTP:
        </label>
        <input
          type="text"
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          type="button"
          onClick={handleVerifyAadhaarOtp}
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Verify OTP
        </button>
      </div>

      {/* Custom Mobile Number Section */}
      <div className="mb-6">
        <label htmlFor="mobile" className="block font-medium text-gray-700 mb-2">
          Custom Mobile Number:
        </label>
        <input
          type="text"
          id="mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          type="button"
          onClick={handleGenerateCustomMobileOtp}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Generate OTP
        </button>
        <button
          type="button"
          onClick={handleVerifyCustomMobileOtp}
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 ml-2"
        >
          Verify OTP
        </button>
      </div>

      {/* Email Verification Section */}
      <div className="mb-6">
        <label htmlFor="email" className="block font-medium text-gray-700 mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          type="button"
          onClick={handleGenerateEmailVerification}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Send Verification Link
        </button>
      </div>

      {/* ABHA Suggestions and Creation */}
      <div className="mb-6">
        <button
          type="button"
          onClick={handleFetchAbhaSuggestions}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Get ABHA Suggestions
        </button>

        {isAbhaPopupOpen && (
          <div className="mt-4 p-4 bg-white shadow-lg rounded-md">
            <h3 className="text-lg font-bold mb-2 text-gray-800">Suggested ABHA Addresses:</h3>
            {abhaSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setSelectedAbhaAddress(suggestion)}
                className={`block px-4 py-2 mb-2 rounded-md shadow-sm ${
                  selectedAbhaAddress === suggestion
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <label htmlFor="customAbhaAddress" className="block font-medium text-gray-700 mt-4 mb-2">
          Custom ABHA Address:
        </label>
        <input
          type="text"
          id="customAbhaAddress"
          value={customAbhaAddress}
          onChange={(e) => setCustomAbhaAddress(e.target.value)}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          type="button"
          onClick={handleCreateAbhaAddress}
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Create ABHA Address
        </button>
      </div>
    </div>
  );
};
export default CreateABHAaadhar;
