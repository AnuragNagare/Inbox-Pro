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
 * Generate smart reply suggestions
 */
export async function generateSmartReply(emailSubject, emailContent, sender, emailType = 'general') {
  return apiRequest('/api/emails/smart-reply', {
    method: 'POST',
    body: JSON.stringify({
      email_subject: emailSubject,
      email_content: emailContent,
      sender: sender,
      email_type: emailType,
    }),
  });
}

/**
 * Get quick reply templates
 */
export async function getTemplates() {
  return apiRequest('/api/emails/templates', {
    method: 'GET',
  });
}

/**
 * Apply quick reply template
 */
export async function applyTemplate(templateType, customMessage = '') {
  return apiRequest('/api/emails/templates/apply', {
    method: 'POST',
    body: JSON.stringify({
      template_type: templateType,
      custom_message: customMessage,
    }),
  });
}

