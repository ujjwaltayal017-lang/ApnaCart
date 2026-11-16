import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiLogOut } from "react-icons/fi";
import { useContext } from "react";
import axios from "axios";
import  {authDataContext}  from "../context/AuthContext";
import  {adminDataContext}  from "../context/AdminContext";

export default function Nav() {
    let { getAdmin } = useContext(adminDataContext)
    let { serverUrl } = useContext(authDataContext)
    const navigate = useNavigate();

    // LogOut dabane par yeh function chalta hai
    const handleLogout = async () => {
        try {
            await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
            getAdmin(); // user ka data dobara mangwata hai
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <nav className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-teal-50 to-slate-200">

            {/* Left: logo + ApnaCart */}
            <Link to="/" className="flex items-center gap-2">
                <div className="bg-orange-500 text-white p-2 rounded-xl">
                    <FiShoppingCart />
                </div>
                <span className="text-xl font-bold text-slate-800">
                    Apna<span className="text-orange-500">Cart</span>
                </span>
            </Link>

            {/* Right: LogOut button */}
            <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 bg-slate-800 text-white text-sm px-4 py-2 rounded-lg hover:bg-orange-500"
            >
                <FiLogOut />
                LogOut
            </button>

        </nav>
    );
}