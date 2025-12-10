'use client';

import React, { useState } from 'react';
import { addContact } from '../../../utils/priority-feedback-api';

const AddContact = ({ campaigns, onContactAdded }) => {
  const [contactEmail, setContactEmail] = useState('');
  const [contactName, setContactName] = useState('');
  const [selectedCampaignId, setSelectedCampaignId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const addContactHandler = async () => {
    if (!contactEmail || !contactName || !selectedCampaignId) {
      setError('❌ Please fill in all fields: Email, Name, and Campaign');
      return;
    }

    if (!validateEmail(contactEmail)) {
      setError(`❌ Invalid email address: ${contactEmail}`);
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const data = await addContact(parseInt(selectedCampaignId), contactEmail, contactName);
      
      setSuccess(`✅ Contact ${contactName} (${contactEmail}) added to campaign!`);
      setContactEmail('');
      setContactName('');
      setSelectedCampaignId('');
      
      if (onContactAdded) {
        onContactAdded();
      }
      
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      console.error('Error adding contact:', err);
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
            📧 Contact Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder="john@company.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
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
          <p className="font-semibold">⚠️ No campaigns available</p>
          <p className="text-sm mt-1">Please create a campaign first before adding contacts.</p>
        </div>
      )}

      <div className="pt-4">
        <button
          onClick={addContactHandler}
          disabled={loading || campaigns.length === 0}
          className="gradient text-white font-bold rounded-full px-8 py-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '👥 Adding...' : '👥 Add Contact'}
        </button>
      </div>
    </div>
  );
};

export default AddContact;

