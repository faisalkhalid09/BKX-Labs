import apiClient from './axios';

export const apiService = {
    // Test API connection
    testApi: async () => {
        try {
            const response = await apiClient.get('/test');
            return response.data;
        } catch (error) {
            console.error('API test failed:', error);
            throw error;
        }
    },

    // Get authenticated user
    getUser: async () => {
        try {
            const response = await apiClient.get('/user');
            return response.data;
        } catch (error) {
            console.error('Failed to get user:', error);
            throw error;
        }
    },

    // Submit contact form
    submitContact: async (data: { name: string; email: string; message: string }) => {
        try {
            const response = await apiClient.post('/contact', data);
            return response.data;
        } catch (error) {
            console.error('Failed to submit contact form:', error);
            throw error;
        }
    },
};

export default apiService;
