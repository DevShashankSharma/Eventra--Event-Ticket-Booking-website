import React, { useState } from "react";

const events = [
	{
		id: 1,
		name: "Future Fest 2025",
		date: "10th August 2025",
		time: "6:00 PM IST",
		description:
			"Join us for a virtual event packed with tech talks, live music, networking, and much more! Experience the future of technology and entertainment from the comfort of your home.",
		image:
			"https://images.unsplash.com/photo-1515168833906-d2a3b82b1a5e?auto=format&fit=crop&w=600&q=80",
		type: "Tech",
		category: "Conference",
		price: 299,
		host: "Eventra Team",
		badge: "🔥 Popular",
	},
	{
		id: 2,
		name: "AI Innovators Summit",
		date: "18th September 2025",
		time: "4:00 PM IST",
		description:
			"A gathering of the brightest minds in AI. Keynotes, workshops, and panel discussions on the latest in artificial intelligence and machine learning.",
		image:
			"https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
		type: "AI",
		category: "Summit",
		price: 499,
		host: "AI World Org",
		badge: "🌟 Featured",
	},
	{
		id: 3,
		name: "Music Mania Live",
		date: "25th October 2025",
		time: "8:00 PM IST",
		description:
			"A virtual concert featuring top artists and bands. Enjoy live performances, interactive sessions, and exclusive backstage access.",
		image:
			"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
		type: "Music",
		category: "Concert",
		price: 199,
		host: "Live Nation",
		badge: "🎵 Music",
	},
];

const eventTypes = ["All", ...Array.from(new Set(events.map((e) => e.type)))];
const categories = ["All", ...Array.from(new Set(events.map((e) => e.category)))];
const priceRanges = [
	{ label: "All", min: 0, max: Infinity },
	{ label: "Under ₹200", min: 0, max: 200 },
	{ label: "₹200 - ₹400", min: 200, max: 400 },
	{ label: "Above ₹400", min: 400, max: Infinity },
];

const Events = () => {
	const [search, setSearch] = useState("");
	const [type, setType] = useState("All");
	const [category, setCategory] = useState("All");
	const [price, setPrice] = useState("All");

	const filteredEvents = events.filter((event) => {
		const matchesType = type === "All" || event.type === type;
		const matchesCategory = category === "All" || event.category === category;
		const priceRange = priceRanges.find((p) => p.label === price) || priceRanges[0];
		const matchesPrice = event.price >= priceRange.min && event.price <= priceRange.max;
		const matchesSearch =
			event.name.toLowerCase().includes(search.toLowerCase()) ||
			event.description.toLowerCase().includes(search.toLowerCase());
		return matchesType && matchesCategory && matchesPrice && matchesSearch;
	});

	return (
		<div className="py-12 px-2 sm:px-6 lg:px-8 max-w-7xl mx-auto">
			<h2 className="text-4xl font-black text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-violet-500 to-blue-400 drop-shadow-lg tracking-tight">
				Explore & Book Events
			</h2>

			{/* Modern Search & Filter Bar */}
			<div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
				<div className="flex-1 w-full flex items-center gap-3">
					<input
						type="text"
						placeholder="Search events by name or description..."
						className="w-full px-4 py-2 rounded-xl border border-cyan-200 focus:ring-2 focus:ring-cyan-400 outline-none transition bg-white shadow"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
				<div className="flex flex-wrap items-center gap-3 mt-3 md:mt-0">
					<span className="font-medium text-gray-700">Type:</span>
					<select
						className="px-4 py-2 rounded-xl border border-cyan-200 bg-white focus:ring-2 focus:ring-cyan-400 outline-none transition shadow"
						value={type}
						onChange={(e) => setType(e.target.value)}
					>
						{eventTypes.map((t) => (
							<option key={t} value={t}>
								{t}
							</option>
						))}
					</select>
					<span className="font-medium text-gray-700">Category:</span>
					<select
						className="px-4 py-2 rounded-xl border border-cyan-200 bg-white focus:ring-2 focus:ring-cyan-400 outline-none transition shadow"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					>
						{categories.map((c) => (
							<option key={c} value={c}>
								{c}
							</option>
						))}
					</select>
					<span className="font-medium text-gray-700">Price:</span>
					<select
						className="px-4 py-2 rounded-xl border border-cyan-200 bg-white focus:ring-2 focus:ring-cyan-400 outline-none transition shadow"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					>
						{priceRanges.map((p) => (
							<option key={p.label} value={p.label}>
								{p.label}
							</option>
						))}
					</select>
				</div>
			</div>

			{/* Events Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
				{filteredEvents.length === 0 ? (
					<div className="col-span-full text-center text-gray-400 text-xl py-16 font-semibold">
						No events found.
					</div>
				) : (
					filteredEvents.map((event) => (
						<div
							key={event.id}
							className="group flex flex-col bg-white rounded-3xl shadow-xl border border-cyan-100 hover:shadow-violet-200/40 transition-all duration-300 overflow-hidden"
						>
							{/* Event Image & Badge */}
							<div className="relative w-full h-48 overflow-hidden">
								<img
									src={event.image}
									alt={event.name}
									className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
								/>
								<span className="absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg uppercase tracking-widest">
									{event.badge}
								</span>
							</div>
							{/* Event Details */}
							<div className="flex-1 flex flex-col justify-between p-6 bg-gradient-to-br from-white via-cyan-50 to-violet-50">
								<div>
									<h3 className="text-xl font-extrabold text-gray-900 mb-1 tracking-tight line-clamp-1">
										{event.name}
									</h3>
									<div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-2">
										<span className="flex items-center gap-1 font-medium">
											<span className="text-lg">📅</span> {event.date}
										</span>
										<span className="flex items-center gap-1 font-medium">
											<span className="text-lg">🕘</span> {event.time}
										</span>
										<span className="flex items-center gap-1 font-medium">
											<span className="text-lg">💸</span> ₹{event.price}
										</span>
									</div>
									<div className="flex items-center gap-2 mb-2">
										<span className="text-xs font-semibold text-cyan-700 bg-cyan-100 px-2 py-1 rounded">
											Hosted by {event.host}
										</span>
									</div>
									<p className="text-gray-700 mb-3 leading-relaxed text-sm line-clamp-2">
										{event.description}
									</p>
								</div>
								<div className="flex justify-end">
									<button className="bg-gradient-to-r from-cyan-600 via-violet-500 to-blue-400 hover:from-cyan-700 hover:via-violet-600 hover:to-blue-500 text-white font-bold py-2 px-6 rounded-2xl shadow-lg transition-all duration-200 text-base tracking-tight uppercase">
										Book Ticket
									</button>
								</div>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default Events;
