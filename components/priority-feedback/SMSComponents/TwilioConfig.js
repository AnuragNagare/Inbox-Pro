'use client';

import React, { useState, useEffect } from 'react';

const TwilioConfig = ({ onConfigSave, initialSid = '', initialToken = '' }) => {
  const [accountSid, setAccountSid] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSid = localStorage.getItem('twilio_account_sid') || initialSid;
      const savedToken = localStorage.getItem('twilio_auth_token') || initialToken;
      setAccountSid(savedSid);
      setAuthToken(savedToken);
    }
  }, [initialSid, initialToken]);

  const handleSave = () => {
    if (!accountSid || !authToken) {
      setError('❌ Please enter both Account SID and Auth Token');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('twilio_account_sid', accountSid);
        localStorage.setItem('twilio_auth_token', authToken);
      }
      
      if (onConfigSave) {
        onConfigSave(accountSid, authToken);
      }
      
      setSuccess('✅ Twilio credentials saved successfully!');
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      setError(`❌ Error saving credentials: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <h3 className="font-semibold text-blue-800 mb-2">📋 Twilio Configuration</h3>
        <p className="text-sm text-blue-700">
          Enter your Twilio Account SID and Auth Token to enable SMS sending. 
          These credentials are stored locally in your browser and sent to the backend when sending SMS messages.
        </p>
      </div>

      {success && (
        <div className="p-4 bg-green-50 text-green-800 rounded-lg border border-green-200">
          <p className="font-semibold">{success}</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 text-red-800 rounded-lg border border-red-200">
          <p className="font-semibold">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            🔑 Account SID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={accountSid}
            onChange={(e) => setAccountSid(e.target.value)}
            placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Your Twilio Account SID (starts with AC)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            🔐 Auth Token <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            value={authToken}
            onChange={(e) => setAuthToken(e.target.value)}
            placeholder="Your Twilio Auth Token"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Your Twilio Auth Token (keep this secret!)</p>
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={handleSave}
          disabled={loading}
          className="gradient text-white font-bold rounded-full px-8 py-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '💾 Saving...' : '💾 Save Twilio Credentials'}
        </button>
      </div>

      {accountSid && authToken && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Status:</span> Credentials configured
            {accountSid && <span className="ml-2">✓ SID: {accountSid.substring(0, 10)}...</span>}
          </p>
        </div>
      )}
    </div>
  );
};

export default TwilioConfig;

