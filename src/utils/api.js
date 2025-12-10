/**
 * API utility for backend communication
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:9000';

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
 * Get backend health status
 */
export async function getBackendStatus() {
  try {
    return await apiRequest('/api/health');
  } catch (error) {
    return null;
  }
}

/**
 * Get auth status
 */
export async function getAuthStatus() {
  try {
    return await apiRequest('/api/auth/status');
  } catch (error) {
    return null;
  }
}

