'use client';

import React from 'react';

const ManageCampaigns = ({ campaigns, onRefresh }) => {
  if (campaigns.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📭</div>
        <p className="text-gray-600 mb-4">No campaigns created yet.</p>
        <p className="text-gray-500">Create your first follow-up campaign to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={onRefresh}
          className="bg-gray-200 text-gray-800 font-bold rounded-full px-6 py-2 shadow-lg hover:shadow-xl transform transition hover:scale-105 duration-300 ease-in-out"
        >
          🔄 Refresh Campaigns
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {campaigns.map((campaign, index) => (
          <div
            key={campaign.id || index}
            className="campaign-card bg-gray-50 rounded-lg p-4 border border-gray-200"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">
                    {campaign.status === 'active' ? '🟢' : '⏸️'}
                  </span>
                  <h3 className="text-xl font-bold text-gray-800">{campaign.name}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">Type:</span> {campaign.email_type} | <span className="font-semibold">Tone:</span> {campaign.tone}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">Contacts:</span> {campaign.contact_count || 0}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Status:</span> {campaign.status?.charAt(0).toUpperCase() + campaign.status?.slice(1) || 'Active'}
                </p>
                {campaign.created_at && (
                  <p className="text-xs text-gray-400 mt-2">
                    Created: {new Date(campaign.created_at).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCampaigns;

