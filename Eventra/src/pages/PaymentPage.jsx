import React, { useState, useEffect } from "react";
import { FaUser, FaMinus, FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";

const RazorpayPaymentPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [cardName, setCardName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/events/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Event not found");
        return res.json();
      })
      .then((data) => setEvent(data))
      .catch((err) => setError(err.message));
  }, [id]);

  const totalPrice = ticketCount * (event?.price || 0);

  const handleTicketChange = (delta) => {
    setTicketCount((prev) => Math.max(1, prev + delta));
  };

  const handlePay = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Create order (send only amount)
      const orderRes = await fetch("http://localhost:5000/api/bookings/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalPrice, // amount in rupees, backend multiplies by 100
        }),
      });
      const orderData = await orderRes.json();
      console.log("Order created:", orderData);
      if (!orderData.id) throw new Error("Order creation failed");

      // 2. Open Razorpay checkout
      const options = {
        key: import.meta.env.VITE_REACT_APP_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Eventra",
        description: "Event Ticket Booking",
        order_id: orderData.id,
        handler: async function (response) {
          // 3. Verify payment (send razorpay fields + bookingDetails)
          const verifyRes = await fetch("http://localhost:5000/api/bookings/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingDetails: {
                name: cardName,
                email,
                eventId: event._id,
                eventName: event.name,
                numberOfTickets: ticketCount,
                amount: totalPrice,
              },
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            setPaymentSuccess(true);
          } else {
            setError("Payment verification failed.");
          }
          setLoading(false);
        },
        prefill: {
          name: cardName,
          email: email,
        },
        theme: { color: "#6366f1" }, 
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        setError("Payment failed. " + response.error.description);
        setLoading(false);
      });
      rzp.open();
    } catch (err) {
      setError(err.message || "Payment failed.");
      setLoading(false);
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
        <span className="text-xl text-cyan-700 font-semibold">{error ? error : "Loading event..."}</span>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center">
          <svg className="w-20 h-20 text-green-500 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12l3 3 5-5" />
          </svg>
          <h2 className="text-3xl font-bold text-green-600 mb-2">Payment Successful!</h2>
          <p className="text-lg text-gray-700 mb-4">Your booking for <span className="font-bold">{event.name}</span> is confirmed.</p>
          <a href="/" className="mt-4 px-6 py-3 bg-indigo-700 text-white rounded-xl font-semibold hover:bg-indigo-800 transition text-lg shadow-md">
            Go to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Side: Event Info */}
        <div className="bg-gradient-to-br from-indigo-700 to-purple-700 text-white rounded-2xl p-8 flex flex-col justify-between shadow-xl min-h-[340px]">
          <div>
            <h2 className="text-2xl font-bold mb-2">{event.name}</h2>
            <p className="text-sm opacity-90 mb-2">Date: <span className="font-semibold">{event.date}</span></p>
            <p className="text-sm opacity-90 mb-2">Venue: <span className="font-semibold">{event.location}</span></p>
            <p className="text-sm opacity-90 mb-2">Time: <span className="font-semibold">{event.time}</span></p>
            <div className="flex items-center gap-2 mt-6">
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Tickets: {ticketCount}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Total: ₹{totalPrice.toLocaleString()}</span>
            </div>
          </div>
          <div className="mt-10">
            <p className="text-xs opacity-70">Powered by Eventra</p>
          </div>
        </div>

        {/* Right Side: Payment Form */}
        <form className="space-y-7" onSubmit={handlePay}>
          <h2 className="text-3xl font-bold text-indigo-800 mb-2">Card Payment</h2>
          <div className="flex items-center gap-4">
            <label className="font-medium text-gray-700">Tickets:</label>
            <button
              aria-label="Decrease tickets"
              className="p-2 rounded-full bg-gray-200 hover:bg-indigo-100 transition"
              onClick={() => handleTicketChange(-1)}
              type="button"
              disabled={loading}
            >
              <FaMinus />
            </button>
            <span className="text-lg font-semibold w-8 text-center">{ticketCount}</span>
            <button
              aria-label="Increase tickets"
              className="p-2 rounded-full bg-gray-200 hover:bg-indigo-100 transition"
              onClick={() => handleTicketChange(1)}
              type="button"
              disabled={loading}
            >
              <FaPlus />
            </button>
            <span className="ml-4 text-gray-500 text-sm">₹{event.price} each</span>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                id="cardName"
                type="text"
                placeholder="Name on Card"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                autoComplete="cc-name"
                required
                disabled={loading}
              />
            </div>
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                autoComplete="email"
                required
                disabled={loading}
              />
            </div>
          </div>

          {error && <div className="text-red-600 text-center font-semibold">{error}</div>}

          <button
            className="w-full py-3 bg-indigo-700 text-white rounded-xl font-semibold hover:bg-indigo-800 transition text-lg shadow-md"
            type="submit"
            disabled={loading}
          >
            {loading ? "Processing..." : `Pay ₹${totalPrice.toLocaleString()}`}
          </button>

          <p className="text-xs text-gray-500 text-center mt-2">
            <span className="font-medium text-indigo-700">Secured by Razorpay.</span> We do not store card info.
          </p>
        </form>
      </div>
    </div>
  );
};

export default RazorpayPaymentPage;
