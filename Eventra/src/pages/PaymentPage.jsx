import React, { useState } from "react";

const EventPaymentPage = ({ event }) => {
  const [form, setForm] = useState({
    name: "",
    card: "",
    expiry: "",
    cvv: "",
    email: "",
    phone: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // No backend/payment logic, just UI
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center">
        <img
          src={event.image}
          alt={event.title}
          className="rounded-xl w-32 h-32 object-cover mb-4 shadow"
        />
        <h2 className="text-2xl font-bold text-indigo-700 mb-1 text-center">
          {event.title}
        </h2>
        <div className="mb-4 text-center">
          <span className="block text-lg font-semibold text-gray-700 mb-1">
            {event.date} | {event.time}
          </span>
          <span className="block text-green-600 font-bold text-xl">
            ₹{event.price}
          </span>
        </div>
        <form
          className="w-full flex flex-col gap-4"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Cardholder Name"
            className="px-4 py-3 rounded-lg border border-cyan-200 focus:ring-2 focus:ring-cyan-400 outline-none transition bg-white shadow"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="card"
            placeholder="Card Number"
            maxLength={19}
            className="px-4 py-3 rounded-lg border border-cyan-200 focus:ring-2 focus:ring-cyan-400 outline-none transition bg-white shadow"
            value={form.card}
            onChange={handleChange}
            required
            pattern="\d{16,19}"
            inputMode="numeric"
          />
          <div className="flex gap-4">
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              maxLength={5}
              className="flex-1 px-4 py-3 rounded-lg border border-cyan-200 focus:ring-2 focus:ring-cyan-400 outline-none transition bg-white shadow"
              value={form.expiry}
              onChange={handleChange}
              required
              pattern="\d{2}/\d{2}"
              inputMode="numeric"
            />
            <input
              type="password"
              name="cvv"
              placeholder="CVV"
              maxLength={4}
              className="flex-1 px-4 py-3 rounded-lg border border-cyan-200 focus:ring-2 focus:ring-cyan-400 outline-none transition bg-white shadow"
              value={form.cvv}
              onChange={handleChange}
              required
              pattern="\d{3,4}"
              inputMode="numeric"
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="px-4 py-3 rounded-lg border border-cyan-200 focus:ring-2 focus:ring-cyan-400 outline-none transition bg-white shadow"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            maxLength={10}
            className="px-4 py-3 rounded-lg border border-cyan-200 focus:ring-2 focus:ring-cyan-400 outline-none transition bg-white shadow"
            value={form.phone}
            onChange={handleChange}
            required
            pattern="\d{10}"
            inputMode="numeric"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white py-3 rounded-lg font-semibold text-lg transition mt-2"
          >
            Pay Now
          </button>
        </form>
        {submitted && (
          <div className="mt-6 text-green-600 font-semibold text-center">
            Payment details submitted (UI only, no real payment processed).
          </div>
        )}
      </div>
    </div>
  );
};

export default EventPaymentPage;
