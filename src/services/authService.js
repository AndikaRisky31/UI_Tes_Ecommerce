import axiosInstance from './axiosInstance';

const AuthService = {
    register: async (username, password) => {
        try {
            const response = await axiosInstance.post('/auth/register', {
                username,
                password
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'An error occurred during registration');
        }
    },

    login: async (username, password) => {
        try {
            const response = await axiosInstance.post('/auth/login', {
                username,
                password
            });
            const { token, user } = response.data;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'An error occurred during login');
        }
    },

    logout: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    }
};

export default AuthService;