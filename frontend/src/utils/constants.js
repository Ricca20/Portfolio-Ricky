// API constants and configuration

export const API_ENDPOINTS = {
  // Projects
  PROJECTS: '/projects',
  PROJECT_BY_ID: (id) => `/projects/${id}`,
  FEATURED_PROJECTS: '/projects?featured=true',
  
  // Messages
  MESSAGES: '/messages',
  MESSAGE_BY_ID: (id) => `/messages/${id}`,
  MARK_MESSAGE_READ: (id) => `/messages/${id}/read`,
  
  // Health
  HEALTH: '/health'
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  NOT_FOUND: 'Resource not found.',
  UNAUTHORIZED: 'You are not authorized to perform this action.'
};
