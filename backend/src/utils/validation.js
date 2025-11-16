// Backend utilities for request validation and response formatting

export const validateProjectData = (data) => {
  const errors = {};

  if (!data.title || data.title.trim().length === 0) {
    errors.title = 'Title is required';
  }

  if (!data.description || data.description.trim().length === 0) {
    errors.description = 'Description is required';
  }

  if (!data.image || data.image.trim().length === 0) {
    errors.image = 'Image URL is required';
  }

  if (!data.techStack || !Array.isArray(data.techStack) || data.techStack.length === 0) {
    errors.techStack = 'At least one technology is required';
  }

  if (!data.githubUrl || data.githubUrl.trim().length === 0) {
    errors.githubUrl = 'GitHub URL is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateMessageData = (data) => {
  const errors = {};

  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'Name is required';
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.email = 'Valid email is required';
  }

  if (!data.subject || data.subject.trim().length === 0) {
    errors.subject = 'Subject is required';
  }

  if (!data.message || data.message.trim().length === 0) {
    errors.message = 'Message is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const successResponse = (data, message = 'Success') => ({
  success: true,
  message,
  data
});

export const errorResponse = (message = 'Error', statusCode = 500) => ({
  success: false,
  message,
  statusCode
});
