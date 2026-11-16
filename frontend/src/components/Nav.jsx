
// import { Link, useNavigate } from "react-router-dom";
// import { FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";
// import { useContext, useState } from "react";
// import axios from "axios";
// import { UserDataContext } from "../context/UserContext";
// import { AuthContext } from "../context/authContext.jsx";

// export default function Navbar() {
//     const cartCount = 10;

//     const { userData, getCurrentUser } = useContext(UserDataContext);
//     const { serverUrl } = useContext(AuthContext);

//     const [showSearch, setShowSearch] = useState(false);
//     const [showProfile, setShowProfile] = useState(false);
//     const [query, setQuery] = useState("");

//     const navigate = useNavigate();

//     // Search products
//     const handleSearch = (e) => {
//         e.preventDefault();

//         const searchQuery = query.trim();

//         if (!searchQuery) {
//             navigate("/collections");
//             setShowSearch(false);
//             return;
//         }

//         navigate(
//             `/collections?search=${encodeURIComponent(searchQuery)}`
//         );

//         setShowSearch(false);
//     };

//     // Logout user
//     const handleLogout = async () => {
//         try {
//             await axios.get(`${serverUrl}/api/auth/logout`, {
//                 withCredentials: true,
//             });

//             await getCurrentUser();

//             setShowProfile(false);
//             navigate("/");
//         } catch (error) {
//             console.log("Logout error:", error);
//         }
//     };

//     const itemClass =
//         "block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-500";

//     return (
//         <>
//             <nav className="flex flex-wrap items-center justify-between px-6 py-3 bg-gradient-to-r from-teal-50 to-slate-200">

//                 {/* Logo */}
//                 <Link to="/" className="flex items-center gap-2">
//                     <div className="bg-orange-500 text-white p-2 rounded-xl">
//                         <FiShoppingCart />
//                     </div>

//                     <span className="text-xl font-bold text-slate-800">
//                         Apna<span className="text-orange-500">Cart</span>
//                     </span>
//                 </Link>

//                 {/* Navigation links */}
//                 <ul className="flex flex-wrap justify-center gap-2 order-last w-full mt-3 md:order-none md:w-auto md:mt-0 md:gap-4">
//                     <li>
//                         <Link
//                             to="/"
//                             className="bg-slate-800 text-white text-xs px-4 py-1.5 rounded-lg hover:bg-orange-500"
//                         >
//                             HOME
//                         </Link>
//                     </li>

//                     <li>
//                         <Link
//                             to="/collections"
//                             className="bg-slate-800 text-white text-xs px-4 py-1.5 rounded-lg hover:bg-orange-500"
//                         >
//                             COLLECTIONS
//                         </Link>
//                     </li>

//                     <li>
//                         <Link
//                             to="/about"
//                             className="bg-slate-800 text-white text-xs px-4 py-1.5 rounded-lg hover:bg-orange-500"
//                         >
//                             ABOUT
//                         </Link>
//                     </li>

//                     <li>
//                         <Link
//                             to="/contact"
//                             className="bg-slate-800 text-white text-xs px-4 py-1.5 rounded-lg hover:bg-orange-500"
//                         >
//                             CONTACT
//                         </Link>
//                     </li>
//                 </ul>

//                 {/* Search, Profile and Cart */}
//                 <div className="flex items-center gap-4 text-xl text-slate-800">

//                     {/* Search button */}
//                     <button
//                         type="button"
//                         aria-label="Open search"
//                         onClick={() => setShowSearch((prev) => !prev)}
//                         className="hover:text-orange-500"
//                     >
//                         <FiSearch />
//                     </button>

//                     {/* Profile */}
//                     <div className="relative">
//                         <button
//                             type="button"
//                             onClick={() => setShowProfile((prev) => !prev)}
//                             className={
//                                 userData
//                                     ? "w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600"
//                                     : "hover:text-orange-500"
//                             }
//                         >
//                             {userData
//                                 ? userData?.name?.[0]?.toUpperCase()
//                                 : <FiUser />}
//                         </button>

//                         {showProfile && (
//                             <div className="absolute right-0 mt-3 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50">

//                                 {!userData && (
//                                     <Link
//                                         to="/login"
//                                         onClick={() => setShowProfile(false)}
//                                         className={itemClass}
//                                     >
//                                         Login
//                                     </Link>
//                                 )}

//                                 {userData && (
//                                     <Link
//                                         to="/orders"
//                                         onClick={() => setShowProfile(false)}
//                                         className={itemClass}
//                                     >
//                                         Orders
//                                     </Link>
//                                 )}

//                                 <Link
//                                     to="/about"
//                                     onClick={() => setShowProfile(false)}
//                                     className={itemClass}
//                                 >
//                                     About
//                                 </Link>

//                                 {userData && (
//                                     <button
//                                         type="button"
//                                         onClick={handleLogout}
//                                         className={itemClass}
//                                     >
//                                         Logout
//                                     </button>
//                                 )}
//                             </div>
//                         )}
//                     </div>

//                     {/* Cart */}
//                     <Link
//                         to="/cart"
//                         className="relative hover:text-orange-500"
//                     >
//                         <FiShoppingCart />

//                         <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
//                             {cartCount}
//                         </span>
//                     </Link>
//                 </div>
//             </nav>

//             {/* Search bar */}
//             {showSearch && (
//                 <div className="bg-white px-4 py-3 shadow-sm">
//                     <form
//                         onSubmit={handleSearch}
//                         className="mx-auto flex w-full max-w-2xl items-center overflow-hidden rounded-full border border-slate-300 focus-within:border-orange-500"
//                     >
//                         <FiSearch className="ml-4 text-xl text-slate-400" />

//                         <input
//                             type="text"
//                             placeholder="Search products..."
//                             value={query}
//                             onChange={(e) => setQuery(e.target.value)}
//                             className="w-full px-3 py-2 text-slate-800 outline-none"
//                         />

//                         <button
//                             type="submit"
//                             className="bg-orange-500 px-6 py-2 font-semibold text-white hover:bg-orange-600"
//                         >
//                             Search
//                         </button>
//                     </form>
//                 </div>
//             )}
//         </>
//     );
// }





import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";
import { useContext, useState } from "react";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { AuthContext } from "../context/authContext.jsx";
import { shopDataContext } from "../context/ShopContext";

export default function Navbar() {
  const { userData, getCurrentUser } = useContext(UserDataContext);
  const { serverUrl } = useContext(AuthContext);
  const { getCartCount } = useContext(shopDataContext);

  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  // Search products
  const handleSearch = (e) => {
    e.preventDefault();

    const searchQuery = query.trim();

    if (!searchQuery) {
      navigate("/collections");
      setShowSearch(false);
      return;
    }

    navigate(`/collections?search=${encodeURIComponent(searchQuery)}`);
    setShowSearch(false);
  };

  // Logout user
  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });

      await getCurrentUser();

      setShowProfile(false);
      navigate("/");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const itemClass =
    "block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-500";

  return (
    <>
      <nav className="flex flex-wrap items-center justify-between px-6 py-3 bg-gradient-to-r from-teal-50 to-slate-200">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-orange-500 text-white p-2 rounded-xl">
            <FiShoppingCart />
          </div>
          <span className="text-xl font-bold text-slate-800">
            Apna<span className="text-orange-500">Cart</span>
          </span>
        </Link>

        {/* Navigation links */}
        <ul className="flex flex-wrap justify-center gap-2 order-last w-full mt-3 md:order-none md:w-auto md:mt-0 md:gap-4">
          <li>
            <Link
              to="/"
              className="bg-slate-800 text-white text-xs px-4 py-1.5 rounded-lg hover:bg-orange-500"
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              to="/collections"
              className="bg-slate-800 text-white text-xs px-4 py-1.5 rounded-lg hover:bg-orange-500"
            >
              COLLECTIONS
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="bg-slate-800 text-white text-xs px-4 py-1.5 rounded-lg hover:bg-orange-500"
            >
              ABOUT
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="bg-slate-800 text-white text-xs px-4 py-1.5 rounded-lg hover:bg-orange-500"
            >
              CONTACT
            </Link>
          </li>
        </ul>

        {/* Search, Profile and Cart */}
        <div className="flex items-center gap-4 text-xl text-slate-800">
          {/* Search button */}
          <button
            type="button"
            aria-label="Open search"
            onClick={() => setShowSearch((prev) => !prev)}
            className="hover:text-orange-500"
          >
            <FiSearch />
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowProfile((prev) => !prev)}
              className={
                userData
                  ? "w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600"
                  : "hover:text-orange-500"
              }
            >
              {userData ? (
                userData?.name?.[0]?.toUpperCase()
              ) : (
                <FiUser />
              )}
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-3 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50">
                {!userData && (
                  <Link
                    to="/login"
                    onClick={() => setShowProfile(false)}
                    className={itemClass}
                  >
                    Login
                  </Link>
                )}

                {userData && (
                  <Link
                    to="/orders"
                    onClick={() => setShowProfile(false)}
                    className={itemClass}
                  >
                    Orders
                  </Link>
                )}

                <Link
                  to="/about"
                  onClick={() => setShowProfile(false)}
                  className={itemClass}
                >
                  About
                </Link>

                {userData && (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className={itemClass}
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative hover:text-orange-500">
            <FiShoppingCart />
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {getCartCount()}
            </span>
          </Link>
        </div>
      </nav>

      {/* Search bar */}
      {showSearch && (
        <div className="bg-white px-4 py-3 shadow-sm">
          <form
            onSubmit={handleSearch}
            className="mx-auto flex w-full max-w-2xl items-center border border-slate-300 focus-within:border-orange-500 rounded-full overflow-hidden"
          >
            <FiSearch className="ml-4 text-xl text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-3 py-2 text-slate-800 outline-none"
            />
            <button
              type="submit"
              className="bg-orange-500 px-6 py-2 font-semibold text-white hover:bg-orange-600"
            >
              Search
            </button>
          </form>
        </div>
      )}
    </>
  );
}