const host = "http://localhost:8085/";
export const serviceFetchTaskList = async () : Promise<any> => {
    try {
        const response = await fetch(`${host}tasks/get-task`);
        return response;
    }catch (error) {
        console.error("Error fetching tasks:", error);
    }
}

export const serviceFetchCommonTaskDetails = async () : Promise<any> => {
    try {
        const response = await fetch(`${host}tasks/get-common-details/options`);
        return response;
    } catch(error) {
        console.error("Error fetching common details:", error);
    }
}

export const serviceFetchDetailsOnType = async (type : string) : Promise<any> => {
    try {
        const response = await fetch(`${host}tasks/get-common-details/type?selected=${type}`);
        return response;
    } catch(error) {
        console.error("Error fetching common details:", error);
    }
}