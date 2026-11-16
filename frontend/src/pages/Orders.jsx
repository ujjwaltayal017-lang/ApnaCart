
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Search,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  CalendarDays,
  IndianRupee,
  ShoppingBag,
} from "lucide-react";

// Backend configuration
const API_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

// IMPORTANT: Replace this with your actual backend route.
const MY_ORDERS_ENDPOINT = `${API_URL}/api/order/userorders`;

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const ordersPerPage = 5;

  // Fetch logged-in user's orders
  const fetchMyOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(MY_ORDERS_ENDPOINT, {
        withCredentials: true,
      });

      const fetchedOrders =
        response.data.orders ||
        response.data.data ||
        response.data;

      setOrders(Array.isArray(fetchedOrders) ? fetchedOrders : []);
    } catch (err) {
      console.error("Fetch orders error:", err);

      setError(
        err.response?.data?.message ||
        "Unable to load your orders. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  // Helpers for different common MongoDB order field names
  const getOrderId = (order) =>
    order._id || order.id || "N/A";

  const getOrderItems = (order) =>
    order.items || order.orderItems || [];

  const getAmount = (order) =>
    order.totalAmount ??
    order.amount ??
    order.totalPrice ??
    0;

  const getStatus = (order) =>
    order.status || order.orderStatus || "Pending";

  const getPaymentStatus = (order) =>
    order.paymentStatus ||
    order.payment ||
    "Pending";

  const getOrderDate = (order) => {
    const date = order.createdAt || order.date;

    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getProductName = (item) =>
    item.product?.name ||
    item.product?.title ||
    item.name ||
    item.title ||
    "Product";

  const getProductImage = (item) =>
    item.product?.image ||
    item.product?.images?.[0] ||
    item.image ||
    "";

  const getQuantity = (item) =>
    item.quantity || item.qty || 1;

  // Search and filter
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const id = getOrderId(order).toLowerCase();

      const matchesSearch = id.includes(
        search.toLowerCase()
      );

      const matchesFilter =
        filter === "All" || getStatus(order) === filter;

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

  // Summary statistics
  const stats = [
    {
      title: "Total Orders",
      value: orders.length,
      icon: ShoppingBag,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Processing",
      value: orders.filter(
        (o) => getStatus(o) === "Processing"
      ).length,
      icon: Clock,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Shipped",
      value: orders.filter(
        (o) => getStatus(o) === "Shipped"
      ).length,
      icon: Truck,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Delivered",
      value: orders.filter(
        (o) => getStatus(o) === "Delivered"
      ).length,
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
    },
  ];

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleFilter = (value) => {
    setFilter(value);
    setCurrentPage(1);
  };

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
        <p className="mt-4 text-gray-500">
          Loading your orders...
        </p>
      </div>
    );
  }

  // Error screen
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <XCircle size={45} className="text-red-500" />
        <h2 className="mt-4 text-xl font-bold">
          Something went wrong
        </h2>
        <p className="mt-2 text-center text-gray-500">
          {error}
        </p>
        <button
          onClick={fetchMyOrders}
          className="mt-5 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">

      {/* PAGE HEADER */}
      <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            My Orders
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Track your orders and manage your purchases.
          </p>
        </div>

        <div className="text-sm text-gray-500">
          Home / <span className="font-semibold text-gray-900">
            My Orders
          </span>
        </div>
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

      {/* ORDERS SECTION */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

        {/* HEADER AND FILTERS */}
        <div className="flex flex-col justify-between gap-4 border-b border-gray-200 p-5 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Order History
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {filteredOrders.length} orders found
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">

            {/* SEARCH */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search order ID..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 sm:w-64"
              />
            </div>

            {/* FILTER */}
            <select
              value={filter}
              onChange={(e) => handleFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="All">All Orders</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* ORDERS LIST */}
        <div className="divide-y divide-gray-100">

          {currentOrders.map((order) => {
            const items = getOrderItems(order);
            const status = getStatus(order);

            return (
              <div
                key={getOrderId(order)}
                className="p-5 transition hover:bg-gray-50"
              >
                {/* ORDER TOP */}
                <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs text-gray-500">
                      ORDER ID
                    </p>
                    <h3 className="mt-1 font-semibold text-gray-900">
                      #{getOrderId(order)}
                    </h3>
                    <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                      <CalendarDays size={13} />
                      {getOrderDate(order)}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                        statusStyles[status] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {status}
                    </span>

                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-500 hover:text-blue-600"
                    >
                      <Eye size={16} />
                      View Details
                    </button>
                  </div>
                </div>

                {/* PRODUCTS */}
                <div className="space-y-3">
                  {items.slice(0, 2).map((item, index) => (
                    <div
                      key={item._id || index}
                      className="flex items-center gap-4"
                    >
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                        {getProductImage(item) ? (
                          <img
                            src={getProductImage(item)}
                            alt={getProductName(item)}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <Package className="text-gray-400" size={25} />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="truncate text-sm font-semibold text-gray-900">
                          {getProductName(item)}
                        </h4>
                        <p className="mt-1 text-xs text-gray-500">
                          Quantity: {getQuantity(item)}
                        </p>
                      </div>
                    </div>
                  ))}

                  {items.length > 2 && (
                    <p className="text-xs font-medium text-blue-600">
                      + {items.length - 2} more products
                    </p>
                  )}
                </div>

                {/* ORDER BOTTOM */}
                <div className="mt-5 flex flex-col justify-between gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs text-gray-500">
                      Payment Status
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {getPaymentStatus(order)}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-xs text-gray-500">
                      Total Amount
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-lg font-bold text-gray-900 sm:justify-end">
                      <IndianRupee size={17} />
                      {Number(getAmount(order)).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* EMPTY STATE */}
          {currentOrders.length === 0 && (
            <div className="px-5 py-16 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
                <ShoppingBag size={35} className="text-blue-500" />
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                No orders found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                {orders.length === 0
                  ? "You haven't placed any orders yet."
                  : "Try changing your search or filter."}
              </p>
            </div>
          )}
        </div>

        {/* PAGINATION */}
        {filteredOrders.length > 0 && (
          <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 px-5 py-4 sm:flex-row">
            <p className="text-sm text-gray-500">
              Showing {startIndex + 1} -{" "}
              {Math.min(
                startIndex + ordersPerPage,
                filteredOrders.length
              )}{" "}
              of {filteredOrders.length} orders
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="rounded-lg border p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-40"
              >
                <ChevronLeft size={18} />
              </button>

              <span className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white">
                {currentPage}
              </span>

              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="rounded-lg border p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-40"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Order Details
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  #{getOrderId(selectedOrder)}
                </p>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* STATUS */}
            <div className="mb-5 rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                Order Status
              </p>
              <span
                className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                  statusStyles[getStatus(selectedOrder)] ||
                  "bg-gray-100 text-gray-700"
                }`}
              >
                {getStatus(selectedOrder)}
              </span>
            </div>

            {/* DATE */}
            <div className="mb-5 flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-gray-500">
                <CalendarDays size={17} />
                Order Date
              </span>
              <span className="text-sm font-medium text-gray-900">
                {getOrderDate(selectedOrder)}
              </span>
            </div>

            {/* PRODUCTS */}
            <h3 className="mb-3 font-semibold text-gray-900">
              Ordered Products
            </h3>

            <div className="space-y-3">
              {getOrderItems(selectedOrder).map((item, index) => (
                <div
                  key={item._id || index}
                  className="flex items-center gap-3 rounded-lg border border-gray-100 p-3"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-50">
                    {getProductImage(item) ? (
                      <img
                        src={getProductImage(item)}
                        alt={getProductName(item)}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <Package size={22} className="text-gray-400" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {getProductName(item)}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Quantity: {getQuantity(item)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* PAYMENT DETAILS */}
            <div className="mt-5 space-y-3 border-t border-gray-200 pt-5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Payment Status
                </span>
                <span className="font-medium text-gray-900">
                  {getPaymentStatus(selectedOrder)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">
                  Total Amount
                </span>
                <span className="flex items-center gap-1 text-lg font-bold text-gray-900">
                  <IndianRupee size={17} />
                  {Number(getAmount(selectedOrder)).toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-6 w-full rounded-lg bg-gray-900 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
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
