'use client';

import React, { useState, useEffect } from 'react';
import { getCampaigns, getCampaignContacts, generateFollowUpEmail } from '../../utils/follow-up-api';

const GenerateFollowUpEmail = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState('');
  const [selectedContactId, setSelectedContactId] = useState('');
  const [sequenceNumber, setSequenceNumber] = useState(1);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCampaigns, setLoadingCampaigns] = useState(true);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [error, setError] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  useEffect(() => {
    if (selectedCampaignId) {
      fetchContacts();
    } else {
      setContacts([]);
      setSelectedContactId('');
    }
  }, [selectedCampaignId]);

  const fetchCampaigns = async () => {
    setLoadingCampaigns(true);
    try {
      const data = await getCampaigns();
      const transformedCampaigns = data.map(campaign => ({
        id: campaign.id,
        name: campaign.campaign_name,
        email_type: campaign.email_type,
        tone: campaign.tone,
      }));
      setCampaigns(transformedCampaigns);
    } catch (err) {
      console.error('Error fetching campaigns:', err);
      setError('❌ Error loading campaigns. Make sure the backend server is running at http://localhost:9000');
      setCampaigns([]);
    } finally {
      setLoadingCampaigns(false);
    }
  };

  const fetchContacts = async () => {
    if (!selectedCampaignId) return;
    setLoadingContacts(true);
    try {
      const data = await getCampaignContacts(parseInt(selectedCampaignId));
      const transformedContacts = data.map(contact => ({
        id: contact.id,
        email: contact.contact_email,
        name: contact.contact_name,
      }));
      setContacts(transformedContacts);
    } catch (err) {
      console.error('Error fetching contacts:', err);
      setError('❌ Error loading contacts. Make sure the backend server is running at http://localhost:9000');
      setContacts([]);
    } finally {
      setLoadingContacts(false);
    }
  };

  const handleGenerateEmail = async () => {
    if (!selectedCampaignId || !selectedContactId) {
      setError('❌ Please select both Campaign and Contact');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedEmail(null);

    try {
      const data = await generateFollowUpEmail(
        parseInt(selectedCampaignId),
        parseInt(selectedContactId),
        sequenceNumber
      );
      
      setGeneratedEmail({
        email: {
          subject: data.email_subject,
          content: data.email_content,
          call_to_action: 'Schedule a call to discuss next steps',
          personalization_notes: JSON.stringify(data.personalization || {}),
        },
        campaign_info: {
          sequence: sequenceNumber,
          delay_days: 7,
          email_type: 'Follow-up',
          tone: 'Professional',
        },
        cost: data.cost,
        is_ai_generated: data.is_ai_generated,
      });
    } catch (err) {
      console.error('Error generating email:', err);
      setError(`❌ Error: ${err.message}. Make sure the backend server is running at http://localhost:9000`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6" data-aos="fade-up" data-aos-duration="800">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">🤖 Generate Follow-up Emails</h2>
        <p className="text-gray-600">Select a campaign and contact, then generate personalized AI-powered follow-up emails.</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-lg border border-red-200">
          <p className="font-semibold">{error}</p>
        </div>
      )}

      {/* Input Form */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
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
            disabled={loadingCampaigns}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            required
          >
            <option value="">{loadingCampaigns ? 'Loading campaigns...' : 'Choose campaign...'}</option>
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
            disabled={!selectedCampaignId || loadingContacts || contacts.length === 0}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            required
          >
            <option value="">
              {loadingContacts ? 'Loading contacts...' : !selectedCampaignId ? 'Select campaign first' : contacts.length === 0 ? 'No contacts available' : 'Choose contact...'}
            </option>
            {contacts.map(contact => (
              <option key={contact.id} value={contact.id}>
                {contact.name} ({contact.email})
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
            onChange={(e) => setSequenceNumber(parseInt(e.target.value) || 1)}
            min="1"
            max="10"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">Which follow-up in sequence (1, 2, 3, etc.)</p>
        </div>
      </div>

      {campaigns.length === 0 && !loadingCampaigns && (
        <div className="mb-6 p-4 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-200">
          <p className="font-semibold">⚠️ No campaigns available</p>
          <p className="text-sm mt-1">Please create a campaign and add contacts first using the full automation system.</p>
        </div>
      )}

      {selectedCampaignId && contacts.length === 0 && !loadingContacts && (
        <div className="mb-6 p-4 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-200">
          <p className="font-semibold">⚠️ No contacts in this campaign</p>
          <p className="text-sm mt-1">Please add contacts to this campaign first.</p>
        </div>
      )}

      <div className="pt-4">
        <button
          onClick={handleGenerateEmail}
          disabled={loading || !selectedCampaignId || !selectedContactId}
          className="gradient text-white font-bold rounded-full px-8 py-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed pulse-slow"
        >
          {loading ? '🤖 Generating...' : '🤖 Generate Follow-up Email'}
        </button>
      </div>

      {/* Generated Email Display */}
      {generatedEmail && (
        <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200" data-aos="fade-up" data-aos-delay="200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              {generatedEmail.is_ai_generated ? '🤖 AI-Generated Follow-up Email' : '📧 Follow-up Email'}
            </h3>
            {generatedEmail.cost && (
              <span className="text-sm text-gray-600">Cost: ${generatedEmail.cost.toFixed(4)}</span>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">📋 Subject:</label>
              <p className="text-gray-800 font-semibold">{generatedEmail.email.subject}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">📝 Content:</label>
              <p className="text-gray-800 whitespace-pre-wrap">{generatedEmail.email.content}</p>
            </div>

            {generatedEmail.email.call_to_action && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">🎯 Call to Action:</label>
                <p className="text-gray-800">{generatedEmail.email.call_to_action}</p>
              </div>
            )}

            {generatedEmail.email.personalization_notes && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">✨ Personalization:</label>
                <p className="text-gray-800 text-sm">{generatedEmail.email.personalization_notes}</p>
              </div>
            )}

            {generatedEmail.campaign_info && (
              <div className="mt-4 p-4 bg-white rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">📊 Campaign Info:</label>
                <div className="grid md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-semibold">Sequence:</span> {generatedEmail.campaign_info.sequence}
                  </div>
                  <div>
                    <span className="font-semibold">Delay Days:</span> {generatedEmail.campaign_info.delay_days}
                  </div>
                  <div>
                    <span className="font-semibold">Type:</span> {generatedEmail.campaign_info.email_type}
                  </div>
                  <div>
                    <span className="font-semibold">Tone:</span> {generatedEmail.campaign_info.tone}
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4">
              <button
                onClick={() => {
                  const emailText = `Subject: ${generatedEmail.email.subject}\n\n${generatedEmail.email.content}`;
                  navigator.clipboard.writeText(emailText);
                  alert('Email copied to clipboard!');
                }}
                className="bg-white text-purple-600 font-bold rounded-full px-6 py-3 shadow-lg hover:shadow-xl transform transition hover:scale-105 duration-300 ease-in-out border border-purple-200"
              >
                📋 Copy Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateFollowUpEmail;

