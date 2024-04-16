import { appInfo } from '../constants/appInfos';
import axiosClient from './axiosClient';

class ContactAPI {
    HandleContact = async (
        url: string,
        data?: any,
        method?: 'get' | 'post' | 'put' | 'delete',
    ) => {
        return await axiosClient(`/contact${url}`, {
            method: method ?? 'get',
            data,
        });
    };
}

const contactAPI = new ContactAPI();
export default contactAPI;