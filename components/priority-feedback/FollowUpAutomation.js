'use client';

import React, { useState, useEffect } from 'react';
import { getCampaigns } from '../../utils/priority-feedback-api';
import CreateCampaign from './FollowUpComponents/CreateCampaign';
import ManageCampaigns from './FollowUpComponents/ManageCampaigns';
import AddContact from './FollowUpComponents/AddContact';
import GenerateFollowUp from './FollowUpComponents/GenerateFollowUp';
import FollowUpAnalytics from './FollowUpComponents/FollowUpAnalytics';

const FollowUpAutomation = ({ apiKey }) => {
  const [activeTab, setActiveTab] = useState('create');
  const [campaigns, setCampaigns] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshCampaigns = () => {
    setRefreshKey(prev => prev + 1);
    fetchCampaigns();
  };

  const fetchCampaigns = async () => {
    try {
      const data = await getCampaigns();
      const transformedCampaigns = data.map(campaign => ({
        id: campaign.id,
        name: campaign.campaign_name,
        email_type: campaign.email_type,
        tone: campaign.tone,
        status: campaign.status,
        contact_count: 0,
        created_at: campaign.created_at,
      }));
      setCampaigns(transformedCampaigns);
    } catch (err) {
      console.error('Error fetching campaigns:', err);
      setCampaigns([]);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const tabs = [
    { id: 'create', label: '🎯 Create Campaign', icon: '🎯' },
    { id: 'manage', label: '📊 Manage Campaigns', icon: '📊' },
    { id: 'contacts', label: '👥 Add Contacts', icon: '👥' },
    { id: 'generate', label: '🤖 Generate Emails', icon: '🤖' },
    { id: 'analytics', label: '📈 Analytics', icon: '📈' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6" data-aos="fade-up" data-aos-duration="800">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">🤖 Follow-up Automation System (NEW)</h2>
        <p className="text-gray-600">Automate your follow-up sequences! Create campaigns, add contacts, and let AI generate personalized follow-up emails automatically.</p>
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

      <div className="mt-6">
        {activeTab === 'create' && <CreateCampaign onCampaignCreated={refreshCampaigns} />}
        {activeTab === 'manage' && <ManageCampaigns campaigns={campaigns} onRefresh={refreshCampaigns} />}
        {activeTab === 'contacts' && <AddContact campaigns={campaigns} onContactAdded={refreshCampaigns} />}
        {activeTab === 'generate' && <GenerateFollowUp campaigns={campaigns} apiKey={apiKey} />}
        {activeTab === 'analytics' && <FollowUpAnalytics />}
      </div>
    </div>
  );
};

export default FollowUpAutomation;

