/**
 * Route configuration for navigation to other React apps
 * Update these URLs if your apps run on different ports
 */

export const ROUTES = {
  // Setup page (API Key & Gmail Connection)
  SETUP: process.env.REACT_APP_SETUP_URL || 'http://localhost:3000',
  
  // Feature apps
  EMAIL_ANALYSIS: process.env.REACT_APP_EMAIL_ANALYSIS_URL || 'http://localhost:3002',
  SMART_REPLY: process.env.REACT_APP_SMART_REPLY_URL || 'http://localhost:3003',
  FOLLOW_UP: process.env.REACT_APP_FOLLOW_UP_URL || 'http://localhost:3004',
  MEETING_INTENT: process.env.REACT_APP_MEETING_INTENT_URL || 'http://localhost:3006',
  
  // API Email AI email analysis and Send Email (needs different port from Landing)
  API_EMAIL_AI: process.env.REACT_APP_API_EMAIL_AI_URL || 'http://localhost:3001',
  
  // Follow up email and Analytics
  FOLLOW_UP_ANALYTICS: process.env.REACT_APP_FOLLOW_UP_ANALYTICS_URL || 'http://localhost:3005',
  
  // Priority Feedback and Follow-up Automation (needs different port)
  PRIORITY_FEEDBACK: process.env.REACT_APP_PRIORITY_FEEDBACK_URL || 'http://localhost:3007',
  
  // Smart and Quick reply (needs different port)
  SMART_QUICK_REPLY: process.env.REACT_APP_SMART_QUICK_REPLY_URL || 'http://localhost:3008',
  
  // Feedback and Follow up (if exists)
  FEEDBACK_FOLLOW_UP: process.env.REACT_APP_FEEDBACK_FOLLOW_UP_URL || 'http://localhost:3009',
};

// App folder paths for launching
export const APP_PATHS = {
  API_EMAIL_AI: 'API Email AI email analysis and Send Email',
  FOLLOW_UP_ANALYTICS: 'Follow up email and Analystics',
  MEETING_INTENT: 'Meeting Intent',
  PRIORITY_FEEDBACK: 'Priority Feedback and Follow-up Automation',
  SMART_QUICK_REPLY: 'Smart and Quick reply',
  FEEDBACK_FOLLOW_UP: 'Feed back and Follow up',
};

