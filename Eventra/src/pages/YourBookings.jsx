import React, { useState } from "react";

// Dummy data for demonstration
const allBookings = [
    {
        id: "B001",
        eventTitle: "Music Night Live",
        eventImage: "/event-img.jpg",
        date: "2025-07-25",
        time: "7:00 PM",
        location: "Delhi Auditorium",
        price: 399,
        email: "user@example.com",
    },
    {
        id: "B002",
        eventTitle: "AI Innovators Summit",
        eventImage: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
        date: "2025-05-10",
        time: "10:00 AM",
        location: "Tech Park, Bangalore",
        price: 599,
        email: "user@example.com",
    },
    {
        id: "B003",
        eventTitle: "Startup Expo",
        eventImage: "https://images.unsplash.com/photo-1515168833906-d2a3b82b1a5e?auto=format&fit=crop&w=600&q=80",
        date: "2025-08-15",
        time: "9:00 AM",
        location: "Mumbai Convention Center",
        price: 299,
        email: "user@example.com",
    },
    // Add more bookings as needed
];

function splitBookings(bookings) {
    const now = new Date();
    const upcoming = [];
    const past = [];
    bookings.forEach((b) => {
        const eventDate = new Date(b.date);
        if (eventDate >= now) {
            upcoming.push(b);
        } else {
            past.push(b);
        }
    });
    return { upcoming, past };
}

export default function YourBookings() {
    const [email, setEmail] = useState("");
    const [searched, setSearched] = useState(false);
    const [filtered, setFiltered] = useState({ upcoming: [], past: [] });

    const handleSearch = (e) => {
        e.preventDefault();
        const bookings = allBookings.filter(
            (b) => b.email.toLowerCase() === email.trim().toLowerCase()
        );
        setFiltered(splitBookings(bookings));
        setSearched(true);
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
                    >
                        Show Bookings
                    </button>
                </form>

                {searched && filtered.upcoming.length === 0 && filtered.past.length === 0 && (
                    <div className="text-center text-gray-400 text-lg font-medium py-8">
                        No bookings found for this email.
                    </div>
                )}

                {searched && (filtered.upcoming.length > 0 || filtered.past.length > 0) && (
                    <div className="space-y-12">
                        {/* Upcoming Bookings */}
                        <section>
                            <h2 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center gap-2">
                                <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                Upcoming Events
                            </h2>
                            {filtered.upcoming.length === 0 ? (
                                <div className="text-gray-400 text-base mb-6">No upcoming bookings.</div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {filtered.upcoming.map((b) => (
                                        <div
                                            key={b.id}
                                            className="bg-white rounded-2xl shadow-xl border border-cyan-100 flex flex-col hover:shadow-2xl transition group relative overflow-hidden"
                                        >
                                            <div className="relative">
                                                <img
                                                    src={b.eventImage}
                                                    alt={b.eventTitle}
                                                    className="w-full h-40 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <span className="absolute top-3 right-3 bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow uppercase tracking-widest">
                                                    Upcoming
                                                </span>
                                            </div>
                                            <div className="p-4 flex-1 flex flex-col">
                                                <h3 className="font-bold text-lg text-indigo-800 mb-1 line-clamp-1">{b.eventTitle}</h3>
                                                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-1">
                                                    <span>📅 {b.date}</span>
                                                    <span>⏰ {b.time}</span>
                                                </div>
                                                <div className="text-sm text-gray-600 mb-1">📍 {b.location}</div>
                                                <div className="text-green-700 font-bold text-base mb-2">₹{b.price}</div>
                                                <button className="mt-auto bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white py-2 rounded-lg font-semibold text-sm shadow transition-all duration-200">
                                                    View Ticket
                                                </button>
                                            </div>
                                            <div className="absolute inset-0 pointer-events-none rounded-2xl border-2 border-transparent group-hover:border-cyan-400 transition-all duration-300"></div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* Past Bookings */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center gap-2">
                                <span className="inline-block w-2 h-2 rounded-full bg-gray-400"></span>
                                Past Events
                            </h2>
                            {filtered.past.length === 0 ? (
                                <div className="text-gray-400 text-base mb-6">No past bookings.</div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {filtered.past.map((b) => (
                                        <div
                                            key={b.id}
                                            className="bg-gray-50 rounded-2xl shadow border border-gray-200 flex flex-col hover:shadow-md transition group relative overflow-hidden"
                                        >
                                            <div className="relative">
                                                <img
                                                    src={b.eventImage}
                                                    alt={b.eventTitle}
                                                    className="w-full h-40 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <span className="absolute top-3 right-3 bg-gradient-to-r from-gray-400 to-gray-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow uppercase tracking-widest">
                                                    Past
                                                </span>
                                            </div>
                                            <div className="p-4 flex-1 flex flex-col">
                                                <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-1">{b.eventTitle}</h3>
                                                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-1">
                                                    <span>📅 {b.date}</span>
                                                    <span>⏰ {b.time}</span>
                                                </div>
                                                <div className="text-sm text-gray-600 mb-1">📍 {b.location}</div>
                                                <div className="text-green-700 font-bold text-base mb-2">₹{b.price}</div>
                                                <button className="mt-auto bg-gradient-to-r from-gray-400 to-gray-600 text-white py-2 rounded-lg font-semibold text-sm shadow transition-all duration-200 cursor-not-allowed opacity-60">
                                                    View Ticket
                                                </button>
                                            </div>
                                            <div className="absolute inset-0 pointer-events-none rounded-2xl border-2 border-transparent group-hover:border-gray-400 transition-all duration-300"></div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>
                )}
            </section>
        </main>
    );
}