
import React, { useState } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSend,
  FiMessageCircle,
} from "react-icons/fi";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend demo only; connect an API to send real messages.
    console.log("Contact form data:", formData);
    alert("Thank you for contacting ApnaCart!");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const contactInfo = [
    {
      icon: <FiMail />,
      title: "Email Us",
      detail: "support@apnacart.com",
      description: "For orders and general inquiries",
    },
    {
      icon: <FiPhone />,
      title: "Call Us",
      detail: "+91 XXXXX XXXXX",
      description: "Replace with your support number",
    },
    {
      icon: <FiMapPin />,
      title: "Our Location",
      detail: "India",
      description: "Serving customers across India",
    },
    {
      icon: <FiClock />,
      title: "Support Hours",
      detail: "Monday – Saturday",
      description: "10:00 AM – 6:00 PM",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-16 text-center text-white sm:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl">
            <FiMessageCircle />
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange-100">
            We're Here to Help
          </p>

          <h1 className="text-4xl font-extrabold sm:text-5xl">
            Contact Us
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-orange-50 sm:text-lg">
            Have a question about your order, our products, or your shopping
            experience? Send us a message and we'll be happy to help.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="mb-10 text-center">
          <p className="font-semibold uppercase tracking-widest text-orange-500">
            Get in Touch
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-800">
            We'd Love to Hear from You
          </h2>

          <p className="mt-3 text-slate-500">
            Choose the best way to reach our team.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-2xl text-orange-500">
                {item.icon}
              </div>

              <h3 className="text-lg font-bold text-slate-800">
                {item.title}
              </h3>

              <p className="mt-2 break-words font-semibold text-orange-600">
                {item.detail}
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <div className="grid overflow-hidden rounded-3xl bg-white shadow-lg lg:grid-cols-5">
          {/* Left Panel */}
          <div className="bg-slate-900 p-8 text-white sm:p-10 lg:col-span-2">
            <p className="font-semibold uppercase tracking-widest text-orange-400">
              Contact ApnaCart
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight">
              Let's Make Your Shopping Experience Better.
            </h2>

            <p className="mt-5 leading-7 text-slate-300">
              Need help with an order or have a suggestion? Fill out the form
              and tell us how we can assist you.
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-start gap-3">
                <FiMail className="mt-1 shrink-0 text-xl text-orange-400" />
                <div>
                  <p className="font-semibold">Email Support</p>
                  <p className="mt-1 break-all text-sm text-slate-300">
                    support@apnacart.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiClock className="mt-1 shrink-0 text-xl text-orange-400" />
                <div>
                  <p className="font-semibold">Response Time</p>
                  <p className="mt-1 text-sm text-slate-300">
                    We aim to respond as soon as possible.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="font-semibold">Need help with an order?</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Include your order number in your message so your request can
                be handled more easily.
              </p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="p-6 sm:p-10 lg:col-span-3">
            <h2 className="text-2xl font-bold text-slate-800">
              Send Us a Message
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Fill in the details below.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Your Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-orange-500 px-6 py-4 font-bold text-white transition hover:bg-orange-600 sm:w-auto"
              >
                Send Message
                <FiSend />
              </button>

              <p className="text-xs leading-5 text-slate-400">
                This demo form currently does not send messages to a server.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
