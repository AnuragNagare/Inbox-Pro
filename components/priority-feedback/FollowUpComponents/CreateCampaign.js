'use client';

import React, { useState } from 'react';
import { createCampaign } from '../../../utils/priority-feedback-api';

const CreateCampaign = ({ onCampaignCreated }) => {
  const [campaignName, setCampaignName] = useState('');
  const [emailType, setEmailType] = useState('Follow-up');
  const [tone, setTone] = useState('Professional');
  const [followupSchedule, setFollowupSchedule] = useState('');
  const [subjectTemplate, setSubjectTemplate] = useState('');
  const [contentTemplate, setContentTemplate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const emailTypes = [
    'Follow-up',
    'Cold Outreach',
    'Proposal',
    'Thank You',
    'Meeting Request',
    'Project Update',
  ];

  const tones = [
    'Professional',
    'Friendly',
    'Persuasive',
    'Casual',
    'Formal',
  ];

  const createCampaignHandler = async () => {
    if (!campaignName || !followupSchedule || !subjectTemplate || !contentTemplate) {
      setError('❌ Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const data = await createCampaign(
        campaignName,
        emailType,
        tone,
        subjectTemplate,
        contentTemplate,
        followupSchedule,
        3
      );
      
      setSuccess(`✅ Follow-up campaign '${campaignName}' created successfully!`);
      setCampaignName('');
      setFollowupSchedule('');
      setSubjectTemplate('');
      setContentTemplate('');
      
      if (onCampaignCreated) {
        onCampaignCreated();
      }
      
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      console.error('Error creating campaign:', err);
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

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📋 Campaign Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            placeholder="Q1 Lead Follow-up"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📧 Email Type
          </label>
          <select
            value={emailType}
            onChange={(e) => setEmailType(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {emailTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            🎭 Tone
          </label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {tones.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📅 Follow-up Schedule (Days) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={followupSchedule}
            onChange={(e) => setFollowupSchedule(e.target.value)}
            placeholder="3, 7, 14, 30"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Comma-separated days (e.g., 3, 7, 14, 30)</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          📋 Subject Template <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={subjectTemplate}
          onChange={(e) => setSubjectTemplate(e.target.value)}
          placeholder="Following up on {topic} - {company_name}"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Use {'{contact_name}'}, {'{company_name}'}, {'{topic}'} for personalization</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          📝 Content Template <span className="text-red-500">*</span>
        </label>
        <textarea
          value={contentTemplate}
          onChange={(e) => setContentTemplate(e.target.value)}
          placeholder="Hi {contact_name}, I wanted to follow up on our discussion about {topic}..."
          rows="6"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Use {'{contact_name}'}, {'{company_name}'}, {'{topic}'} for personalization</p>
      </div>

      <div className="pt-4">
        <button
          onClick={createCampaignHandler}
          disabled={loading}
          className="gradient text-white font-bold rounded-full px-8 py-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '🎯 Creating...' : '🎯 Create Campaign'}
        </button>
      </div>
    </div>
  );
};

export default CreateCampaign;

