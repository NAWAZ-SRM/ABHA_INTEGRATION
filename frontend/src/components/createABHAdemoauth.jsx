import React, { useState } from 'react';

function DemoAuthABHA() {
  const [demoData, setDemoData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    address: '',
    dateOfBirth: '',
    pincode: '',
    mobileNumber: '',
  });

  const handleChange = (e) => {
    setDemoData({ ...demoData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/demo-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(demoData),
      });
      const result = await response.json();
      console.log(result);
      alert('ABHA created successfully!');
    } catch (error) {
      console.error(error);
      alert('Error creating ABHA.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">ABHA Creation via Demo Auth</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded-lg space-y-4 w-96"
      >
        {Object.keys(demoData).map((key) => (
          <div key={key}>
            <label className="block text-gray-700 font-medium capitalize mb-2">
              {key.replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              type="text"
              name={key}
              value={demoData[key]}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition w-full"
        >
          Create ABHA
        </button>
      </form>
    </div>
  );
}

export default DemoAuthABHA;
