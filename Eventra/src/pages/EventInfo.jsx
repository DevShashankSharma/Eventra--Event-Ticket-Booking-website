import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EventInfo = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5000/api/events/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Event not found");
                return res.json();
            })
            .then((data) => {
                setEvent(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-cyan-50 to-indigo-100">
                <span className="text-xl text-cyan-700 font-semibold">Loading event...</span>
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-cyan-50 to-indigo-100">
                <span className="text-xl text-red-600 font-semibold">{error || "Event not found"}</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50 to-indigo-100 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                {/* Left Side */}
                <div>
                    {/* Event Image with badge */}
                    <div className="relative mb-7">
                        <img
                            src={event.image}
                            alt={event.name}
                            className="w-full h-64 sm:h-80 object-cover rounded-3xl shadow-2xl border-4 border-white/70"
                        />
                        {event.badge && (
                            <span className="absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg uppercase tracking-widest">
                                {event.badge}
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-indigo-700 via-cyan-600 to-violet-500 bg-clip-text text-transparent drop-shadow">
                        {event.name}
                    </h1>

                    {/* Date, Time, Price */}
                    <div className="flex flex-wrap items-center gap-4 mb-3 text-base font-medium">
                        <span className="flex items-center gap-1 text-indigo-700">
                            <span className="text-lg">📅</span> {event.date}
                        </span>
                        <span className="flex items-center gap-1 text-cyan-700">
                            <span className="text-lg">⏰</span> {event.time}
                        </span>
                        <span className="flex items-center gap-1 text-green-700">
                            <span className="text-lg">💸</span> ₹{event.price}
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 text-base md:text-lg mb-6 leading-relaxed">
                        {event.description}
                    </p>

                    {/* Host / Organizer */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-200 to-violet-200 flex items-center justify-center font-bold text-indigo-700 text-xl border-2 border-cyan-300 shadow">
                            {event.host ? event.host[0] : "E"}
                        </div>
                        <div>
                            <p className="text-xs">Organized by</p>
                            <strong className="text-indigo-700 font-semibold">{event.host}</strong>
                        </div>
                    </div>

                    {/* Mode, Location, Category */}
                    <div className="flex flex-wrap gap-2 mb-2">
                        {event.mode && (
                            <span className="text-xs font-semibold text-violet-700 bg-violet-100 px-2 py-1 rounded">
                                {event.mode}
                            </span>
                        )}
                        {event.location && (
                            <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded">
                                {event.location}
                            </span>
                        )}
                        {event.category && (
                            <span className="text-xs font-semibold text-cyan-700 bg-cyan-100 px-2 py-1 rounded">
                                {event.category}
                            </span>
                        )}
                        {event.type && (
                            <span className="text-xs font-semibold text-indigo-700 bg-indigo-100 px-2 py-1 rounded">
                                {event.type}
                            </span>
                        )}
                    </div>
                </div>

                {/* Right Side */}
                <div className="bg-white/90 rounded-3xl shadow-2xl p-6 md:p-8 border border-cyan-100 backdrop-blur-md sticky top-24 self-start">
                    <h2 className="text-2xl md:text-3xl font-bold text-indigo-800 mb-4">Event Info</h2>
                    <div className="mb-4 flex flex-col gap-1 text-base">
                        {event.location && (
                            <p className="text-gray-600">📍 <span className="font-semibold text-indigo-700">{event.location}</span></p>
                        )}
                        <p className="text-gray-600">🎫 <span className="font-semibold text-green-700">Book your tickets now!</span></p>
                        {event.mode && (
                            <p className="text-gray-600">🖥️ <span className="font-semibold text-violet-700">{event.mode}</span></p>
                        )}
                        {event.category && (
                            <p className="text-gray-600">🏷️ <span className="font-semibold text-cyan-700">{event.category}</span></p>
                        )}
                        {event.type && (
                            <p className="text-gray-600">🔖 <span className="font-semibold text-indigo-700">{event.type}</span></p>
                        )}
                    </div>
                    <div className="mb-4 flex items-center gap-4">
                        <span className="text-3xl font-bold text-green-600">₹{event.price}</span>
                        {event.badge && (
                            <span className="bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow uppercase tracking-widest">
                                {event.badge}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        <button className="flex-1 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-200 text-lg tracking-tight uppercase active:scale-[.9]"
                            onClick={() => {
                                navigate(`/payment/${event._id}`)
                            }}
                        >
                            Book Ticket
                        </button>
                    </div>
                    <div className="mt-8 border-t pt-4 text-sm text-gray-600 grid grid-cols-2 gap-2">
                        <p>Category: <span className="font-semibold text-cyan-700">{event.category}</span></p>
                        <p>Type: <span className="font-semibold text-violet-700">{event.type}</span></p>
                        <p>Host: <span className="font-semibold text-indigo-700">{event.host}</span></p>
                        <p>Location: <span className="font-semibold text-blue-700">{event.location}</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventInfo
