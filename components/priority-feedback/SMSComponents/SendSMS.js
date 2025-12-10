'use client';

import React, { useState, useEffect } from 'react';
import { getSMSCampaignContacts, sendSMS } from '../../../utils/priority-feedback-api';

const SendSMS = ({ campaigns, twilioSid, twilioAuthToken }) => {
  const [selectedCampaignId, setSelectedCampaignId] = useState('');
  const [selectedContactId, setSelectedContactId] = useState('');
  const [sequenceNumber, setSequenceNumber] = useState(1);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [previewMessage, setPreviewMessage] = useState('');

  useEffect(() => {
    if (selectedCampaignId) {
      fetchContacts();
    } else {
      setContacts([]);
      setSelectedContactId('');
      setPreviewMessage('');
    }
  }, [selectedCampaignId]);

  useEffect(() => {
    if (selectedCampaignId && selectedContactId && contacts.length > 0) {
      const contact = contacts.find(c => c.id === parseInt(selectedContactId));
      const campaign = campaigns.find(c => c.id === parseInt(selectedCampaignId));
      if (contact && campaign) {
        let preview = campaign.message_template || '';
        preview = preview.replace(/{contact_name}/g, contact.name || 'Contact');
        preview = preview.replace(/{company_name}/g, contact.company_name || 'Company');
        preview = preview.replace(/{topic}/g, 'your inquiry');
        setPreviewMessage(preview);
      }
    } else {
      setPreviewMessage('');
    }
  }, [selectedCampaignId, selectedContactId, contacts, campaigns]);

  const fetchContacts = async () => {
    try {
      const data = await getSMSCampaignContacts(parseInt(selectedCampaignId));
      const transformedContacts = data.map(contact => ({
        id: contact.id,
        phone: contact.contact_phone,
        name: contact.contact_name,
        company_name: contact.company_name || '',
      }));
      setContacts(transformedContacts);
    } catch (err) {
      console.error('Error fetching SMS contacts:', err);
      setContacts([]);
    }
  };

  const sendSMSHandler = async () => {
    if (!selectedCampaignId || !selectedContactId) {
      setError('❌ Please select both Campaign and Contact');
      return;
    }

    if (!twilioSid || !twilioAuthToken) {
      setError('❌ Twilio credentials not configured. Please set your Twilio Account SID and Auth Token.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const data = await sendSMS(
        parseInt(selectedCampaignId),
        parseInt(selectedContactId),
        sequenceNumber,
        twilioSid,
        twilioAuthToken
      );
      
      setSuccess(`✅ SMS sent successfully to ${data.contact_name || 'contact'}! Message SID: ${data.message_sid}`);
      setTimeout(() => {
        setSuccess('');
        setSelectedContactId('');
        setSequenceNumber(1);
      }, 5000);
    } catch (err) {
      console.error('Error sending SMS:', err);
      setError(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 text-red-800 rounded-lg border border-red-200">
          <p className="font-semibold">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 text-green-800 rounded-lg border border-green-200">
          <p className="font-semibold">{success}</p>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            🎯 Select Campaign <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedCampaignId}
            onChange={(e) => {
              setSelectedCampaignId(e.target.value);
              setSelectedContactId('');
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          >
            <option value="">Choose campaign...</option>
            {campaigns.map(campaign => (
              <option key={campaign.id} value={campaign.id}>
                {campaign.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            👤 Select Contact <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedContactId}
            onChange={(e) => setSelectedContactId(e.target.value)}
            disabled={!selectedCampaignId || contacts.length === 0}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            required
          >
            <option value="">Choose contact...</option>
            {contacts.map(contact => (
              <option key={contact.id} value={contact.id}>
                {contact.name} ({contact.phone})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📊 Sequence Number
          </label>
          <input
            type="number"
            value={sequenceNumber}
            onChange={(e) => setSequenceNumber(parseInt(e.target.value))}
            min="1"
            max="10"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">Which follow-up in sequence (1, 2, 3, etc.)</p>
        </div>
      </div>

      {previewMessage && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">📱 Message Preview:</label>
          <p className="text-gray-800 whitespace-pre-wrap">{previewMessage}</p>
          <p className="text-xs text-gray-500 mt-2">Characters: {previewMessage.length}/160</p>
        </div>
      )}

      {campaigns.length === 0 && (
        <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-200">
          <p className="font-semibold">⚠️ No SMS campaigns available</p>
          <p className="text-sm mt-1">Please create an SMS campaign and add contacts first.</p>
        </div>
      )}

      {selectedCampaignId && contacts.length === 0 && (
        <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-200">
          <p className="font-semibold">⚠️ No contacts in this campaign</p>
          <p className="text-sm mt-1">Please add contacts to this campaign first.</p>
        </div>
      )}

      <div className="pt-4">
        <button
          onClick={sendSMSHandler}
          disabled={loading || !selectedCampaignId || !selectedContactId || !twilioSid || !twilioAuthToken}
          className="gradient text-white font-bold rounded-full px-8 py-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '📱 Sending...' : '📱 Send SMS'}
        </button>
      </div>
    </div>
  );
};

export default SendSMS;

