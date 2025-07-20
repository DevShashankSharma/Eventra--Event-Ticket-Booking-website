import React, { useState } from "react";

export default function YourBookings() {
    const [email, setEmail] = useState("");
    const [searched, setSearched] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        const userEmail = email;
        try {
            const res = await fetch(`http://localhost:5000/api/bookings/my-bookings?email=${userEmail}`);
            const data = await res.json();

            // Fetch event details for each booking
            const detailedBookings = await Promise.all(
                data.map(async (b) => {
                    const res = await fetch(`http://localhost:5000/api/events/${b.eventId}`);
                    const event = await res.json();
                    return {
                        ...b,
                        eventImage: event.image,
                        eventTitle: event.name,
                        date: event.date,
                        time: event.time,
                        location: event.location,
                        price: event.price,
                    };
                })
            );

            setBookings(detailedBookings);
            setSearched(true);
        } catch (error) {
            console.error("Error fetching bookings:", error);
            setBookings([]);
            setSearched(true);
        }
        setLoading(false);
    };

    return (
        <main className="min-h-screen pt-24 pb-12 px-2 bg-gradient-to-br from-white via-cyan-50 to-indigo-100">
            <section className="max-w-7xl mx-auto p-6 md:p-10">
                <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-600 via-fuchsia-500 to-amber-400 bg-clip-text text-transparent drop-shadow">
                    Your Bookings
                </h1>
                <form
                    className="flex flex-col sm:flex-row items-center gap-4 mb-10"
                    onSubmit={handleSearch}
                >
                    <input
                        type="email"
                        placeholder="Enter your booking email"
                        className="flex-1 px-4 py-3 rounded-lg border border-cyan-200 focus:ring-2 focus:ring-cyan-400 outline-none transition bg-white shadow text-base"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-500 to-fuchsia-500 hover:from-blue-600 hover:to-fuchsia-600 text-white px-6 py-3 rounded-lg font-semibold shadow transition-all duration-200 text-base"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Show Bookings"}
                    </button>
                </form>

                {searched && bookings.length === 0 && (
                    <div className="text-center text-gray-400 text-lg font-medium py-8">
                        No bookings found for this email.
                    </div>
                )}

                {searched && bookings.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {bookings.map((b) => (
                            <div
                                key={b._id}
                                className="bg-white rounded-2xl shadow-xl border border-cyan-100 flex flex-col hover:shadow-2xl transition group relative overflow-hidden"
                            >
                                <div className="relative">
                                    <img
                                        src={b.eventImage}
                                        alt={b.eventTitle}
                                        className="w-full h-40 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-6 flex flex-col gap-2">
                                    <h3 className="font-bold text-xl text-indigo-800 mb-1">{b.eventTitle}</h3>
                                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-2">
                                        <span>👤 {b.name}</span>
                                        <span>📧 {b.email}</span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-2">
                                        <span>🆔 Booking ID: <span className="font-mono">{b._id}</span></span>
                                        <span>🆔 Event ID: <span className="font-mono">{b.eventId}</span></span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-2">
                                        <span>🎫 Tickets: <span className="font-bold">{b.numberOfTickets}</span></span>
                                        <span>💸 Amount: <span className="font-bold text-green-700">₹{b.amount}</span></span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-2">
                                        <span>📅 {b.date}</span>
                                        <span>⏰ {b.time}</span>
                                        <span>📍 {b.location}</span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-2">
                                        <span>🕘 Booked At: {new Date(b.bookedAt).toLocaleString()}</span>
                                        <span className={`font-bold ${b.status === "Paid" ? "text-green-600" : "text-yellow-600"}`}>
                                            {b.status}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-2">
                                        <span>Order ID: <span className="font-mono">{b.orderId}</span></span>
                                        <span>Payment ID: <span className="font-mono">{b.paymentId}</span></span>
                                    </div> 
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
