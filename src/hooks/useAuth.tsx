import axios from "axios"
import { useState } from "react";

export const useAuth = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    const sendRequest = async (data: {}) => {
        try {
            setLoading(true);
            setErrorMessage("");
            const request = await axios.post("http://localhost:3000/auth/register",
                { ...data },
                {
                    withCredentials: true,
                });
            setLoading(false);
            console.log(request);
            return request.data;
        } catch (error: any) {
            setLoading(false);
            setErrorMessage(error.response.data.message);
            throw (error);
        }
    }

    return { sendRequest, loading, errorMessage }
}
