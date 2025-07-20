const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URI =   'mongodb://localhost:27017/eventra';

const eventSchema = new mongoose.Schema({
  name: String,
  date: String,
  time: String,
  description: String,
  image: String,
  type: String,
  category: String,
  price: Number,
  host: String,
  badge: String,
  mode: String,
  location: String,
});

const Event = mongoose.model('Event', eventSchema);

const events = [
	{
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
		mode: "Virtual Event",
		location: "Online via Zoom"
	},
	{
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
		mode: "Virtual Event",
		location: "Online via Microsoft Teams"
	},
	{
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
		mode: "Virtual Event",
		location: "Online via YouTube Live"
	},
	{
		name: "Startup Pitch Fest",
		date: "12th August 2025",
		time: "3:00 PM IST",
		description:
			"Watch budding startups pitch their ideas to top investors and VCs. Discover the next unicorns and be a part of innovation.",
		image:
			"https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80",
		type: "Business",
		category: "Startup",
		price: 249,
		host: "Founders Club",
		badge: "🚀 Trending",
		mode: "Virtual Event",
		location: "Online via Google Meet"
	},
	{
		name: "Yoga & Mindfulness Retreat",
		date: "22nd August 2025",
		time: "7:00 AM IST",
		description:
			"A peaceful and rejuvenating online retreat. Includes yoga sessions, guided meditation, and wellness talks.",
		image:
			"https://images.unsplash.com/photo-1554306274-f23873c4d2fb?auto=format&fit=crop&w=600&q=80",
		type: "Health",
		category: "Wellness",
		price: 149,
		host: "Inner Peace Org",
		badge: "🧘 Relaxing",
		mode: "Virtual Event",
		location: "Online via Zoom"
	},
	{
		name: "Coding Bootcamp 2.0",
		date: "1st September 2025",
		time: "10:00 AM IST",
		description:
			"An intensive online bootcamp for beginners and intermediate coders. Master web development with live mentors.",
		image:
			"https://images.unsplash.com/photo-1581093588401-12b66ade9861?auto=format&fit=crop&w=600&q=80",
		type: "Programming",
		category: "Workshop",
		price: 399,
		host: "CodeMaster Academy",
		badge: "💻 Hot",
		mode: "Virtual Event",
		location: "Online via Zoom"
	},
	{
		name: "Virtual Book Fair",
		date: "5th September 2025",
		time: "2:00 PM IST",
		description:
			"Meet your favorite authors, attend readings, and grab digital book deals in this online book fair.",
		image:
			"https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
		type: "Literature",
		category: "Fair",
		price: 0,
		host: "ReadMore India",
		badge: "📚 Free Entry",
		mode: "Virtual Event",
		location: "Online via Hopin"
	},
	{
		name: "Photography Masterclass",
		date: "15th September 2025",
		time: "5:00 PM IST",
		description:
			"Learn the art of photography from professionals. Covers editing, lighting, portraits, and storytelling through images.",
		image:
			"https://images.unsplash.com/photo-1519183071298-a2962be96f06?auto=format&fit=crop&w=600&q=80",
		type: "Art",
		category: "Masterclass",
		price: 349,
		host: "Creative Lens Studio",
		badge: "📸 Trending",
		mode: "Virtual Event",
		location: "Online via Zoom"
	},
	{
		name: "Global Dance Party",
		date: "30th August 2025",
		time: "9:00 PM IST",
		description:
			"Turn up the volume and dance with DJs from around the world in this electrifying online party!",
		image:
			"https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
		type: "Entertainment",
		category: "Party",
		price: 99,
		host: "DJ Network",
		badge: "💃 Fun",
		mode: "Virtual Event",
		location: "Online via Instagram Live"
	},
	{
		name: "Career Mastery Summit",
		date: "20th October 2025",
		time: "11:00 AM IST",
		description:
			"Empower your career with expert sessions on resume building, interviews, personal branding, and more.",
		image:
			"https://images.unsplash.com/photo-1584697964293-c041acb46bda?auto=format&fit=crop&w=600&q=80",
		type: "Career",
		category: "Summit",
		price: 299,
		host: "Success Path Org",
		badge: "🎯 Skills",
		mode: "Virtual Event",
		location: "Online via Webex"
	}
];

// Upsert (update if exists, insert if not)
async function seedEvents() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    for (const event of events) {
      await Event.findOneAndUpdate(
        { name: event.name },
        event,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
    console.log('Sample events inserted/updated!');
  } catch (err) {
    console.error('Error inserting/updating events:', err);
  } finally {
    await mongoose.disconnect();
  }
}

seedEvents();
