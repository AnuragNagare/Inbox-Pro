'use client';

import React, { useState, useEffect } from 'react';
import { getSMSCampaigns } from '../../utils/priority-feedback-api';
import CreateSMSCampaign from './SMSComponents/CreateSMSCampaign';
import ManageSMSCampaigns from './SMSComponents/ManageSMSCampaigns';
import AddSMSContact from './SMSComponents/AddSMSContact';
import SendSMS from './SMSComponents/SendSMS';
import SMSAnalytics from './SMSComponents/SMSAnalytics';
import TwilioConfig from './SMSComponents/TwilioConfig';

const SMSAutomation = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [campaigns, setCampaigns] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [twilioSid, setTwilioSid] = useState('');
  const [twilioAuthToken, setTwilioAuthToken] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSid = localStorage.getItem('twilio_account_sid');
      const savedToken = localStorage.getItem('twilio_auth_token');
      if (savedSid) setTwilioSid(savedSid);
      if (savedToken) setTwilioAuthToken(savedToken);
    }
    
    fetchCampaigns();
  }, []);

  const refreshCampaigns = () => {
    setRefreshKey(prev => prev + 1);
    fetchCampaigns();
  };

  const fetchCampaigns = async () => {
    try {
      const data = await getSMSCampaigns();
      const transformedCampaigns = data.map(campaign => ({
        id: campaign.id,
        name: campaign.campaign_name,
        message_type: campaign.message_type,
        tone: campaign.tone,
        status: campaign.status,
        message_template: campaign.message_template,
        contact_count: 0,
        created_at: campaign.created_at,
      }));
      setCampaigns(transformedCampaigns);
    } catch (err) {
      console.error('Error fetching SMS campaigns:', err);
      setCampaigns([]);
    }
  };

  const handleTwilioConfig = (sid, token) => {
    setTwilioSid(sid);
    setTwilioAuthToken(token);
    if (typeof window !== 'undefined') {
      localStorage.setItem('twilio_account_sid', sid);
      localStorage.setItem('twilio_auth_token', token);
    }
  };

  const tabs = [
    { id: 'config', label: '⚙️ Twilio Setup', icon: '⚙️' },
    { id: 'create', label: '📱 Create Campaign', icon: '📱' },
    { id: 'manage', label: '📊 Manage Campaigns', icon: '📊' },
    { id: 'contacts', label: '👥 Add Contacts', icon: '👥' },
    { id: 'send', label: '📨 Send SMS', icon: '📨' },
    { id: 'analytics', label: '📈 Analytics', icon: '📈' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6" data-aos="fade-up" data-aos-duration="800">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">📱 SMS Campaign Automation</h2>
        <p className="text-gray-600">Automate your SMS follow-up sequences! Create campaigns, add contacts, and send personalized SMS messages using Twilio.</p>
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
        {activeTab === 'config' && <TwilioConfig onConfigSave={handleTwilioConfig} initialSid={twilioSid} initialToken={twilioAuthToken} />}
        {activeTab === 'create' && <CreateSMSCampaign onCampaignCreated={refreshCampaigns} />}
        {activeTab === 'manage' && <ManageSMSCampaigns campaigns={campaigns} onRefresh={refreshCampaigns} />}
        {activeTab === 'contacts' && <AddSMSContact campaigns={campaigns} onContactAdded={refreshCampaigns} />}
        {activeTab === 'send' && <SendSMS campaigns={campaigns} twilioSid={twilioSid} twilioAuthToken={twilioAuthToken} />}
        {activeTab === 'analytics' && <SMSAnalytics />}
      </div>
    </div>
  );
};

export default SMSAutomation;

