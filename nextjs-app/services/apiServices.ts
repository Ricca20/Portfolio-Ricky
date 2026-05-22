import axios from 'axios';

// In Next.js, API routes are at the same origin — use relative URLs
const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);

export interface MessageData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Message API calls
export const messageAPI = {
  sendMessage: (data: MessageData) => axiosInstance.post('/messages', data),

  getAll: (read?: boolean) =>
    axiosInstance.get('/messages', { params: read !== undefined ? { read } : {} }),

  getById: (id: string) => axiosInstance.get(`/messages/${id}`),

  markAsRead: (id: string) => axiosInstance.patch(`/messages/${id}/read`),

  delete: (id: string) => axiosInstance.delete(`/messages/${id}`),
};

// Project API calls
export const projectAPI = {
  getAll: (featured = false) => axiosInstance.get('/projects', { params: { featured } }),

  getById: (id: string) => axiosInstance.get(`/projects/${id}`),

  create: (data: unknown) => axiosInstance.post('/projects', data),

  update: (id: string, data: unknown) => axiosInstance.put(`/projects/${id}`, data),

  delete: (id: string) => axiosInstance.delete(`/projects/${id}`),
};
