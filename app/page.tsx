
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
const router = useRouter();
  const sendOtpEmail = async () => {
    const res = await fetch('/api/send-email-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (data.success) {
      setMessage('OTP sent to your email.');
      setToken(data.token);
      router.push(`/verify?token=${data.token}`);
    } else {
      setMessage('Failed to send OTP.');
    }
  };

  const sendOtpSms = async () => {
    const res = await fetch('/api/send-sms-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber }),
    });
    const data = await res.json();
    if (data.success) {
      setMessage('OTP sent to your phone.');
      setToken(data.token);
      router.push(`/verify?token=${data.token}`);
    } else {
      setMessage('Failed to send OTP.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Send OTP</h1>
        
        {/* Email OTP Section */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="mt-3 w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-500 transition-colors"
            onClick={sendOtpEmail}
          >
            Send OTP to Email
          </button>
        </div>

        {/* Phone OTP Section  */}

        {/* <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button
            className="mt-3 w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-500 transition-colors"
            onClick={sendOtpSms}
          >
            Send OTP to Phone
          </button>
        </div> */}

        {/* Message Display */}
        {message && (
          <p className={`mt-4 text-center font-semibold ${message.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
