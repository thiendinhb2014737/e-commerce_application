import axiosClient from './axiosClient';

class EventAPI {
    HandleEvent = async (
        url: string,
        data?: any,
        method?: 'get' | 'post' | 'put' | 'delete',
    ) => {
        return await axiosClient(`/event${url}`, {
            method: method ?? 'get',
            data,
        });
    };
}

const eventAPI = new EventAPI();
export default eventAPI;