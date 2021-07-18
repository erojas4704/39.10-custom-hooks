import { useEffect, useState } from "react";
import axios from "axios";

const useAxios = (url, options = { method: "GET" }) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchAxios = async () => {
            try {
                const res = await axios({ ...options, url });
                setResponse(res);
            } catch (error) {
                setError(error);
            }
            setIsLoading(false);
        }
        fetchAxios();
    }, []);

    return { response, error, isLoading };
};

const useFlip = (defaultIsFaceUp = false) => {
    const [isFaceUp, setIsFaceUp] = useState(defaultIsFaceUp);
    const flip = () => setIsFaceUp(!isFaceUp);

    return [isFaceUp, flip];
}

export { useFlip };
export default useAxios;