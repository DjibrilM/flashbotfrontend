import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react";


export const useFetchProfile = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<any[]>();
    const [error, setError] = useState<any>();
    const [selectedProfileIndex, setSelectedProfileIndex] = useState<number>(-1);
    let [selectedProfileUrl, setSelectedProfileUlr] = useState<string>();

    useEffect(() => {
        const getProfiles = async () => {
            try {
                setLoading(true)
                const request: AxiosResponse = await axios.get('/pokemon.json');
                const map = request.data.map((profile: any) => {
                    return {
                        ...profile,
                        selected: false,
                    }
                });

                setLoading(false);
                setResponse(map);

            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(error);
            }
        };

        getProfiles();
    }, [])


    const setSelected = (index: number) => {
        if (isLoading) return;

        const previousState: any = response;
        const findIndexOfPreviousSelected: number = previousState?.findIndex((profile: any) => profile.selected)!;
        if (findIndexOfPreviousSelected >= 0) previousState[findIndexOfPreviousSelected].selected = false;
        previousState[index].selected = true;
        setResponse(() => [...previousState]);
        setSelectedProfileIndex(index);
    }


    return { response, error, isLoading, setSelected, selectedProfileIndex, selectedProfileUrl }
}