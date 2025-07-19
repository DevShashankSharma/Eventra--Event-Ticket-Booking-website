import React, { useState, useEffect } from "react";

function TypewriterGradientWords({ words }) {
    const [idx, setIdx] = useState(0); // current word index
    const [displayText, setDisplayText] = useState(""); // what is shown
    const [charIndex, setCharIndex] = useState(0); // current character index
    const [deleting, setDeleting] = useState(false); // typing or deleting

    useEffect(() => {
        const currentWord = words[idx].text;

        const typeSpeed = 55;
        const deleteSpeed = 35;
        const delaySpeed = 1000;

        let timer;

        if (!deleting && charIndex <= currentWord.length) {
            // Typing
            timer = setTimeout(() => {
                setDisplayText(currentWord.slice(0, charIndex));
                setCharIndex((prev) => prev + 1);
            }, typeSpeed);
        } else if (deleting && charIndex > 0) {
            // Deleting
            timer = setTimeout(() => {
                setDisplayText(currentWord.slice(0, charIndex));
                setCharIndex((prev) => prev - 1);
            }, deleteSpeed); 
        } else if (charIndex > currentWord.length) {
            // Done typing → pause → start deleting
            timer = setTimeout(() => {
                setDeleting(true);
            }, delaySpeed);
        } else if (deleting && charIndex === 0) { 
            // Done deleting → next word
            setDeleting(false); 
            setIdx((prev) => (prev + 1) % words.length);
        } 

        return () => clearTimeout(timer);
    }, [charIndex, deleting, idx, words]);

    return (
        <div
            className={`mb-6 text-lg min-h-[60px] font-semibold bg-gradient-to-r ${words[idx].color} bg-clip-text text-transparent transition-all duration-500`}
        >
            {displayText}
            <span className="animate-pulse">|</span>
        </div>
    );
}

export default TypewriterGradientWords;
