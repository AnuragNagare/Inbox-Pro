'use client';

import React, { useState, useEffect } from 'react';
import { createFollowUpSequence, getFollowUpSequences, triggerFollowUp } from '../../utils/feedback-followup-api';

const FollowUpSequences = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [sequences, setSequences] = useState([]);
  const [sequenceName, setSequenceName] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [scheduleDays, setScheduleDays] = useState('');
  const [triggerSequenceId, setTriggerSequenceId] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactName, setContactName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchSequences();
  }, []);

  const fetchSequences = async () => {
    try {
      const data = await getFollowUpSequences();
      setSequences(data);
    } catch (err) {
      console.error('Error fetching sequences:', err);
      setSequences([]);
    }
  };

  const createSequence = async () => {
    if (!sequenceName || !emailSubject || !emailContent || !scheduleDays) {
      setError('❌ Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const data = await createFollowUpSequence(
        sequenceName,
        emailSubject,
        emailContent,
        scheduleDays
      );
      
      setSuccess(`✅ Follow-up sequence '${sequenceName}' created successfully!`);
      setSequenceName('');
      setEmailSubject('');
      setEmailContent('');
      setScheduleDays('');
      fetchSequences();
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      console.error('Error creating sequence:', err);
      setError(`❌ Error: ${err.message}. Make sure the backend server is running at http://localhost:9000`);
    } finally {
      setLoading(false);
    }
  };

  const triggerFollowUpHandler = async () => {
    if (!triggerSequenceId || !contactEmail || !contactName) {
      setError('❌ Please fill in all fields: Sequence, Contact Email, and Contact Name');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const data = await triggerFollowUp(triggerSequenceId, contactEmail, contactName);
      setSuccess(`✅ Follow-up triggered successfully for ${contactName}!`);
      setContactEmail('');
      setContactName('');
      setTriggerSequenceId('');
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      console.error('Error triggering follow-up:', err);
      setError(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'create', label: '➕ Create Sequence', icon: '➕' },
    { id: 'trigger', label: '🚀 Trigger Follow-up', icon: '🚀' },
    { id: 'sequences', label: '📋 My Sequences', icon: '📋' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6" data-aos="fade-up" data-aos-duration="800">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">🔄 Follow-up Automation</h2>
        <p className="text-gray-600">Create automated follow-up sequences and trigger them for contacts. Improve engagement with scheduled follow-ups.</p>
      </div>

      <div className="mb-6 border-b border-gray-200">
        <div className="flex flex-wrap -mb-px">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-lg border border-green-200">
          <p className="font-semibold">{success}</p>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-lg border border-red-200">
          <p className="font-semibold">{error}</p>
        </div>
      )}

      <div className="mt-6">
        {activeTab === 'create' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📋 Sequence Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={sequenceName}
                onChange={(e) => setSequenceName(e.target.value)}
                placeholder="Q1 Follow-up Sequence"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📧 Email Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Following up on our conversation"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📝 Email Content <span className="text-red-500">*</span>
              </label>
              <textarea
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                placeholder="Hi {contact_name}, I wanted to follow up on our discussion..."
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Use {'{contact_name}'} for personalization</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📅 Schedule Days <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={scheduleDays}
                onChange={(e) => setScheduleDays(e.target.value)}
                placeholder="3, 7, 14"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Comma-separated days (e.g., 3, 7, 14)</p>
            </div>

            <div className="pt-4">
              <button
                onClick={createSequence}
                disabled={loading}
                className="gradient text-white font-bold rounded-full px-8 py-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '➕ Creating...' : '➕ Create Sequence'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'trigger' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📋 Select Sequence <span className="text-red-500">*</span>
              </label>
              <select
                value={triggerSequenceId}
                onChange={(e) => setTriggerSequenceId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="">Choose sequence...</option>
                {sequences.map(seq => (
                  <option key={seq.id} value={seq.id}>
                    {seq.sequence_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
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
            </div>

            {sequences.length === 0 && (
              <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-200">
                <p className="font-semibold">⚠️ No sequences available</p>
                <p className="text-sm mt-1">Please create a sequence first.</p>
              </div>
            )}

            <div className="pt-4">
              <button
                onClick={triggerFollowUpHandler}
                disabled={loading || sequences.length === 0}
                className="gradient text-white font-bold rounded-full px-8 py-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '🚀 Triggering...' : '🚀 Trigger Follow-up'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'sequences' && (
          <div className="space-y-4">
            {sequences.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📭</div>
                <p className="text-gray-600 mb-4">No sequences created yet.</p>
                <p className="text-gray-500">Create your first follow-up sequence to get started!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {sequences.map((seq, index) => (
                  <div
                    key={seq.id || index}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{seq.sequence_name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-semibold">Subject:</span> {seq.email_subject}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-semibold">Schedule:</span> {seq.schedule_days} days
                    </p>
                    {seq.created_at && (
                      <p className="text-xs text-gray-400 mt-2">
                        Created: {new Date(seq.created_at).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowUpSequences;

