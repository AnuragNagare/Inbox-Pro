/**
 * API utility for backend communication
 * Uses environment variables for API key
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000';

// Get API key from environment variables
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

// Validate that required environment variables are set
if (typeof window !== 'undefined' && !GEMINI_API_KEY) {
  console.warn('⚠️ NEXT_PUBLIC_GEMINI_API_KEY is not set. Please configure it in .env.local');
}

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
 * Validate API key (using environment variable)
 */
export async function validateApiKey() {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY in .env.local');
  }
  return apiRequest('/api/auth/validate-api-key', {
    method: 'POST',
    body: JSON.stringify({ api_key: GEMINI_API_KEY }),
  });
}

/**
 * Get auth status
 */
export async function getAuthStatus() {
  return apiRequest('/api/auth/status', {
    method: 'GET',
  });
}

/**
 * Detect meeting intent in email
 */
export async function detectMeetingIntent(emailSubject, emailContent, sender = '') {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY in .env.local');
  }
  return apiRequest('/api/meetings/detect', {
    method: 'POST',
    body: JSON.stringify({
      email_subject: emailSubject,
      email_content: emailContent,
      sender: sender,
      api_key: GEMINI_API_KEY,
    }),
  });
}

/**
 * Get meeting analytics
 */
export async function getMeetingAnalytics() {
  return apiRequest('/api/meetings/analytics', {
    method: 'GET',
  });
}

/**
 * Get recent meeting detections
 */
export async function getRecentDetections() {
  return apiRequest('/api/meetings/recent', {
    method: 'GET',
  });
}

/**
 * Fetch emails from Gmail (for auto detection)
 */
export async function fetchGmailEmails(query = '', maxResults = 10) {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY in .env.local');
  }
  return apiRequest('/api/gmail/emails', {
    method: 'POST',
    body: JSON.stringify({
      query: query,
      max_results: maxResults,
      use_adaptive_learning: false,
      authorization_code: null,
      api_key: GEMINI_API_KEY,
    }),
  });
}

