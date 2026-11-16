import { Link } from "react-router-dom";
import { FiPlusSquare, FiList, FiPackage } from "react-icons/fi";

export default function Sidebar() {
    return (
        <div className="w-56 min-h-screen bg-white border-r border-slate-200 p-4 flex flex-col gap-3">

            <Link to="/add" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-800 text-white text-sm hover:bg-orange-500">
                <FiPlusSquare /> Add Items
            </Link>

            <Link to="/lists" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-800 text-white text-sm hover:bg-orange-500">
                <FiList /> List Items
            </Link>

            <Link to="/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-800 text-white text-sm hover:bg-orange-500">
                <FiPackage /> Orders
            </Link>

        </div>
    );
}