'use client';

import React, { useState } from 'react';
import { sendEmail as sendEmailAPI, getApiUrl } from '../../utils/email-api';

const EmailComposer = () => {
  const [toEmail, setToEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const sendEmail = async () => {
    setError('');
    setSuccess('');

    // Validation
    if (!toEmail || !subject || !body) {
      setError('❌ Please fill in all fields: To, Subject, and Body');
      return;
    }

    if (!validateEmail(toEmail)) {
      setError(`❌ Invalid email address: ${toEmail}`);
      return;
    }

    setLoading(true);

    try {
      const data = await sendEmailAPI(toEmail, subject, body);

      setSuccess(data.message || `✅ Email sent successfully!${data.message_id ? ` Message ID: ${data.message_id}` : ''}`);
      setToEmail('');
      setSubject('');
      setBody('');

      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      console.error('Error sending email:', err);
      const apiUrl = getApiUrl();
      
      let errorMsg = `❌ Error: ${err.message}\n\n`;
      
      if (err.message.includes('Gmail not connected') || err.message.includes('OAuth flow')) {
        errorMsg += `🔧 **Setup Required:**\n\n`;
        errorMsg += `Gmail OAuth needs to be completed. Please:\n\n`;
        errorMsg += `1. Open terminal in backend directory:\n`;
        errorMsg += `   cd "D:\\Inbox Pro\\Codes\\backend"\n\n`;
        errorMsg += `2. Run the setup script:\n`;
        errorMsg += `   python setup_gmail_oauth.py\n\n`;
        errorMsg += `3. Complete OAuth flow in the browser window\n`;
        errorMsg += `4. Restart the backend server\n`;
        errorMsg += `5. Refresh this page\n\n`;
        errorMsg += `💡 See SETUP_INSTRUCTIONS.md for detailed steps.`;
      } else {
        errorMsg += `💡 Backend is running on ${apiUrl}. Check the backend logs for details.`;
      }
      
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6" data-aos="fade-up" data-aos-duration="800">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">📤 Send Real Email via Gmail</h2>
        <p className="text-gray-600">Send emails directly through Gmail API with OAuth 2.0 authentication</p>
      </div>

      {/* Backend Status */}
      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-sm text-green-800">
          ✅ <strong>Backend Connected:</strong> Server running on <code className="bg-green-100 px-2 py-1 rounded">http://localhost:9000</code>
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-lg border border-green-200">
          <div className="flex items-center">
            <span className="text-2xl mr-3">✅</span>
            <div>
              <p className="font-semibold">{success}</p>
              <p className="text-sm mt-1">Your email has been sent through Gmail!</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-lg border border-red-200">
          <div className="flex items-center">
            <span className="text-2xl mr-3">❌</span>
            <div className="whitespace-pre-line">{error}</div>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={toEmail}
            onChange={(e) => setToEmail(e.target.value)}
            placeholder="recipient@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Email subject line"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Body <span className="text-red-500">*</span>
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your email message here..."
            rows="10"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y"
            required
          />
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="text-sm text-gray-500">
            <p>💡 <strong>Tip:</strong> Credentials are validated and ready to use</p>
          </div>
          <button
            onClick={sendEmail}
            disabled={loading}
            className="gradient text-white font-bold rounded-full px-8 py-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '📤 Sending...' : '📧 Send Email via Gmail'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailComposer;

