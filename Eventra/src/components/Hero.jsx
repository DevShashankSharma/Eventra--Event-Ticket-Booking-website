// src/components/Hero.jsx
export default function Hero() {
  return (
    <section className="bg-[url('/assets/hero.jpg')] bg-cover bg-center text-white py-32 px-6 text-center">
      <h2 className="text-4xl font-bold mb-4">Join Our Virtual Event</h2>
      <p className="text-lg mb-6">Connect, learn, and grow from anywhere.</p>
      <a href="#book" className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-700 transition">Book Tickets</a>
    </section>
  );
}