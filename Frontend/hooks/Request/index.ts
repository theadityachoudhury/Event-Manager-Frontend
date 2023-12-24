import axios from "axios";

axios.defaults.baseURL = window.location.hostname === "events.adityachoudhury.com"
    ? "https://events-backend.adityachoudhury.com"
    : "http://localhost:5000";
axios.defaults.withCredentials = true;

const makeRequest = async ({ data, url, type }: { data: any, url: string, type: string }) => {
    let config = {
        method: type,
        maxBodyLength: Infinity,
        url: url,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    try {
        const response = await axios.request(config);
        return (response.data);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export default makeRequest;