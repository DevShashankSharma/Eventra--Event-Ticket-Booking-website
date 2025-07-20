import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this import

const priceRanges = [
	{ label: "All", min: 0, max: Infinity },
	{ label: "Under ₹200", min: 0, max: 200 },
	{ label: "₹200 - ₹400", min: 200, max: 400 },
	{ label: "Above ₹400", min: 400, max: Infinity },
];

const Events = () => {
	const [events, setEvents] = useState([]);
	const [search, setSearch] = useState("");
	const [type, setType] = useState("All");
	const [category, setCategory] = useState("All");
	const [price, setPrice] = useState("All");
	const navigate = useNavigate(); // Add this

	useEffect(() => {
		fetch("http://localhost:5000/api/events")
			.then((res) => res.json())
			.then((data) => setEvents(data))
			.catch((err) => {
				console.error("Error fetching events:", err);
			});
	}, []);

	// Dynamically generate filter options from fetched events
	const eventTypes = ["All", ...Array.from(new Set(events.map((e) => e.type)))];
	const categories = ["All", ...Array.from(new Set(events.map((e) => e.category)))];

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
							key={event._id}
							className="group flex flex-col bg-white rounded-3xl shadow-xl border border-cyan-100 hover:shadow-violet-300/60 hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-200 overflow-hidden cursor-pointer"
							onClick={() => navigate(`/event/${event._id}`)} // Make card clickable
							tabIndex={0}
							role="button"
							onKeyDown={(e) => {
								if (e.key === "Enter") navigate(`/event/${event._id}`);
							}}
						>
							{/* Event Image & Badge */}
							<div className="relative w-full h-48 overflow-hidden">
								<img
									src={event.image}
									alt={event.name}
									className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
								/>
								{event.badge && (
									<span className="absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg uppercase tracking-widest">
										{event.badge}
									</span>
								)}
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
									<div className="flex flex-wrap items-center gap-2 mb-2">
										<span className="text-xs font-semibold text-cyan-700 bg-cyan-100 px-2 py-1 rounded">
											Hosted by {event.host}
										</span>
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
									</div>
									<p className="text-gray-700 mb-3 leading-relaxed text-sm line-clamp-2">
										{event.description}
									</p>
								</div>
								{/* Removed Book Ticket button */}
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default Events;
