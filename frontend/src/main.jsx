// // import { StrictMode } from 'react'
// // import { createRoot } from 'react-dom/client'
// // import './index.css'
// // import App from './App.jsx'

// // createRoot(document.getElementById('root')).render(
// //   <StrictMode>
// //     <App/>
// //   </StrictMode>,
// // )
// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import SessionPage from "./SessionPage";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<App />} />
//         <Route path="/create-session" element={<SessionPage />} />
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// );
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import SessionPage from "./components/SessionPage";
import EncryptPage from "./components/EncryptPage";
import CreateABHAaadhar from "./components/createABHAaadhar"; // Import the new EncryptPage
import "./index.css"; // Include Tailwind CSS
import CreateABHAdl from "./components/createABHAdl";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/session" element={<SessionPage />} />
        <Route path="/encrypt" element={<EncryptPage />} /> {/* New Route */}
        <Route path="/create-abha-aadhaar" element={<CreateABHAaadhar />} />
        <Route path="/create-abha-dl" element={<CreateABHAdl />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
