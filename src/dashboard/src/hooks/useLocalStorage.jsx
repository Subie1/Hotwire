import { useState } from "react";

export default function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        const item = window.localStorage.getItem(key);
        if (item) return JSON.parse(item);
        window.localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
    })

    const setValue = value => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log(error);
        }
    }

    return [storedValue, setValue];
}