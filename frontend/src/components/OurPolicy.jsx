
import React from "react";
import { FiTruck, FiRefreshCw, FiShield } from "react-icons/fi";

function OurPolicy() {
  const policies = [
    {
      icon: <FiTruck />,
      title: "Free Shipping",
      description: "Enjoy free delivery on eligible orders.",
    },
    {
      icon: <FiRefreshCw />,
      title: "Easy Returns",
      description: "Simple returns as per our return policy.",
    },
    {
      icon: <FiShield />,
      title: "Secure Payments",
      description: "Shop confidently with secure checkout.",
    },
  ];

  return (
    <section className="bg-gray-50 px-4 py-14 sm:px-8 lg:px-12">
      {/* Heading */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Our <span className="text-orange-500">Policies</span>
        </h2>

        <p className="mt-3 text-sm text-gray-500 sm:text-base">
          We make your shopping experience simple and convenient.
        </p>
      </div>

      {/* Policy Cards */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {policies.map((policy) => (
          <div
            key={policy.title}
            className="group rounded-2xl border border-gray-200 bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-3xl text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white">
              {policy.icon}
            </div>

            <h3 className="text-lg font-semibold text-gray-900">
              {policy.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              {policy.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OurPolicy;
