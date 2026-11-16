
import React, { useState } from "react";
import { FiSend } from "react-icons/fi";

function NewsLetterBox() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    // Abhi frontend demo hai; backend subscription connect nahi hai.
    setMessage("Thanks for your interest in ApnaCart!");
    setEmail("");
  };

  return (
    <section className="bg-white px-4 py-14 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-2xl text-orange-500">
          <FiSend />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Stay in the <span className="text-orange-500">Loop</span>
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
          Discover new arrivals, special offers, and updates from ApnaCart.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-7 flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setMessage("");
            }}
            placeholder="Enter your email address"
            required
            className="min-w-0 flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />

          <button
            type="submit"
            className="rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Subscribe
          </button>
        </form>

        {message && (
          <p className="mt-3 text-sm text-gray-600" role="status">
            {message}
          </p>
        )}

        <p className="mt-4 text-xs text-gray-400">
          Stay updated with ApnaCart. Unsubscribe whenever you like.
        </p>
      </div>
    </section>
  );
}

export default NewsLetterBox;
