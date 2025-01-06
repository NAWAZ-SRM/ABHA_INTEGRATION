import express, { application } from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MILESTONE-1

// SESSION CREATION API
app.post("/api/create-session", async (req, res) => {
  const { clientId, clientSecret } = req.body;

  const requestBody = {
    clientId,
    clientSecret,
  };

  try {
    const response = await fetch("https://dev.abdm.gov.in/api/hiemcm/gateway/v3/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error fetching session token:", error);
    res.status(500).send("Internal Server Error");
  }
});

// CREATION OF ABHA ACCOUNT USING aadhaar

// STEP 1
// AADHAR OTP GENERATION API
app.post("/api/generate-otp", async (req, res) => {
  const { aadhaarNumber } = req.body;

  if (!aadhaarNumber) {
    return res.status(400).json({ error: "Aadhaar number is required" });
  }

  try {
    const response = await fetch("https://abha-sbx.abdm.gov.in/api/v2/enrollment/request/otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-request-id": "unique-request-id",
        "timestamp": new Date().toISOString(),
        "Authorization": "Bearer <session-token>", // Replace with actual session token
      },
      body: JSON.stringify({
        aadhaar: aadhaarNumber, // Replace with encrypted Aadhaar number
        scope: "abha-enroll",
        txnId: "unique-txn-id",
        otpSystem: "aadhaar",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate OTP");
    }

    const data = await response.json();
    res.json({ transactionId: data.txnId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// STEP-2
// AADHAR OTP RESEND API
app.post("/api/resend-otp", async (req, res) => {
  const { transactionId } = req.body;

  if (!transactionId) {
    return res.status(400).json({ error: "Transaction ID is required" });
  }

  try {
    const response = await fetch("https://abha-sbx.abdm.gov.in/api/v2/enrollment/request/otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-request-id": "unique-request-id",
        "timestamp": new Date().toISOString(),
        "Authorization": "Bearer <session-token>", // Replace with actual session token
      },
      body: JSON.stringify({
        txnId: transactionId,
        scope: "abha-enroll",
        otpSystem: "aadhaar",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to resend OTP");
    }

    const data = await response.json();
    res.json({ message: data.message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// step-3 abha enrollment api

app.post("/enroll-abha", async (req, res) => {
  const { transactionId, otp } = req.body;

  try {
    const response = await fetch("https://abha-sbx.abdm.gov.in/v3/enrollment/enrol/byAadhar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer YOUR_ACCESS_TOKEN`,
      },
      body: JSON.stringify({
        transactionId,
        otp,
        healthId: "Enter healthId or leave null",
        mobile: "Primary Mobile Number",
      }),
    });

    const data = await response.json();

    if (data.message === "Abha account created successfully") {
      return res.status(200).json({ message: "Abha account created successfully" });
    }

    return res.status(400).json({ message: data.message || "Error in enrollment" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// STEP - 4 MOBILE VERIFICATION API

// API Endpoint for Mobile Verification (Send OTP)
app.post("/api/send-otp", async (req, res) => {
  const { mobile } = req.body;

  try {
    const response = await axios.post("https://abha-sbx.abdm.gov.in/v3/enrollment/request/otp", {
      mobile: mobile,
      scope: "mobile.verify",
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_AUTH_TOKEN", // Replace with actual token
      },
    });

    const data = response.data;
    res.json({ txnId: data.txnId });
  } catch (error) {
    console.error("Error sending OTP to mobile:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

// API Endpoint for Verifying OTP
app.post("/api/verify-otp", async (req, res) => {
  const { txnId, otp } = req.body;

  try {
    const response = await axios.post("https://abha-sbx.abdm.gov.in/v3/enrollment/auth/byAbdm", {
      txnId: txnId,
      otp: otp,
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_AUTH_TOKEN", // Replace with actual token
      },
    });

    const data = response.data;
    if (data.status === "verified") {
      res.json({ message: "OTP verified successfully" });
    } else {
      res.status(400).json({ message: "OTP verification failed" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to verify OTP" });
  }
});

// STEP-5 EMAIL VERIFICATION

const BASE_URL = "https://abha-sbx.abdm.gov.in/v3/profile/account/request/emailVerificationLink";
const HEADERS = {
  "Content-Type": "application/json",
  TIMESTAMP: new Date().toISOString(), // This is usually dynamic
  "X-Token": "Bearer your-x-token",    // Replace with your actual token
  Authorization: "Bearer your-auth-token" // Replace with your actual auth token
};
app.post("/api/email-verification", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Make the API request to send the email verification link
    const response = await axios.post(
      BASE_URL,
      {
        scope: "abha-profile:email:link:verify",
        loginMode: "email",
        loginId: email, // Encrypted email if required
        otpSystem: "aadhaar", // Replace with actual values if required
      },
      { headers: HEADERS }
    );

    // Return success message
    res.status(200).json({
      message: "Email verification link sent successfully",
      data: response.data,
    });
  } catch (error) {
    console.error("Error sending email verification:", error.response?.data || error.message);
    res.status(500).json({
      error: "Failed to send email verification link",
      details: error.response?.data || error.message,
    });
  }
});


// STEP-6 ABHA ADDRESS SUGGESTION AND CREATION

app.get("/api/get-abha-suggestions", (req, res) => {
  res.status(200).json({ suggestions: mockAbhaSuggestions });
});

// Create ABHA Address
app.post("/api/create-abha-address", (req, res) => {
  const { abhaAddress } = req.body;
  if (!abhaAddress) {
    return res.status(400).json({ message: "ABHA address is required." });
  }
  res.status(201).json({ message: `ABHA address '${abhaAddress}' created successfully.` });
});


// CREATE ABHA USING DL
// STEP-1 API

app.post("/api/generate-otp-dl", async (req, res) => {
  const { dlNumber } = req.body;

  if (!dlNumber) {
    return res.status(400).json({ error: "Driving License Number is required" });
  }

  try {
    const response = await axios.post("https://abha-sbx.abdm.gov.in/v3/enrollment/request/otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-request-id": "unique-request-id",
        "timestamp": new Date().toISOString(),
        "Authorization": "Bearer <session-token>", // Replace with actual session token
      },
      body: JSON.stringify({
        id: dlNumber,
        idType: "dl",
        otpSystem: "mobile",
        scope: "abha-enroll",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate OTP");
    }

    const data = await response.json();
    res.json({ transactionId: data.txnId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// STEP-2 OTP VERIFICATION FOR DL CREATION API

app.post("/api/verify-otp-dl", async (req, res) => {
  const { otp, transactionId } = req.body;

  if (!otp || !transactionId) {
    return res.status(400).json({ error: "OTP and Transaction ID are required" });
  }

  try {
    const response = await fetch("https://abha-sbx.abdm.gov.in/v3/enrollment/auth/byAbdm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-request-id": "unique-request-id",
        "timestamp": new Date().toISOString(),
        "Authorization": "Bearer <session-token>", // Replace with actual session token
      },
      body: JSON.stringify({
        otp,
        txnId: transactionId,
      }),
    });

    if (!response.ok) {
      throw new Error("OTP verification failed");
    }

    const data = await response.json();
    res.json({ message: "OTP verified successfully", details: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// VERIFY DL DOCUMENTS API


const mockVerifiedDocuments = {
  dlNumber: "DL123456789",
  fullName: "John Doe",
  dob: "1990-01-01",
  address: "123 Main Street, City",
  mobileNumber: "9876543210",
};

// Endpoint for DL Document Verification
app.post("/api/verify-documents-dl", (req, res) => {
  const { transactionId, documentDetails } = req.body;

  // Validation
  if (!transactionId || !documentDetails) {
    return res.status(400).json({ error: "Transaction ID and Document Details are required." });
  }

  // Parse document details
  const { dlNumber, fullName, dob, address, mobileNumber } = documentDetails;

  // Mock verification logic (replace with actual service/API calls)
  if (
    dlNumber === mockVerifiedDocuments.dlNumber &&
    fullName === mockVerifiedDocuments.fullName &&
    dob === mockVerifiedDocuments.dob &&
    address === mockVerifiedDocuments.address &&
    mobileNumber === mockVerifiedDocuments.mobileNumber
  ) {
    const abhaNumber = "ABHA-1234-5678-9012"; // Mock generated ABHA number
    return res.status(200).json({
      transactionId,
      abhaNumber,
      status: "Document verified successfully",
    });
  } else {
    return res.status(400).json({
      error: "Document verification failed. Please check the details and try again.",
    });
  }
});

// 5 - CREATE ABHA USING DEMO AUTH

app.post('/demo-auth', async (req, res) => {
  const { firstName, lastName, gender, address, dateOfBirth, pincode, mobileNumber } = req.body;

  const requestBody = {
    demo: {
      firstName,
      lastName,
      gender,
      address,
      dateOfBirth,
      pincode,
      mobileNumber,
    },
    authMode: 'DEMOGRAPHICS',
  };

  try {
    const response = await axios.post(
      'https://<BASE_URL>/v1/abha/enrollment/demoAuth',
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer <YOUR_ACCESS_TOKEN>`,
          'X-Request-ID': '<UNIQUE_UUID>',
          timestamp: new Date().toISOString(),
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to create ABHA via Demo Auth' });
  }
});


// 9 GENERATE QQR CODE application

app.get('/generate-qr', async (req, res) => {
  try {
    const headers = {
      'REQUEST-ID': '1823589b-cb13-479d-a471-7a57df569e38', // Example value
      TIMESTAMP: new Date().toISOString(),
      'X-token': req.headers['x-token'], // Pass user's X-token
      Authorization: req.headers.authorization, // Pass user's access token
    };

    const apiResponse = await axios.get(
      'https://example.com/v3/profile/account/qrCode', // Replace with your API URL
      { headers }
    );

    res.status(200).json({ qrCode: apiResponse.data.qrCode }); // Adjust response based on API
  } catch (error) {
    console.error('Error generating QR Code:', error.message);
    res.status(500).json({ error: 'Failed to generate QR Code' });
  }
});


// 10 GET ABHA CARD 

app.get('/generate-abha-card', async (req, res) => {
  try {
    const headers = {
      'REQUEST-ID': '1823589b-cb13-479d-a471-7a57df569e38', // Replace with dynamically generated UUID
      TIMESTAMP: new Date().toISOString(),
      'X-token': req.headers['x-token'], // Pass the user's X-token
      Authorization: req.headers.authorization, // Pass the user's access token
    };

    const apiResponse = await axios.get(
      'https://example.com/abha/api/v3/profile/account/abha-card', // Replace with actual API URL
      { headers }
    );

    res.status(200).json({ abhaCard: apiResponse.data }); // Adjust based on response structure
  } catch (error) {
    console.error('Error generating ABHA Card:', error.message);
    res.status(500).json({ error: 'Failed to generate ABHA Card' });
  }
});



// SERVER PORT CONFIGURATION
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
