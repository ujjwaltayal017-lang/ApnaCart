
// import React, { useState } from "react";

// import {
//   Search,
//   ShoppingBag,
//   Clock,
//   Truck,
//   CheckCircle,
//   Eye,
//   ChevronLeft,
//   ChevronRight,
//   Filter,
//   X,
//   Package,
//   IndianRupee,
//   CalendarDays,
//   User,
// } from "lucide-react";

// import Nav from "../components/Nav";
// import Sidebar from "../components/Sidebar";

// const initialOrders = [
//   {
//     id: "#ORD-1024",
//     customer: "Rahul Sharma",
//     email: "rahul@gmail.com",
//     date: "Nov 05, 2026",
//     items: 3,
//     amount: 2499,
//     payment: "Paid",
//     status: "Delivered",
//   },
//   {
//     id: "#ORD-1023",
//     customer: "Priya Singh",
//     email: "priya@gmail.com",
//     date: "Nov 05, 2026",
//     items: 2,
//     amount: 1599,
//     payment: "Paid",
//     status: "Processing",
//   },
//   {
//     id: "#ORD-1022",
//     customer: "Aman Verma",
//     email: "aman@gmail.com",
//     date: "Nov 04, 2026",
//     items: 1,
//     amount: 899,
//     payment: "Pending",
//     status: "Pending",
//   },
//   {
//     id: "#ORD-1021",
//     customer: "Sneha Gupta",
//     email: "sneha@gmail.com",
//     date: "Nov 04, 2026",
//     items: 4,
//     amount: 3499,
//     payment: "Paid",
//     status: "Shipped",
//   },
//   {
//     id: "#ORD-1020",
//     customer: "Karan Mehta",
//     email: "karan@gmail.com",
//     date: "Nov 03, 2026",
//     items: 2,
//     amount: 1899,
//     payment: "Paid",
//     status: "Delivered",
//   },
//   {
//     id: "#ORD-1019",
//     customer: "Anjali Gupta",
//     email: "anjali@gmail.com",
//     date: "Nov 02, 2026",
//     items: 1,
//     amount: 1299,
//     payment: "Paid",
//     status: "Cancelled",
//   },
//   {
//     id: "#ORD-1018",
//     customer: "Mohit Kumar",
//     email: "mohit@gmail.com",
//     date: "Nov 01, 2026",
//     items: 2,
//     amount: 2199,
//     payment: "Pending",
//     status: "Pending",
//   },
// ];

// const statusStyles = {
//   Delivered: "bg-green-100 text-green-700",
//   Processing: "bg-blue-100 text-blue-700",
//   Pending: "bg-yellow-100 text-yellow-700",
//   Shipped: "bg-purple-100 text-purple-700",
//   Cancelled: "bg-red-100 text-red-700",
// };

// const Orders = () => {
//   const [orders, setOrders] = useState(initialOrders);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("All");
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);

//   const ordersPerPage = 5;

//   // Search and filter
//   const filteredOrders = orders.filter((order) => {
//     const matchesSearch =
//       order.id.toLowerCase().includes(search.toLowerCase()) ||
//       order.customer.toLowerCase().includes(search.toLowerCase()) ||
//       order.email.toLowerCase().includes(search.toLowerCase());

//     const matchesFilter =
//       filter === "All" || order.status === filter;

//     return matchesSearch && matchesFilter;
//   });

//   // Pagination
//   const totalPages = Math.ceil(
//     filteredOrders.length / ordersPerPage
//   );

//   const startIndex = (currentPage - 1) * ordersPerPage;

//   const currentOrders = filteredOrders.slice(
//     startIndex,
//     startIndex + ordersPerPage
//   );

//   // Update order status
//   const updateStatus = (id, status) => {
//     setOrders((prevOrders) =>
//       prevOrders.map((order) =>
//         order.id === id
//           ? { ...order, status }
//           : order
//       )
//     );

//     if (selectedOrder?.id === id) {
//       setSelectedOrder((prev) => ({
//         ...prev,
//         status,
//       }));
//     }
//   };

//   // Statistics
//   const stats = [
//     {
//       title: "Total Orders",
//       value: orders.length,
//       icon: ShoppingBag,
//       color: "bg-blue-100 text-blue-600",
//     },
//     {
//       title: "Pending Orders",
//       value: orders.filter(
//         (order) => order.status === "Pending"
//       ).length,
//       icon: Clock,
//       color: "bg-yellow-100 text-yellow-600",
//     },
//     {
//       title: "Processing",
//       value: orders.filter(
//         (order) => order.status === "Processing"
//       ).length,
//       icon: Truck,
//       color: "bg-purple-100 text-purple-600",
//     },
//     {
//       title: "Delivered",
//       value: orders.filter(
//         (order) => order.status === "Delivered"
//       ).length,
//       icon: CheckCircle,
//       color: "bg-green-100 text-green-600",
//     },
//   ];

//   // Search handler
//   const handleSearch = (value) => {
//     setSearch(value);
//     setCurrentPage(1);
//   };

//   // Filter handler
//   const handleFilter = (value) => {
//     setFilter(value);
//     setCurrentPage(1);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* NAVBAR */}
//       <Nav />

//       <div className="flex">

//         {/* SIDEBAR */}
//         <Sidebar />

//         {/* MAIN CONTENT */}
//         <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">

//           {/* PAGE HEADER */}
//           <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

//             <div>
//               <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
//                 Orders Management
//               </h1>

//               <p className="mt-1 text-sm text-gray-500">
//                 Manage and track all your customer orders.
//               </p>
//             </div>

//             <div className="text-sm text-gray-500">
//               Dashboard /{" "}
//               <span className="font-semibold text-gray-900">
//                 Orders
//               </span>
//             </div>

//           </div>

//           {/* STATISTICS */}
//           <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

//             {stats.map((stat) => {
//               const Icon = stat.icon;

//               return (
//                 <div
//                   key={stat.title}
//                   className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
//                 >
//                   <div className="flex items-center justify-between">

//                     <div>
//                       <p className="text-sm text-gray-500">
//                         {stat.title}
//                       </p>

//                       <h2 className="mt-2 text-2xl font-bold text-gray-900">
//                         {stat.value}
//                       </h2>
//                     </div>

//                     <div className={`rounded-xl p-3 ${stat.color}`}>
//                       <Icon size={24} />
//                     </div>

//                   </div>
//                 </div>
//               );
//             })}

//           </div>

//           {/* ORDERS TABLE */}
//           <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

//             {/* TABLE HEADER */}
//             <div className="flex flex-col gap-4 border-b border-gray-200 p-5 lg:flex-row lg:items-center lg:justify-between">

//               <div>
//                 <h2 className="text-lg font-semibold text-gray-900">
//                   All Orders
//                 </h2>

//                 <p className="mt-1 text-sm text-gray-500">
//                   {filteredOrders.length} orders found
//                 </p>
//               </div>

//               {/* SEARCH AND FILTER */}
//               <div className="flex flex-col gap-3 sm:flex-row">

//                 {/* SEARCH */}
//                 <div className="relative">
//                   <Search
//                     size={18}
//                     className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                   />

//                   <input
//                     type="text"
//                     placeholder="Search orders..."
//                     value={search}
//                     onChange={(e) =>
//                       handleSearch(e.target.value)
//                     }
//                     className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-64"
//                   />
//                 </div>

//                 {/* FILTER */}
//                 <div className="relative">
//                   <Filter
//                     size={16}
//                     className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
//                   />

//                   <select
//                     value={filter}
//                     onChange={(e) =>
//                       handleFilter(e.target.value)
//                     }
//                     className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-8 text-sm outline-none focus:border-blue-500 sm:w-44"
//                   >
//                     <option value="All">All Status</option>
//                     <option value="Pending">Pending</option>
//                     <option value="Processing">Processing</option>
//                     <option value="Shipped">Shipped</option>
//                     <option value="Delivered">Delivered</option>
//                     <option value="Cancelled">Cancelled</option>
//                   </select>
//                 </div>

//               </div>

//             </div>

//             {/* TABLE */}
//             <div className="overflow-x-auto">

//               <table className="w-full min-w-[900px] text-left">

//                 <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
//                   <tr>
//                     <th className="px-5 py-4">Order ID</th>
//                     <th className="px-5 py-4">Customer</th>
//                     <th className="px-5 py-4">Date</th>
//                     <th className="px-5 py-4">Items</th>
//                     <th className="px-5 py-4">Amount</th>
//                     <th className="px-5 py-4">Payment</th>
//                     <th className="px-5 py-4">Status</th>
//                     <th className="px-5 py-4">Action</th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-gray-100">

//                   {currentOrders.map((order) => (

//                     <tr
//                       key={order.id}
//                       className="transition hover:bg-gray-50"
//                     >

//                       <td className="px-5 py-4 font-semibold text-blue-600">
//                         {order.id}
//                       </td>

//                       <td className="px-5 py-4">
//                         <p className="font-medium text-gray-900">
//                           {order.customer}
//                         </p>

//                         <p className="text-xs text-gray-500">
//                           {order.email}
//                         </p>
//                       </td>

//                       <td className="px-5 py-4 text-sm text-gray-600">
//                         {order.date}
//                       </td>

//                       <td className="px-5 py-4 text-sm text-gray-600">
//                         {order.items}
//                       </td>

//                       <td className="px-5 py-4 font-semibold text-gray-900">
//                         ₹{order.amount.toLocaleString("en-IN")}
//                       </td>

//                       <td className="px-5 py-4">
//                         <span
//                           className={`rounded-full px-3 py-1 text-xs font-medium ${
//                             order.payment === "Paid"
//                               ? "bg-green-100 text-green-700"
//                               : "bg-yellow-100 text-yellow-700"
//                           }`}
//                         >
//                           {order.payment}
//                         </span>
//                       </td>

//                       <td className="px-5 py-4">
//                         <select
//                           value={order.status}
//                           onChange={(e) =>
//                             updateStatus(
//                               order.id,
//                               e.target.value
//                             )
//                           }
//                           className={`cursor-pointer rounded-full border-0 px-3 py-1.5 text-xs font-semibold outline-none ${statusStyles[order.status]}`}
//                         >
//                           <option value="Pending">Pending</option>
//                           <option value="Processing">Processing</option>
//                           <option value="Shipped">Shipped</option>
//                           <option value="Delivered">Delivered</option>
//                           <option value="Cancelled">Cancelled</option>
//                         </select>
//                       </td>

//                       <td className="px-5 py-4">
//                         <button
//                           onClick={() =>
//                             setSelectedOrder(order)
//                           }
//                           className="rounded-lg p-2 text-gray-500 transition hover:bg-blue-50 hover:text-blue-600"
//                           title="View Order"
//                         >
//                           <Eye size={18} />
//                         </button>
//                       </td>

//                     </tr>

//                   ))}

//                   {/* EMPTY STATE */}
//                   {currentOrders.length === 0 && (
//                     <tr>
//                       <td
//                         colSpan="8"
//                         className="px-5 py-12 text-center text-gray-500"
//                       >
//                         <Package
//                           size={35}
//                           className="mx-auto mb-3 text-gray-300"
//                         />

//                         <p className="font-medium">
//                           No orders found
//                         </p>

//                         <p className="mt-1 text-sm">
//                           Try changing your search or filter.
//                         </p>
//                       </td>
//                     </tr>
//                   )}

//                 </tbody>

//               </table>

//             </div>

//             {/* PAGINATION */}
//             <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 px-5 py-4 sm:flex-row">

//               <p className="text-sm text-gray-500">
//                 Showing{" "}
//                 {filteredOrders.length === 0
//                   ? 0
//                   : startIndex + 1}
//                 {" - "}
//                 {Math.min(
//                   startIndex + ordersPerPage,
//                   filteredOrders.length
//                 )}
//                 {" of "}
//                 {filteredOrders.length} orders
//               </p>

//               <div className="flex items-center gap-2">

//                 <button
//                   disabled={currentPage === 1}
//                   onClick={() =>
//                     setCurrentPage((p) => p - 1)
//                   }
//                   className="rounded-lg border p-2 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
//                 >
//                   <ChevronLeft size={18} />
//                 </button>

//                 <span className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white">
//                   {currentPage}
//                 </span>

//                 <button
//                   disabled={
//                     currentPage >= totalPages ||
//                     totalPages === 0
//                   }
//                   onClick={() =>
//                     setCurrentPage((p) => p + 1)
//                   }
//                   className="rounded-lg border p-2 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
//                 >
//                   <ChevronRight size={18} />
//                 </button>

//               </div>

//             </div>

//           </div>

//         </main>

//       </div>

//       {/* ORDER DETAILS MODAL */}
//       {selectedOrder && (

//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
//           onClick={() => setSelectedOrder(null)}
//         >

//           <div
//             className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
//             onClick={(e) => e.stopPropagation()}
//           >

//             {/* MODAL HEADER */}
//             <div className="mb-6 flex items-center justify-between">

//               <div>
//                 <h2 className="text-xl font-bold text-gray-900">
//                   Order Details
//                 </h2>

//                 <p className="mt-1 text-sm text-gray-500">
//                   {selectedOrder.id}
//                 </p>
//               </div>

//               <button
//                 onClick={() => setSelectedOrder(null)}
//                 className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-black"
//               >
//                 <X size={20} />
//               </button>

//             </div>

//             {/* CUSTOMER INFORMATION */}
//             <div className="mb-4 rounded-xl bg-gray-50 p-4">

//               <div className="mb-3 flex items-center gap-2 text-gray-700">
//                 <User size={18} />
//                 <h3 className="font-semibold">
//                   Customer Information
//                 </h3>
//               </div>

//               <p className="text-sm font-medium text-gray-900">
//                 {selectedOrder.customer}
//               </p>

//               <p className="mt-1 text-sm text-gray-500">
//                 {selectedOrder.email}
//               </p>

//             </div>

//             {/* ORDER INFORMATION */}
//             <div className="mb-4 space-y-4">

//               <div className="flex items-center justify-between">

//                 <div className="flex items-center gap-2 text-sm text-gray-500">
//                   <CalendarDays size={17} />
//                   Order Date
//                 </div>

//                 <span className="text-sm font-medium text-gray-900">
//                   {selectedOrder.date}
//                 </span>

//               </div>

//               <div className="flex items-center justify-between">

//                 <div className="flex items-center gap-2 text-sm text-gray-500">
//                   <Package size={17} />
//                   Total Items
//                 </div>

//                 <span className="text-sm font-medium text-gray-900">
//                   {selectedOrder.items}
//                 </span>

//               </div>

//               <div className="flex items-center justify-between">

//                 <div className="flex items-center gap-2 text-sm text-gray-500">
//                   <IndianRupee size={17} />
//                   Total Amount
//                 </div>

//                 <span className="text-lg font-bold text-gray-900">
//                   ₹{selectedOrder.amount.toLocaleString("en-IN")}
//                 </span>

//               </div>

//               <div className="flex items-center justify-between">

//                 <span className="text-sm text-gray-500">
//                   Payment Status
//                 </span>

//                 <span
//                   className={`rounded-full px-3 py-1 text-xs font-semibold ${
//                     selectedOrder.payment === "Paid"
//                       ? "bg-green-100 text-green-700"
//                       : "bg-yellow-100 text-yellow-700"
//                   }`}
//                 >
//                   {selectedOrder.payment}
//                 </span>

//               </div>

//             </div>

//             {/* UPDATE STATUS */}
//             <div className="border-t border-gray-200 pt-5">

//               <label className="mb-2 block text-sm font-semibold text-gray-700">
//                 Update Order Status
//               </label>

//               <select
//                 value={selectedOrder.status}
//                 onChange={(e) =>
//                   updateStatus(
//                     selectedOrder.id,
//                     e.target.value
//                   )
//                 }
//                 className={`w-full rounded-lg border-0 px-4 py-3 text-sm font-semibold outline-none ${statusStyles[selectedOrder.status]}`}
//               >
//                 <option value="Pending">Pending</option>
//                 <option value="Processing">Processing</option>
//                 <option value="Shipped">Shipped</option>
//                 <option value="Delivered">Delivered</option>
//                 <option value="Cancelled">Cancelled</option>
//               </select>

//             </div>

//             <button
//               onClick={() => setSelectedOrder(null)}
//               className="mt-5 w-full rounded-lg bg-gray-900 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
//             >
//               Close
//             </button>

//           </div>

//         </div>

//       )}

//     </div>
//   );
// };

// export default Orders;



import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Search,
  ShoppingBag,
  Clock,
  Truck,
  CheckCircle,
  Eye,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  Package,
  IndianRupee,
  CalendarDays,
  User,
  MapPin,
  RefreshCw,
} from "lucide-react";

import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { authDataContext } from "../context/AuthContext";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const Orders = () => {
  const { serverUrl } = useContext(authDataContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const ordersPerPage = 5;

  // Fetch all orders from backend
  const getAllOrders = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${serverUrl}/api/order/allorders`,
        {
          withCredentials: true,
        }
      );

      setOrders(Array.isArray(data.orders) ? data.orders : []);

    } catch (error) {
      console.log("Get All Orders Error:", error);
      alert(
        error.response?.data?.message ||
        "Unable to fetch orders."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, [serverUrl]);

  // Update order status in database
  const updateStatus = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);

      const { data } = await axios.put(
        `${serverUrl}/api/order/updateorderstatus`,
        {
          orderId,
          status: newStatus,
        },
        {
          withCredentials: true,
        }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, status: newStatus }
            : order
        )
      );

      setSelectedOrder((prev) =>
        prev?._id === orderId
          ? { ...prev, status: newStatus }
          : prev
      );

      alert(data.message || "Order status updated successfully.");

    } catch (error) {
      console.log("Update Status Error:", error);

      alert(
        error.response?.data?.message ||
        "Could not update order status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // Search and filter
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const customerName = order.address?.split(",")[0] || "";
      const orderId = order._id || "";

      const matchesSearch =
        orderId.toLowerCase().includes(search.toLowerCase()) ||
        customerName.toLowerCase().includes(search.toLowerCase()) ||
        (order.userId || "").toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        order.status?.toLowerCase() === filter.toLowerCase();

      return matchesSearch && matchesFilter;
    });
  }, [orders, search, filter]);

  // Pagination
  const totalPages = Math.ceil(
    filteredOrders.length / ordersPerPage
  );

  const startIndex = (currentPage - 1) * ordersPerPage;

  const currentOrders = filteredOrders.slice(
    startIndex,
    startIndex + ordersPerPage
  );

  // Statistics
  const stats = [
    {
      title: "Total Orders",
      value: orders.length,
      icon: ShoppingBag,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Pending Orders",
      value: orders.filter(
        (order) => order.status?.toLowerCase() === "pending"
      ).length,
      icon: Clock,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Processing",
      value: orders.filter(
        (order) => order.status?.toLowerCase() === "processing"
      ).length,
      icon: Truck,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Delivered",
      value: orders.filter(
        (order) => order.status?.toLowerCase() === "delivered"
      ).length,
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
    },
  ];

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(Number(date)).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getCustomerName = (address) => {
    return address?.split(",")[0] || "Customer";
  };

  const getTotalItems = (items = []) => {
    return items.reduce(
      (total, item) => total + Number(item.quantity || 1),
      0
    );
  };

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleFilter = (value) => {
    setFilter(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      <div className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">

          {/* PAGE HEADER */}
          <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Orders Management
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage and track all customer orders.
              </p>
            </div>

            <button
              onClick={getAllOrders}
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
            >
              <RefreshCw size={16} />
              Refresh Orders
            </button>
          </div>

          {/* STATISTICS */}
          <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">
                        {stat.title}
                      </p>

                      <h2 className="mt-2 text-2xl font-bold text-gray-900">
                        {stat.value}
                      </h2>
                    </div>

                    <div className={`rounded-xl p-3 ${stat.color}`}>
                      <Icon size={24} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ORDERS TABLE */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

            {/* SEARCH AND FILTER */}
            <div className="flex flex-col gap-4 border-b border-gray-200 p-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  All Orders
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {filteredOrders.length} orders found
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="Search order or customer..."
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-orange-500 sm:w-64"
                  />
                </div>

                <div className="relative">
                  <Filter
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                  <select
                    value={filter}
                    onChange={(e) => handleFilter(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-8 text-sm outline-none focus:border-orange-500 sm:w-44"
                  >
                    <option value="All">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px] text-left">
                <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                  <tr>
                    <th className="px-5 py-4">Order ID</th>
                    <th className="px-5 py-4">Customer</th>
                    <th className="px-5 py-4">Date</th>
                    <th className="px-5 py-4">Items</th>
                    <th className="px-5 py-4">Amount</th>
                    <th className="px-5 py-4">Payment</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr>
                      <td colSpan="8" className="py-12 text-center text-gray-500">
                        Loading orders...
                      </td>
                    </tr>
                  ) : currentOrders.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="px-5 py-12 text-center text-gray-500">
                        <Package size={35} className="mx-auto mb-3 text-gray-300" />
                        No orders found.
                      </td>
                    </tr>
                  ) : (
                    currentOrders.map((order) => {
                      const status = order.status?.toLowerCase() || "pending";

                      return (
                        <tr key={order._id} className="transition hover:bg-gray-50">
                          <td className="px-5 py-4 font-semibold text-orange-600">
                            #{order._id.slice(-8).toUpperCase()}
                          </td>

                          <td className="px-5 py-4">
                            <p className="font-medium text-gray-900">
                              {getCustomerName(order.address)}
                            </p>
                            <p className="text-xs text-gray-500">
                              User ID: {order.userId}
                            </p>
                          </td>

                          <td className="px-5 py-4 text-sm text-gray-600">
                            {formatDate(order.date)}
                          </td>

                          <td className="px-5 py-4 text-sm text-gray-600">
                            {getTotalItems(order.items)}
                          </td>

                          <td className="px-5 py-4 font-semibold text-gray-900">
                            ₹{Number(order.amount || 0).toLocaleString("en-IN")}
                          </td>

                          <td className="px-5 py-4">
                            <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                              order.payment
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}>
                              {order.payment ? "Paid" : "Pending"}
                            </span>
                            <p className="mt-1 text-xs text-gray-500">
                              {order.paymentMethod}
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <select
                              value={status}
                              disabled={updatingId === order._id}
                              onChange={(e) =>
                                updateStatus(order._id, e.target.value)
                              }
                              className={`cursor-pointer rounded-full border-0 px-3 py-1.5 text-xs font-semibold outline-none disabled:opacity-50 ${statusStyles[status] || statusStyles.pending}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>

                          <td className="px-5 py-4">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="rounded-lg p-2 text-gray-500 transition hover:bg-orange-50 hover:text-orange-600"
                              title="View Order"
                            >
                              <Eye size={18} />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 px-5 py-4 sm:flex-row">
              <p className="text-sm text-gray-500">
                Showing {filteredOrders.length === 0 ? 0 : startIndex + 1}
                {" - "}
                {Math.min(startIndex + ordersPerPage, filteredOrders.length)}
                {" of "}
                {filteredOrders.length} orders
              </p>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="rounded-lg border p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-40"
                >
                  <ChevronLeft size={18} />
                </button>

                <span className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white">
                  {currentPage}
                </span>

                <button
                  disabled={currentPage >= totalPages || totalPages === 0}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="rounded-lg border p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-40"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Order Details
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  #{selectedOrder._id}
                </p>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* CUSTOMER */}
            <div className="mb-5 rounded-xl bg-gray-50 p-4">
              <div className="mb-3 flex items-center gap-2 text-gray-700">
                <User size={18} />
                <h3 className="font-semibold">Customer Information</h3>
              </div>

              <p className="font-medium text-gray-900">
                {getCustomerName(selectedOrder.address)}
              </p>

              <div className="mt-2 flex items-start gap-2 text-sm text-gray-500">
                <MapPin size={17} className="mt-0.5 shrink-0" />
                <span>{selectedOrder.address}</span>
              </div>

              <p className="mt-2 break-all text-xs text-gray-500">
                User ID: {selectedOrder.userId}
              </p>
            </div>

            {/* ORDER ITEMS */}
            <h3 className="mb-3 font-semibold text-gray-800">
              Ordered Products
            </h3>

            <div className="mb-5 space-y-3">
              {selectedOrder.items?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-xl border border-gray-100 p-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-lg bg-gray-100 object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Size: {item.size || "N/A"} | Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold text-gray-900">
                    ₹{Number(item.price || 0).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>

            {/* ORDER INFORMATION */}
            <div className="mb-5 space-y-4 border-t border-gray-100 pt-5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-gray-500">
                  <CalendarDays size={17} />
                  Order Date
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {formatDate(selectedOrder.date)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-gray-500">
                  <Package size={17} />
                  Total Items
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {getTotalItems(selectedOrder.items)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Payment Method</span>
                <span className="text-sm font-medium text-gray-900">
                  {selectedOrder.paymentMethod}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Payment Status</span>
                <span className="text-sm font-semibold">
                  {selectedOrder.payment ? "Paid" : "Pending"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Total Amount</span>
                <span className="text-xl font-bold text-gray-900">
                  ₹{Number(selectedOrder.amount || 0).toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* UPDATE STATUS */}
            <div className="border-t border-gray-200 pt-5">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Update Order Status
              </label>

              <select
                value={selectedOrder.status?.toLowerCase() || "pending"}
                disabled={updatingId === selectedOrder._id}
                onChange={(e) =>
                  updateStatus(selectedOrder._id, e.target.value)
                }
                className={`w-full rounded-lg border-0 px-4 py-3 text-sm font-semibold outline-none disabled:opacity-50 ${statusStyles[selectedOrder.status?.toLowerCase()] || statusStyles.pending}`}
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-5 w-full rounded-lg bg-gray-900 py-3 text-sm font-semibold text-white hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;