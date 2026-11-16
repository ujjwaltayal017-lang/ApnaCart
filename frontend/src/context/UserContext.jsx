import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

import { AuthContext } from "./authContext";

export const UserDataContext = createContext();

function UserContext({ children }) {

    const [userData, setUserData] = useState(null);

    const { serverUrl } = useContext(AuthContext);

    const getCurrentUser = async () => {
        try {

            const result = await axios.get(
                `${serverUrl}/api/user/getcurrentuser`,
                {
                    withCredentials: true
                }
            );

            setUserData(result.data);

            console.log(result.data);

        } catch (err) {

            setUserData(null);
            console.log(err);
        }
    };

    useEffect(() => {
        getCurrentUser();
    }, []);

    const value = {
        userData,
        setUserData,
        getCurrentUser
    };

    return (
        <UserDataContext.Provider value={value}>
            {children}
        </UserDataContext.Provider>
    );
}

export default UserContext;