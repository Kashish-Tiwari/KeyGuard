'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; 

export default function Verify() {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const searchParams = useSearchParams(); 

  useEffect(() => {
    const tokenFromQuery = searchParams.get('token');
    if (tokenFromQuery) {
      setToken(tokenFromQuery);
    }
  }, [searchParams]);

  const verifyOtp = async () => {
    const res = await fetch('/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ otp, token }),
    });
    const data = await res.json();
    if (data.success) {
      setMessage('OTP verification successful!');
    } else {
      setMessage('Invalid OTP or expired token.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Verify OTP</h1>
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button
          className="mt-3 w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-500 transition-colors"
          onClick={verifyOtp}
        >
          Verify OTP
        </button>
        {message && (
          <p className={`mt-4 text-center font-semibold ${message.includes('Invalid') ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
