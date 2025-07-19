import TypewriterGradientWords from '../utils/TypewriterGradientWords';
import eventraImage from '../assets/eventrabanner.png';
import banner1 from '../assets/banner1.jpeg';
import banner2 from '../assets/banner2.webp'; 

const typewriterWords = [
    {
        text: "The modern way to manage, promote, and analyze your events.",
        color: "from-indigo-600 to-sky-400"
    },
    {
        text: "Experience seamless ticketing and real-time insights.",
        color: "from-pink-600 to-rose-400"
    },
    {
        text: "Empowering organizers and delighting attendees.",
        color: "from-lime-500 to-green-400"
    },
    {
        text: "Eventra: Where every event becomes extraordinary.",
        color: "from-cyan-600 to-teal-400"
    }
];

const EventraDescription = () => {
    return (
        <section className="flex flex-col-reverse lg:flex-row items-center gap-10 px-4 py-10 md:p-12 bg-gradient-to-br from-white via-cyan-50 to-indigo-50   overflow-hidden">
            {/* Left Side Content */}
            <div className="w-full lg:w-1/2 flex flex-col items-start z-10 pr-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-600 via-pink-500 to-cyan-400 bg-clip-text text-transparent drop-shadow">
                    Welcome to <span className="font-serif">Eventra</span>
                </h2>

                {/* Animated typewriter with gradient color cycling */}
                <TypewriterGradientWords words={typewriterWords} />

                <div className="mt-2 text-gray-700 text-base md:text-lg leading-relaxed">
                    Eventra is your all-in-one solution for event management, ticketing, and analytics.<br />
                    Whether you're hosting a small meetup or a large conference, our platform empowers you to create memorable experiences with ease and confidence.
                </div> 
            </div>

            {/* Right Side Images */}
            <div className="relative w-full lg:w-1/2 flex items-center justify-center min-h-[340px] sm:min-h-[400px] py-4">
                {/* Decorative animated gradient ring */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-0 w-80 h-80 rounded-full bg-gradient-to-tr from-pink-300 via-cyan-300 to-indigo-200 opacity-30 blur-2xl animate-pulse-slow"></div>

                {/* Stylish overlapping images with animation */}
                <div className="relative flex items-center justify-center w-[100%] st:w-[80%] sl:w-[70%] lg:w-full h-[260px] xs:h-[300px] sm:h-[340px]">
                    {/* Main Center Image */}
                    <img
                        src={eventraImage}
                        alt="Main Event"
                        className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-44 xs:w-40 xs:h-56 sm:w-52 sm:h-72 object-cover rounded-3xl shadow-2xl border-4 border-white/70 backdrop-blur-md bg-white/30 animate-float"
                        style={{ animationDelay: "0.2s" }}
                    />
                    {/* Left Image */}
                    <img
                        src={banner1}
                        alt="Event Left"
                        className="absolute z-10 left-1 xs:left-3 sm:left-6 top-1/2 -translate-y-1/2 w-20 h-28 xs:w-28 xs:h-40 sm:w-36 sm:h-56 object-cover rounded-2xl shadow-xl border-4 border-cyan-200 opacity-90 rotate-[-10deg] animate-float"
                        style={{ animationDelay: "0.6s" }}
                    />
                    {/* Right Image */}
                    <img
                        src={banner2}
                        alt="Event Right"
                        className="absolute z-10 right-1 xs:right-3 sm:right-6 top-1/2 -translate-y-1/2 w-20 h-28 xs:w-28 xs:h-40 sm:w-36 sm:h-56 object-cover rounded-2xl shadow-xl border-4 border-pink-200 opacity-90 rotate-[10deg] animate-float"
                        style={{ animationDelay: "1s" }}
                    /> 
                </div>
            </div>
        </section>
    );
};


export default EventraDescription;
