import UserType from "./UserType.ts";
import * as React from "react";

export default interface AppContextType {
    user: UserType | null;
    setUser: React.ActionDispatch<[newUser: UserType | null]>;
}