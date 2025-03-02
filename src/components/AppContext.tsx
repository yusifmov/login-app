import {createContext} from "react";
import AppContextType from "../types/AppContextType.ts";

export const AppContext = createContext<AppContextType>({
    user: null,
    setUser: () => {}
})