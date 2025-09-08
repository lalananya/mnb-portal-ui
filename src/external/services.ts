import { sendGetRequest, sendPostRequest } from "../axiosMethods";
export const serviceFetchTaskList = async () : Promise<any> => {
    try {
        const response = await sendGetRequest({
            endpoint :  `tasks/get-task`
        });
        return await response;
    }catch (error) {
        console.error("Error fetching tasks:", error);
    }
}

export const serviceCreateNewTask = async ( data : any) : Promise<any> => {
    try{
        const response = await sendPostRequest({
            endpoint : `tasks/create-task`,
            payload : data,
        })
        return await response;
    }catch(error) {
        console.error("Error creating tasks:", error);
    }
}


export const serviceFetchCommonTaskDetails = async () : Promise<any> => {
    try {
        const response = await sendGetRequest({
            endpoint :  `public/get-common-task-details`
        });
        return await response;
    }catch (error) {
        console.error("Error fetching common details:", error);
    }
}

export const serviceFetchQueryData = async (query : string) : Promise<any> => {
    try {
        const response = await fetch(`https://api.example.com/search?q=${query}`);
        return response;
    } catch(error) {
        console.error("Error fetching common details:", error);
    }
}