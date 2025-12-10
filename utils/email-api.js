/**
 * API utility for backend communication
 * Uses environment variables for API key and Gmail OAuth
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000';

// Get credentials from environment variables
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GMAIL_CREDENTIALS = {
  installed: {
    client_id: process.env.NEXT_PUBLIC_GMAIL_CLIENT_ID,
    project_id: process.env.NEXT_PUBLIC_GMAIL_PROJECT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_secret: process.env.NEXT_PUBLIC_GMAIL_CLIENT_SECRET,
    redirect_uris: ["http://localhost"]
  }
};

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
      const errorMessage = errorData.detail || errorData.message || `HTTP ${response.status}`;

      // Provide more helpful error messages
      if (errorMessage.includes('OAuth') || errorMessage.includes('Gmail not connected')) {
        throw new Error(`${errorMessage}. Please ensure Gmail OAuth is completed.`);
      }

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    // If it's a network error, provide helpful context
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error(`Cannot connect to backend API at ${API_BASE_URL}. Make sure the server is running.`);
    }

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
 * Connect Gmail (using fixed credentials)
 * Note: For installed type OAuth, the backend should already have credentials.json
 * We just check if Gmail is connected via the status endpoint
 */
export async function connectGmail() {
  // For installed type OAuth, backend should have credentials.json file
  // We just check connection status - backend will use token.pickle if available
  try {
    const status = await getAuthStatus();
    if (status.gmail_connected) {
      return {
        connected: true,
        message: '✅ Gmail connected successfully!',
        email: status.email
      };
    } else {
      // Try to connect by checking if backend can access Gmail
      // Backend should have credentials.json file with the fixed credentials
      return apiRequest('/api/auth/gmail/connect', {
        method: 'POST',
        body: JSON.stringify({ 
          authorization_code: null // Backend uses credentials.json
        }),
      });
    }
  } catch (error) {
    // If connection check fails, try the connect endpoint
    return apiRequest('/api/auth/gmail/connect', {
      method: 'POST',
      body: JSON.stringify({ 
        authorization_code: null
      }),
    });
  }
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
 * Fetch and analyze emails
 */
export async function fetchEmails(query = '', maxResults = 10, useAdaptiveLearning = true) {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY in .env.local');
  }
  return apiRequest('/api/gmail/emails', {
    method: 'POST',
    body: JSON.stringify({
      query: query,
      max_results: maxResults,
      use_adaptive_learning: useAdaptiveLearning,
      authorization_code: null, // Backend uses stored credentials
      api_key: GEMINI_API_KEY,
    }),
  });
}

/**
 * Send email via Gmail
 */
export async function sendEmail(toEmail, subject, body) {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY in .env.local');
  }
  return apiRequest('/api/gmail/send', {
    method: 'POST',
    body: JSON.stringify({
      to_email: toEmail,
      subject: subject,
      body: body,
      authorization_code: null, // Backend uses stored credentials
      api_key: GEMINI_API_KEY,
    }),
  });
}

/**
 * Check Gmail connection status
 */
export async function checkGmailConnection() {
  try {
    return await apiRequest('/api/gmail/status', {
      method: 'GET',
    });
  } catch (error) {
    return { connected: false, error: error.message };
  }
}

// Export API base URL for debugging
export const getApiUrl = () => API_BASE_URL;

