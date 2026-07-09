import api from './api';

export const taskService = {
  // Get All Tasks
  getTasks: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },

  // Get Single Task
  getTask: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  // Create Task
  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  // Update Task
  updateTask: async (id, taskData) => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  // Delete Task
  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },

  // Get Task Stats
  getTaskStats: async () => {
    const response = await api.get('/tasks/stats/overview');
    return response.data;
  },
};