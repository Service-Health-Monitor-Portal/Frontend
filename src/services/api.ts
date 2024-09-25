import { serviceApi } from './axios.config';

export const addService = async (data: { name: string; description: string; badgeIds: number[] }) => {
    const response = await serviceApi.post(``, data);
    return response.data;
};

export const deleteService = async (id: number) => {
    const response = await serviceApi.delete(`/${id}`)
    return response.data;
}