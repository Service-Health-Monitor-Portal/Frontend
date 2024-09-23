import axios from 'axios';

export const addService = async (data: { name: string }) => {
    try {
        const response = await axios.post(`${process.env.LOG_ANALYZER_API_URL}/api/services`, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (err: any) {
        throw err.response?.data || new Error('An error occurred while adding the service');
    }
};