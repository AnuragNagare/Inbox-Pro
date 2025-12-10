'use client';

import React, { useState, useEffect } from 'react';
import { validateApiKey, connectGmail, getAuthStatus } from '../../utils/email-api';

const CredentialValidator = ({ onValidationComplete }) => {
  const [apiKeyValid, setApiKeyValid] = useState(false);
  const [gmailConnected, setGmailConnected] = useState(false);
  const [validating, setValidating] = useState(true);
  const [status, setStatus] = useState('Validating credentials...');

  useEffect(() => {
    validateCredentials();
  }, []);

  const validateCredentials = async () => {
    setValidating(true);
    setStatus('Validating Gemini API key...');

    try {
      // Validate API Key
      const apiKeyResult = await validateApiKey();
      if (apiKeyResult.valid) {
        setApiKeyValid(true);
        setStatus('✅ API key validated. Connecting Gmail...');
        
        // Connect Gmail
        const gmailResult = await connectGmail();
        if (gmailResult.connected) {
          setGmailConnected(true);
          setStatus('✅ All credentials validated successfully!');
          
          // Wait a moment then notify parent
          setTimeout(() => {
            onValidationComplete(true);
          }, 1000);
        } else {
          // Gmail not connected - show setup instructions
          setStatus(`⚠️ Gmail connection required. Please run setup script.`);
          setGmailConnected(false);
          // Still proceed to show the app, but user will see error when trying to use Gmail
          setTimeout(() => {
            onValidationComplete(true);
          }, 3000);
        }
      } else {
        const errorMsg = apiKeyResult.message || 'API key validation failed';
        setStatus(`❌ API key validation failed: ${errorMsg}`);
        onValidationComplete(false, errorMsg);
      }
    } catch (error) {
      console.error('Validation error:', error);
      const errorMsg = error.message || 'Unable to connect to backend. Please check if the backend server is running.';
      setStatus(`❌ Error: ${errorMsg}`);
      onValidationComplete(false, errorMsg);
    } finally {
      setValidating(false);
    }
  };

  return (
    <div className="min-h-screen email-gradient flex items-center justify-center" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md text-center" data-aos="zoom-in">
        <div className="text-6xl mb-4 float">⚙️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Validating Credentials</h2>
        <div className="mb-6">
          {validating && (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          )}
          <p className="text-gray-600">{status}</p>
        </div>
        <div className="space-y-2 text-sm text-left bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Gemini API Key:</span>
            <span className={apiKeyValid ? 'text-green-600 font-bold' : 'text-gray-400'}>
              {apiKeyValid ? '✅ Valid' : '⏳ Validating...'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Gmail Connection:</span>
            <span className={gmailConnected ? 'text-green-600 font-bold' : 'text-gray-400'}>
              {gmailConnected ? '✅ Connected' : '⏳ Connecting...'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CredentialValidator;

