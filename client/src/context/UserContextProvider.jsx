import { UserContext } from "./UserContext";
import { useState } from "react";


export const UserContextProvider=({children})=>{
    const [userData,setUserData]=useState({});

    return(
        <UserContext.Provider value={{userData,setUserData}}>
            {children}
        </UserContext.Provider>
    );
};