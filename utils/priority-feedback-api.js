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
 * Submit priority feedback
 */
export async function submitPriorityFeedback(emailId, subject, sender, snippet, aiPriority, userPriority, feedbackText = '') {
  return apiRequest('/api/feedback/priority', {
    method: 'POST',
    body: JSON.stringify({
      email_id: emailId,
      subject: subject,
      sender: sender,
      snippet: snippet,
      ai_priority: aiPriority,
      user_priority: userPriority,
      feedback_text: feedbackText,
    }),
  });
}

/**
 * Create follow-up campaign
 */
export async function createCampaign(campaignName, emailType, tone, subjectTemplate, contentTemplate, followupSchedule, maxFollowups = 3) {
  return apiRequest('/api/campaigns', {
    method: 'POST',
    body: JSON.stringify({
      campaign_name: campaignName,
      email_type: emailType,
      tone: tone,
      subject_template: subjectTemplate,
      content_template: contentTemplate,
      followup_schedule: followupSchedule,
      max_followups: maxFollowups,
    }),
  });
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
 * Add contact to campaign
 */
export async function addContact(campaignId, contactEmail, contactName) {
  return apiRequest(`/api/campaigns/${campaignId}/contacts`, {
    method: 'POST',
    body: JSON.stringify({
      campaign_id: campaignId,
      contact_email: contactEmail,
      contact_name: contactName,
    }),
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

/**
 * ============================================
 * SMS CAMPAIGN API FUNCTIONS (Twilio)
 * ============================================
 */

/**
 * Create SMS campaign
 */
export async function createSMSCampaign(campaignName, messageType, tone, messageTemplate, followupSchedule, maxFollowups = 3) {
  return apiRequest('/api/sms-campaigns', {
    method: 'POST',
    body: JSON.stringify({
      campaign_name: campaignName,
      message_type: messageType,
      tone: tone,
      message_template: messageTemplate,
      followup_schedule: followupSchedule,
      max_followups: maxFollowups,
    }),
  });
}

/**
 * Get all SMS campaigns
 */
export async function getSMSCampaigns() {
  return apiRequest('/api/sms-campaigns', {
    method: 'GET',
  });
}

/**
 * Add contact to SMS campaign
 */
export async function addSMSContact(campaignId, contactPhone, contactName) {
  return apiRequest(`/api/sms-campaigns/${campaignId}/contacts`, {
    method: 'POST',
    body: JSON.stringify({
      campaign_id: campaignId,
      contact_phone: contactPhone,
      contact_name: contactName,
    }),
  });
}

/**
 * Get SMS campaign contacts
 */
export async function getSMSCampaignContacts(campaignId) {
  return apiRequest(`/api/sms-campaigns/${campaignId}/contacts`, {
    method: 'GET',
  });
}

/**
 * Send SMS message
 */
export async function sendSMS(campaignId, contactId, sequenceNumber, twilioSid, twilioAuthToken) {
  return apiRequest(`/api/sms-campaigns/${campaignId}/contacts/${contactId}/send-sms`, {
    method: 'POST',
    body: JSON.stringify({
      sequence_number: sequenceNumber,
      twilio_account_sid: twilioSid,
      twilio_auth_token: twilioAuthToken,
    }),
  });
}

/**
 * Get SMS campaign analytics
 */
export async function getSMSCampaignAnalytics() {
  return apiRequest('/api/sms-campaigns/analytics', {
    method: 'GET',
  });
}

