'use client';

import React, { useState } from 'react';
import { addSMSContact } from '../../../utils/priority-feedback-api';

const AddSMSContact = ({ campaigns, onContactAdded }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [contactName, setContactName] = useState('');
  const [selectedCampaignId, setSelectedCampaignId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validatePhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 15;
  };

  const formatPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length >= 10) {
      if (cleaned.length === 11 && cleaned.startsWith('1')) {
        return `+${cleaned}`;
      }
      if (cleaned.length === 10) {
        return `+1${cleaned}`;
      }
      return cleaned.startsWith('+') ? cleaned : `+${cleaned}`;
    }
    return phone;
  };

  const addContact = async () => {
    if (!phoneNumber || !contactName || !selectedCampaignId) {
      setError('❌ Please fill in all fields: Phone Number, Name, and Campaign');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError(`❌ Invalid phone number. Please enter a valid phone number (10-15 digits)`);
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formattedPhone = formatPhoneNumber(phoneNumber);
      const data = await addSMSContact(parseInt(selectedCampaignId), formattedPhone, contactName);
      
      setSuccess(`✅ Contact ${contactName} (${formattedPhone}) added to SMS campaign!`);
      setPhoneNumber('');
      setContactName('');
      setSelectedCampaignId('');
      
      if (onContactAdded) {
        onContactAdded();
      }
      
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      console.error('Error adding SMS contact:', err);
      setError(`❌ Error: ${err.message}. Make sure the backend server is running at http://localhost:9000`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
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

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📱 Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+1234567890 or (123) 456-7890"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Format: +1234567890 or (123) 456-7890</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            👤 Contact Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            placeholder="John Smith"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            🎯 Select Campaign <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedCampaignId}
            onChange={(e) => setSelectedCampaignId(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          >
            <option value="">Choose campaign...</option>
            {campaigns.map(campaign => (
              <option key={campaign.id} value={campaign.id}>
                {campaign.name} ({campaign.contact_count || 0} contacts)
              </option>
            ))}
          </select>
        </div>
      </div>

      {campaigns.length === 0 && (
        <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-200">
          <p className="font-semibold">⚠️ No SMS campaigns available</p>
          <p className="text-sm mt-1">Please create an SMS campaign first before adding contacts.</p>
        </div>
      )}

      <div className="pt-4">
        <button
          onClick={addContact}
          disabled={loading || campaigns.length === 0}
          className="gradient text-white font-bold rounded-full px-8 py-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '👥 Adding...' : '👥 Add Contact'}
        </button>
      </div>
    </div>
  );
};

export default AddSMSContact;

