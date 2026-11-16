
import React from "react";
import { Link } from "react-router-dom";
import {
  FiShoppingBag,
  FiHeart,
  FiShield,
  FiTruck,
  FiArrowRight,
} from "react-icons/fi";

function About() {
  const values = [
    {
      icon: <FiHeart />,
      title: "Customer First",
      description:
        "We aim to make every shopping experience simple, comfortable, and enjoyable.",
    },
    {
      icon: <FiShield />,
      title: "Trust & Transparency",
      description:
        "We believe in clear product information and honest shopping experiences.",
    },
    {
      icon: <FiTruck />,
      title: "Convenient Shopping",
      description:
        "Explore collections and discover products from the comfort of your home.",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-800">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-slate-100 px-5 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">

          <div>
            <span className="inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
              Welcome to ApnaCart
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Shopping Made
              <span className="block text-orange-500">Simple for You.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              ApnaCart is an online shopping platform designed to help you
              explore products, discover new styles, and enjoy a convenient
              shopping experience.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/collections"
                className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
              >
                Explore Collections
                <FiArrowRight />
              </Link>

              <Link
                to="/contact"
                className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-orange-500 hover:text-orange-500"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-5 rounded-full bg-orange-200/50 blur-3xl" />

            <div className="relative rounded-3xl border border-white bg-white/80 p-8 shadow-xl backdrop-blur-sm sm:p-12">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-3xl bg-orange-500 text-white shadow-lg sm:h-36 sm:w-36">
                <FiShoppingBag className="h-16 w-16 sm:h-20 sm:w-20" />
              </div>

              <h2 className="mt-8 text-center text-2xl font-bold">
                Apna<span className="text-orange-500">Cart</span>
              </h2>

              <p className="mt-3 text-center leading-7 text-slate-500">
                Your shopping journey starts here.
              </p>

              <div className="mt-8 flex items-center justify-center gap-2">
                <span className="h-2 w-8 rounded-full bg-orange-500" />
                <span className="h-2 w-2 rounded-full bg-orange-200" />
                <span className="h-2 w-2 rounded-full bg-orange-200" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* About Us */}
      <section className="px-5 py-16 sm:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
            Who We Are
          </p>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            A Better Way to <span className="text-orange-500">Shop</span>
          </h2>

          <p className="mt-6 text-base leading-8 text-slate-600">
            At ApnaCart, our goal is to create a convenient place where
            customers can browse collections and find products that suit
            their needs. We focus on a clean shopping experience, easy
            navigation, and helpful customer support.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600">
            Whether you are exploring something new or looking for an
            everyday essential, we want your journey with ApnaCart to be
            straightforward and enjoyable.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-slate-900 px-5 py-16 text-white sm:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-400">
              Our Mission
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              Making Online Shopping More
              <span className="text-orange-400"> Convenient</span>
            </h2>
          </div>

          <p className="text-base leading-8 text-slate-300">
            Our mission is to build a user-friendly shopping platform that
            makes discovering and exploring products easier. We strive to
            keep the experience simple, accessible, and customer-focused.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 px-5 py-16 sm:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              What Matters to Us
            </p>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Our Core <span className="text-orange-500">Values</span>
            </h2>

            <p className="mt-4 leading-7 text-slate-500">
              The principles guiding the experience we want to create for
              every ApnaCart customer.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <article
                key={value.title}
                className="rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100 text-2xl text-orange-500">
                  {value.icon}
                </div>

                <h3 className="text-xl font-bold">{value.title}</h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-5xl rounded-3xl bg-orange-500 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to Explore ApnaCart?
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-orange-50">
            Browse our collections and find something that fits your style.
          </p>

          <Link
            to="/collections"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-orange-600 transition hover:bg-orange-50"
          >
            Shop Now
            <FiArrowRight />
          </Link>
        </div>
      </section>

    </main>
  );
}

export default About;
