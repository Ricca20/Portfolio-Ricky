import axiosInstance from './api';

// Project API calls
export const projectAPI = {
  getAll: (featured = false) =>
    axiosInstance.get('/projects', { params: { featured } }),
  
  getById: (id) =>
    axiosInstance.get(`/projects/${id}`),
  
  create: (data) =>
    axiosInstance.post('/projects', data),
  
  update: (id, data) =>
    axiosInstance.put(`/projects/${id}`, data),
  
  delete: (id) =>
    axiosInstance.delete(`/projects/${id}`)
};

// Message API calls
export const messageAPI = {
  sendMessage: (data) =>
    axiosInstance.post('/messages', data),
  
  getAll: (read = undefined) =>
    axiosInstance.get('/messages', { params: { read } }),
  
  getById: (id) =>
    axiosInstance.get(`/messages/${id}`),
  
  markAsRead: (id) =>
    axiosInstance.patch(`/messages/${id}/read`),
  
  delete: (id) =>
    axiosInstance.delete(`/messages/${id}`)
};
