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
 * Submit feedback on AI response
 */
export async function submitAIResponseFeedback(responseId, originalResponse, correctedResponse, feedbackType, feedbackText = '') {
  return apiRequest('/api/feedback/ai-response', {
    method: 'POST',
    body: JSON.stringify({
      response_id: responseId,
      original_response: originalResponse,
      corrected_response: correctedResponse,
      feedback_type: feedbackType,
      feedback_text: feedbackText,
    }),
  });
}

/**
 * Get feedback history
 */
export async function getFeedbackHistory() {
  return apiRequest('/api/feedback/history', {
    method: 'GET',
  });
}

/**
 * Create follow-up sequence
 */
export async function createFollowUpSequence(sequenceName, emailSubject, emailContent, scheduleDays, maxFollowups = 3) {
  return apiRequest('/api/follow-up/sequences', {
    method: 'POST',
    body: JSON.stringify({
      sequence_name: sequenceName,
      email_subject: emailSubject,
      email_content: emailContent,
      schedule_days: scheduleDays,
      max_followups: maxFollowups,
    }),
  });
}

/**
 * Get follow-up sequences
 */
export async function getFollowUpSequences() {
  return apiRequest('/api/follow-up/sequences', {
    method: 'GET',
  });
}

/**
 * Trigger follow-up for a contact
 */
export async function triggerFollowUp(sequenceId, contactEmail, contactName) {
  return apiRequest(`/api/follow-up/sequences/${sequenceId}/trigger`, {
    method: 'POST',
    body: JSON.stringify({
      contact_email: contactEmail,
      contact_name: contactName,
    }),
  });
}

/**
 * Get follow-up analytics
 */
export async function getFollowUpAnalytics() {
  return apiRequest('/api/follow-up/analytics', {
    method: 'GET',
  });
}

