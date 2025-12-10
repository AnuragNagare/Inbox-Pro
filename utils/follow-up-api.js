/**
 * API utility for backend communication
 */

const API_BASE_URL = 'http://localhost:9000';

/**
 * Make API request
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...(options.headers || {}),
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: response.statusText }));
      throw new Error(errorData.detail || errorData.message || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error.message) {
      throw error;
    }
    throw new Error(`Network error: ${error.message}`);
  }
}

/**
 * Get all campaigns
 */
export async function getCampaigns() {
  return apiRequest('/api/campaigns', {
    method: 'GET',
  });
}

/**
 * Get campaign contacts
 */
export async function getCampaignContacts(campaignId) {
  return apiRequest(`/api/campaigns/${campaignId}/contacts`, {
    method: 'GET',
  });
}

/**
 * Generate follow-up email
 */
export async function generateFollowUpEmail(campaignId, contactId, sequenceNumber) {
  return apiRequest(`/api/campaigns/${campaignId}/contacts/${contactId}/generate-email`, {
    method: 'POST',
    body: JSON.stringify({
      sequence_number: sequenceNumber,
    }),
  });
}

/**
 * Get campaign analytics
 */
export async function getCampaignAnalytics() {
  return apiRequest('/api/campaigns/analytics', {
    method: 'GET',
  });
}

