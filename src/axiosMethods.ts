import { axiosClient } from "./axiosClient";

export const sendPostRequest = async ({
    endpoint,
    payload
} : any) : Promise<any> => {
    try {
        const response = await axiosClient.post(endpoint, payload);
        return response.data;
    } catch(error) {
        console.error(error);
    }
}

export const sendGetRequest = async ({
    endpoint
} : any) : Promise<any> => {
    try {
        const response = await axiosClient.get(endpoint);
        return response.data;
    } catch(error) {
        console.error(error);
    }
}