import { createContext, useState } from "react";

export const context = createContext();
export const ContextProvider = ({ children }) => {
    const [page, setPage] = useState(0);

    return (
        <context.Provider value={{ page, setPage }}>
            {children}
        </context.Provider>
    )
}