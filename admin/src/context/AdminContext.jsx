
import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import { authDataContext } from "./AuthContext";
import axios from "axios";

export const adminDataContext = createContext();

function AdminContext({ children }) {

    const [adminData, setAdminData] = useState(null);
    const [checkingAdmin, setCheckingAdmin] = useState(true);

    const { serverUrl } = useContext(authDataContext);

    const getAdmin = async () => {
        try {
            const result = await axios.get(
                `${serverUrl}/api/user/getadmin`,
                { withCredentials: true }
            );

            setAdminData(result.data);
            return true;

        } catch (err) {
            setAdminData(null);

            console.log(
                "Get Admin Error:",
                err.response?.data || err.message
            );

            return false;

        } finally {
            setCheckingAdmin(false);
        }
    };

    useEffect(() => {
        getAdmin();
    }, []);

    const value = {
        adminData,
        setAdminData,
        getAdmin,
        checkingAdmin
    };

    return (
        <adminDataContext.Provider value={value}>
            {children}
        </adminDataContext.Provider>
    );
}

export default AdminContext;
