import React from 'react'

const EventInfo = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50 to-indigo-100 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                {/* Left Side */}
                <div>
                    {/* Event Image with badge */}
                    <div className="relative mb-7">
                        <img
                            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                            alt="Event Banner"
                            className="w-full h-64 sm:h-80 object-cover rounded-3xl shadow-2xl border-4 border-white/70"
                        />
                        <span className="absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg uppercase tracking-widest">
                            🎵 Music
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-indigo-700 via-cyan-600 to-violet-500 bg-clip-text text-transparent drop-shadow">
                        Music Mania 2025: Live in Concert
                    </h1>

                    {/* Date, Time, Price */}
                    <div className="flex flex-wrap items-center gap-4 mb-3 text-base font-medium">
                        <span className="flex items-center gap-1 text-indigo-700">
                            <span className="text-lg">📅</span> Aug 25, 2025
                        </span>
                        <span className="flex items-center gap-1 text-cyan-700">
                            <span className="text-lg">⏰</span> 6:30 PM – 11:00 PM
                        </span>
                        <span className="flex items-center gap-1 text-green-700">
                            <span className="text-lg">💸</span> ₹499
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 text-base md:text-lg mb-6 leading-relaxed">
                        Join us for an unforgettable night of electrifying performances by top artists, live bands,
                        and incredible vibes. Experience the ultimate fusion of music, lights, and energy. 
                        <br />
                        <span className="text-indigo-600 font-semibold">Special Features:</span> 
                        <ul className="list-disc ml-6 mt-2 text-gray-600 text-base">
                            <li>Live performances by international and Indian artists</li>
                            <li>Immersive light and sound show</li>
                            <li>Food courts, merchandise stalls, and chill zones</li>
                            <li>Meet & greet opportunities for VIP ticket holders</li>
                            <li>On-site safety and medical support</li>
                        </ul>
                    </p>

                    {/* Author / Organizer */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <img
                            src="https://randomuser.me/api/portraits/men/32.jpg"
                            alt="Organizer"
                            className="w-12 h-12 rounded-full object-cover border-2 border-cyan-300 shadow"
                        />
                        <div>
                            <p className="text-xs">Organized by</p>
                            <strong className="text-indigo-700 font-semibold">Rhythm Entertainment Pvt. Ltd.</strong>
                            <div className="text-xs text-gray-500 mt-1">Contact: <a href="mailto:info@rhythment.com" className="text-cyan-600 underline">info@rhythment.com</a></div>
                            <div className="text-xs text-gray-500">Website: <a href="https://rhythment.com" target="_blank" rel="noopener noreferrer" className="text-cyan-600 underline">rhythment.com</a></div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-3 mt-2">
                        <a href="#" className="text-cyan-600 hover:text-cyan-800 transition" aria-label="Instagram">
                            <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm6 1.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path></svg>
                        </a>
                        <a href="#" className="text-cyan-600 hover:text-cyan-800 transition" aria-label="Twitter">
                            <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.39-.58 2.19 0 1.51.77 2.84 1.95 3.62a4.28 4.28 0 0 1-1.94-.54v.05c0 2.11 1.5 3.87 3.5 4.27-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.69 2.11 2.92 3.97 2.95A8.6 8.6 0 0 1 2 19.54a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.37-.01-.56A8.7 8.7 0 0 0 24 4.59a8.5 8.5 0 0 1-2.54.7z"></path></svg>
                        </a>
                        <a href="#" className="text-cyan-600 hover:text-cyan-800 transition" aria-label="Facebook">
                            <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.592 1.325-1.326V1.326C24 .592 23.405 0 22.675 0"></path></svg>
                        </a>
                    </div>
                </div>

                {/* Right Side */}
                <div className="bg-white/90 rounded-3xl shadow-2xl p-6 md:p-8 border border-cyan-100 backdrop-blur-md sticky top-24 self-start">
                    {/* Ticket Info */}
                    <h2 className="text-2xl md:text-3xl font-bold text-indigo-800 mb-4">Event Info & Booking</h2>

                    {/* Date & Time */}
                    <div className="mb-4 flex flex-col gap-1 text-base">
                        <p className="text-gray-600">📍 <span className="font-semibold text-indigo-700">Jawaharlal Nehru Stadium, Delhi</span></p>
                        <p className="text-gray-600">🎫 <span className="font-semibold text-green-700">Total Tickets Booked: 3,420</span></p>
                        <p className="text-gray-600">🗣️ <span className="font-semibold text-cyan-700">Language: English & Hindi</span></p>
                        <p className="text-gray-600">🔞 <span className="font-semibold text-pink-700">Age Limit: 12+ only</span></p>
                        <p className="text-gray-600">🚗 <span className="font-semibold text-indigo-700">Parking Available</span></p>
                        <p className="text-gray-600">♿ <span className="font-semibold text-cyan-700">Accessible Venue</span></p>
                        <p className="text-gray-600">📱 <span className="font-semibold text-violet-700">E-Ticket & QR Entry</span></p>
                    </div>

                    {/* Price & Tickets */}
                    <div className="mb-4 flex items-center gap-4">
                        <span className="text-3xl font-bold text-green-600">₹499</span>
                        <span className="bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow uppercase tracking-widest">
                            Early Bird
                        </span>
                        <span className="bg-gradient-to-r from-pink-400 to-indigo-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow uppercase tracking-widest">
                            Limited Seats
                        </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        <button className="flex-1 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-200 text-lg tracking-tight uppercase">
                            Book Ticket
                        </button>
                        <button className="flex-1 bg-white border border-cyan-300 text-indigo-700 font-semibold py-3 rounded-xl shadow hover:bg-cyan-50 transition-all duration-200 text-lg">
                            More Info
                        </button>
                    </div>

                    {/* Additional Details */}
                    <div className="mt-8 border-t pt-4 text-sm text-gray-600 grid grid-cols-2 gap-2">
                        <p>Category: <span className="font-semibold text-cyan-700">Music & Concert</span></p>
                        <p>Type: <span className="font-semibold text-violet-700">Live Show</span></p>
                        <p>Language: <span className="font-semibold text-cyan-700">English & Hindi</span></p>
                        <p>Age Limit: <span className="font-semibold text-pink-700">12+ only</span></p>
                        <p>Refund Policy: <span className="font-semibold text-green-700">7 days before event</span></p>
                        <p>Support: <span className="font-semibold text-indigo-700">24/7 Chat & Email</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventInfo
