import { createContext, useState } from "react";


export const UserContext = createContext()

export default function UserProvider({children}){

    let [user , setUser] = useState(JSON.parse(localStorage.getItem("user")) || null )

    return (
        <UserContext.Provider value={{user , setUser}}>
            {children}
        </UserContext.Provider>
    )

}