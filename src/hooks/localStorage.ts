
export const useLocalStorage = () => {
    const setItem = (data: any, key: string) => {
        const stringify = JSON.stringify(data);
        localStorage.setItem(key, stringify);
        const getItemBack: string = localStorage.getItem(key)!;
        return JSON.parse(getItemBack);
    };

    
    const getItem = (key: string) => {
        const getItem = JSON.parse(localStorage.getItem(key)!);
        return getItem;
    };

    const clearItem = (identifier: string) => {
        localStorage.removeItem(identifier);
    }

    return { getItem, setItem, clearItem };
}

